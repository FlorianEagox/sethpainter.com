---
title: How to literally rip your website in ahlf
categories:
	- programming
description: A guide to creating simple, but unique transition effects with Javascript through image composition.
---

I love websites with easer eggs, and when building this one, I knew I had to include some. This site is home to my crowning achievement in web development. If you search around, you'll find it, but for those who can't, give the traingle logo a double click!

You'll step back in amazement as the entire site rips itself in two halves revealing a secret page dedicated to my fursona Florian. Something like this might seem imposible without some intense Javascript behind the scenes, but it's not increadibly difficult, and can be modified in a myriad of ways to create ncredible effects.

The magic behind this effect is a library called HTML2Canvas. This library essentially generates a screenshot of the page by rendering it like an SVG to a canvas object. Once you have a screenshot of the current page, you can render the canvas on top of the whole page with CSS. To make unique effects, you can use all the power of the javascript canvas API or any image manipulation libraries you want to animate your effect.

## Basic setup
I went through several steps to refine and tune my effect for good performance, smoothness, and compatibility. I would reccomend reading the HTML2Canvas documentation in addition to this guide, but I will explain exactly how to use it for anything you want to make.

The first thing you'll need is a function to trigger it, this could be a button, page load, or really anything you want. We'll just go with a button load to call the event

### Getting a page screenshot
```js
import html2canvas from 'html2canvas' // if you're working with node, otherwise, include it as a script tag

document.querySelector('#btn-effect').addEventListener(async () => {
	const pageRoot = document.body; // This is the element will "take a screenshot" of.
	const screenshot = await html2canvas(pageRoot, {
		imageTimeout: 0, // This disables the default delay
		scale: 1 // By default this uses the device's pixel ratio, but this will produce odd results on mobile
	});
	// We now have a screenshot of the page in the form of a canvas element, to start, we'll just render it to the dom so you can see what you're working with

	screenshot.id = 'effect-canvas';
	document.body.appendChild(screenshot);
});
```

This will simply take a screenshot of the page and add it at the very end of the page. Next, we'll use CSS to make it cover the entire page. This should look identical to the starting position of the page, but the user will a screenshot of the page, rather than the page itself.

### Rendering it over the page
```CSS
#effect-canvas {
	position: fixed;
	top: 0;
	left: 0;
}
```

Next, you can start animating your effect. This can be done with CSS for more simple effects (like mine) or Javascript, if you need to modify the image on a per-pixel basis.

## My Effect, CSS based animation
To make my effect work, I use Javascript to split the image into two halves, render them each to the page, and then animate them with CSS. This effect does not draw the screenshot to the page, so remove that bit if you're following along.

```js
const animationDuration = 3; // a variable that specifies how long the effect should last
//This is the equivilant of adding a CSS variable to the :root selector
document.documentElement.style.setProperty('--animation-duration') = animationDuration + 's';

// Create a left and right canvas element
const leftCanvas = document.createElement('canvas');
leftCanvas.id = 'left-canvas';
pageRoot.appendChild(leftCanvas);
const rightCanvas = document.createElement('canvas');
rightCanvas.id = 'right-canvas';
pageRoot.appendChild(rightCanvas);

const screenShade = document.createElement('div');
screenShade.id = 'screen-shade'; // This will create a sort of dark 'shade' to darken the page and make our animation stand out more. Very optional and can even be animated.

// Wait util they've been rendered and sized by CSS.
requestAnimationFrame(() => {
	// We need to set the internal canvas demensions to the element's demensions.
	leftCanvas.width = leftCanvas.clientWidth;
	leftCanvas.height = leftCanvas.clientHeight;
	leftCanvas.getContext('2d').drawImage(screenshot, 0, 0); // This will draw a region of the screenshot to our canvas according to our specified starting point and dimensions.
	rightCanvas.width = rightCanvas.clientWidth;
	rightCanvas.height = rightCanvas.clientHeight;
	rightCanvas.getContext('2d').drawImage(screenshot, screenshot.width / 2, 0, screenshot.width / 2, 
	// This is the same as the other one, except this time we start in the middle of the image and go to the end.
	rightCanvas.height, 0, 0, rightCanvas.width, rightCanvas.height);
});
```

Next is the CSS that animates the two canvases moving across the screen in opposite directions

```css
#left-canvas, #right-canvas {
	position: fixed;
	pointer-events: none; /* prevent the user from cling things on the page while the event plays */
	width: 50vw;
	height: 100vh;
	box-shadow: 0 0 15px 8px rgba(0, 0, 0, 0.19); /* This is just an optional dropshadow I think seperates the foreground and background well */
	animation-duration: var(--secret-duration);
	animation-timing-function: ease-in-out;
}
#left-canvas {
	animation-name: moveLeft;
	left: 0;
}
#right-canvas {
	animation-name: moveRight;
	left: 50%; /* Set the original position of the canvas */
}
/* These move both canvases across the screen in opposite directions */
@keyframes moveLeft {
	from { transform: translateX(0) }
	to { transform: translateX(-100%); display: none; }
}
@keyframes moveRight {
	from { transform: translateX(0) }
	to { transform: translateX(100%); display: none; }
}

#screen-shade {
	width: 100vw;
	height: 100vw;
	background: rgba(0, 0, 0, 0.15); /* This will dim the page slightly */
	position: fixed;
}
```

