<template>
	<div id="app">
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<style>
:root {
	--accent-color: green;
	--main-bkg: white;
	--white-txt: #eee;
	--light-text: #666;
	--body-bkg: #ddd;
	color: black;
	--dark-bkg: #444;
	/* --main-bkg: #333; */
	/* --body-bkg: black; */
	/* color: white; */
	--margin-buffer: 4em;
	--main-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.19);
	--accent-border: 0.5em solid var(--accent-color);
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	/* border: 1px solid black; */
}
#app {
	min-height: 100vh;
	background: var(--body-bkg);
	display: grid;
	grid-template-rows: auto 1fr auto;
	font-family: arial;
	line-height: 1.6;
}
@font-face {
	font-family: 'Zilla Slab';
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src: url("/fonts/Zilla Slab.woff2") format('woff2');
}
@font-face {
	font-family: 'Brush Script MT';
	src: url("/fonts/Brush Script MT.ttf");
}
/* Global styles */
.container {
	margin: auto;
	overflow: hidden;
	width: 80%;
}
.panel {
	background: var(--main-bkg);
	margin: var(--margin-buffer) auto;
	padding: 1em;
	min-width: inherit;
}
.page {
	padding: 2em;
	line-height: 1.8;
	/* width: 70%; */
	background: var(--main-bkg);
	max-width: 1200px;
}
.page p {
	margin: 2em auto;
}
.page h2 ~ p {
	margin: 1em auto;
}
.seperator {
	margin: 1em auto;
	width: 90%;
	text-align: center;
}
.seperator .heading {
	padding-bottom: 0.75em;
}
.base-border {
	border-bottom: var(--accent-border);
}
.side-border {
	border-right: var(--accent-border) !important;
}
.rgb_border {
	box-shadow: 5px 5px 8px blue, 10px 10px 8px red, 15px 15px 8px green;
}
.drop-shadow {
	box-shadow: var(--main-shadow);
	  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
#secret-canvas {
	position: fixed;
	pointer-events: none;
	width: 100%;
	height: 100%;
}

@media (max-width: 767px) {
	:root {
		--margin-buffer: 2em;
	}
	.container {
		width: 100%;
	}
	.panel {
		width: 90% !important;	
		min-width: inherit;
		text-align: center;
	}
	.page {
		max-width: 95%;
	}
	.page p {
		margin: 1em auto;
	}
}

.tooltip {
	position: relative;
}

.tooltip:hover::after {
	background: rgba(0, 0, 0, .8);
	border-radius: .5em;
	bottom: 2em;
	color: var(--white-txt);
	content: attr(title);
	display: block;
	transform: translate(-50%);
	left: 50%;
	padding: .3em 1em;
	position: absolute;
	text-shadow: 0 1px 0 #000;
	white-space: nowrap;
	z-index: 98;
}

</style>
