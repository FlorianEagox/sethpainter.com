<template>
	<svg ref="svg"
	width="103" height="89"
	@dblclick="tearScreen">
		<defs id="genericDefs" />
		<g>
			<g style="fill:red; stroke-linecap:round; stroke:red;">
				<path style="stroke:none;" d="M1 1 L51 87 L101 1 Z" />
			</g>
			<g style="stroke-linecap:round;">
				<path style="fill:none;" d="M1 1 L51 87 L101 1 Z" />
				<circle r="25.9808" style="fill:lime; stroke:none;" cx="51" cy="29" />
				<circle r="25.9808" style="fill:none;" cx="51" cy="29" />
				<circle r="15.5885" style="fill:blue; stroke:none;" cx="51" cy="29" />
				<circle r="15.5885" style="fill:none;" cx="51" cy="29" />
			</g>
		</g>
	</svg>
</template>
<script>
import html2canvas from 'html2canvas'

export default {
	name: 'Logo',
	methods: {
		async tearScreen() {
			const pageRoot = document.querySelector('#app');
			let canvas = await html2canvas(pageRoot, {
				imageTimeout: 0
			});
			canvas.id = 'secret-canvas';
			pageRoot.appendChild(canvas);
			this.$router.push('florian')
			const ctx = canvas.getContext("2d");

			const leftHalf = ctx.getImageData(0, 0, canvas.width / 2, canvas.height);
			const rightHalf = ctx.getImageData(canvas.width / 2, 0, canvas.width, canvas.height);
			const dropShadow = 30, randomSpeedAdjustment = 140;
			let delta = 0, prevTime = 0;
			let displacement = 0, speed = 200, offset = 0;
			let transitionedPage = false;
			ctx.shadowColor = "black";
			ctx.shadowBlur = 20;
			ctx.globalCompositeOperation = 'multiply';
			ctx.textBaseline = '100'
			// const _this = this;
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
			window.requestAnimationFrame(rip);
		}
	}
}
</script>

<style scoped>
svg.strokeless {
	/* stroke-opacity: 0 !important; */
}
svg {
	stroke-opacity: 0;
	stroke: black;
	stroke-miterlimit: 10;
	stroke-width: 1.5;
	transform-origin: center 33%;
	pointer-events: none;
}
circle {
	pointer-events: auto;
}
svg:hover {
	animation: 1s rotate infinite linear;
}
svg:active {
	animation: none;
}
@keyframes rotate {
	to {
		transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		stroke-width: 5 !important;
	}
}
</style>