This code uses the `transform` property, but you can just as well use any other method to animate the positoin of the elemnt. However, most of the time, `transform` is the most performant as it is better optimized for animated graphics and doesn't have to redraw the whole DOM.

## Triggering an event during the effect.
The purpose of mine was to create a unique, "secret doors" effect. One page opened up and revealed the secret. But you can use it to highlight whatever you want.
Without a Javascript framework, it might be difficult to implement a page transition like that, because the transition elements takes place outside the virtual DOM. But I will show you how I implemented it in Vue

Immediatly after the effect starts, we can call a new page load like this anywhere in the code

```js
this.$router.push('nextRoute');
```

## Cleaning up
We can call some code after the event has finished. This should be exactly after our specified `animationDuration` has ellapsed.
```js
setTimeout(() => {
	// Remove these elements from the DOM (even though they're technically invisible now)
	leftCanvas.remove();
	rightCanvas.remove();
	screenShade.remove();
}, animationDuration * 1000); // We multiply by 1000 to convert milliseconds to seconds.
```

## More complicated effects
The previous example allows you to create some very neat, but rather simple effects. If you want per-pixel control, you'll have to modify the canvas every frame. You could also use something like p5.JS or some other animation library that can modify canvases, but I'm going to show how this can be done froms cratch.

### Setting up an animation loop
Because we're animating with Javascript, we'll need to handle the timing manually. Essentially what we need to do is call a function to draw to the canvas every time we want to render a new frame. This is just like a game loop

[This post by Muffin Man](https://muffinman.io/blog/javascript-animation-loop/) goes into greater depths about creating responsive Javascript game loops if you'd like to learn more.

```js
const renderInterval = (1 / 60) * 1000; // How often to draw a new frame. (based on 60fps)
let previousTime = performance.now();

function animateEffect() {
	const now = performance.now(); // Get the current time
	const delta = (now - previous) / renderInterval; // Calculate how long it's been since the previous frame

	updateFrame(delta);

	lastUpdate = now;
  	requestAnimationFrame(animateEffect)
}

animateEffect();
```

### Compositing a frame
Now that we have a loop for drawing by calling the `drawFrame` function, we can actually create that function and start making our effect. This will most likely be done by either minipulating the original canvas or creating a new canvas and using image regions from the source canvas. I will show you how you can create my effect with these methods and one more, but that's where you get off and make your own effects. By compositing a screenshot of the image over-top of the actual page, you can create pretty much any effect you coulddn't do with CSS.

```js
const pageRoot = document.querySelector('#app');
let canvas = await html2canvas(pageRoot, {
	imageTimeout: 0
});
canvas.id = 'secret-canvas';
pageRoot.appendChild(canvas);

const ctx = canvas.getContext("2d");
const leftHalf = ctx.getImageData(0, 0, canvas.width / 2, canvas.height);
const rightHalf = ctx.getImageData(canvas.width / 2, 0, canvas.width, canvas.height);
const dropShadow = 30, randomSpeedAdjustment = 140;
let delta = 0, prevTime = 0;
const speed = 200;
let displacement = 0, offset = 0;
let transitionedPage = false;
ctx.shadowColor = "black";
ctx.shadowBlur = 20;
ctx.globalCompositeOperation = 'multiply';
ctx.textBaseline = '100'
function rip(time) {
	if (displacement <= canvas.width / 2) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (!transitionedPage && displacement >= canvas.width / 4) {
			transitionedPage = true
		}
		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		ctx.fillRect(pageRoot.clientWidth / 2 - displacement - dropShadow, 0, dropShadow, canvas.height)
		ctx.putImageData(leftHalf, -displacement, 0);
		ctx.fillRect(pageRoot.clientWidth / 2 + displacement, 0, dropShadow, canvas.height)
		ctx.putImageData(rightHalf, canvas.width / 2 + displacement, 0);
		delta = (time - prevTime) / 1000;
		delta = Math.min(delta, 0.1);
		prevTime = time;
		offset = Math.floor(Math.random() * (randomSpeedAdjustment - -randomSpeedAdjustment + 1)) + -randomSpeedAdjustment;
		displacement += (speed + offset) * delta;
		window.requestAnimationFrame(rip);
	} else {
		canvas.remove();
		canvas = null;
	}
}
window.requestAnimationFrame(rip);
```