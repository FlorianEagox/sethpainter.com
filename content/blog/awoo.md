---
title: I'm finna eeta chickie sammich
---

# Hoi hoi ho!

```js
function rip(time) {
	if (displacement <= canvas.width / 2) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (!transitionedPage && displacement >= canvas.width / 4) {
			// _this.$router.push('florian');
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
```