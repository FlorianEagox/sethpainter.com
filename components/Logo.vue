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
				<circle r="25.9808" id="circle-green" style="fill:lime; stroke:none;" cx="51" cy="29" />
				<circle r="25.9808" style="fill:none;" cx="51" cy="29" />
				<circle r="15.5885" id="circle-blue" style="fill:blue; stroke:none;" cx="51" cy="29" />
				<circle r="15.5885" style="fill:none;" cx="51" cy="29" />
			</g>
		</g>
	</svg>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
	methods: {
		async tearScreen() {
			const pageRoot = document.querySelector('#app');
			let sourceCanvas = await html2canvas(pageRoot, {imageTimeout: 0, scale: 1});

			const duration = 3.5;
			document.documentElement.style.setProperty('--secret-duration', duration + 's');

			const screenShade = document.createElement('div');
			screenShade.id = 'screen-shade';
			pageRoot.appendChild(screenShade);

			const leftCanvas = document.createElement('canvas');
			leftCanvas.id = 'left-canvas';
			pageRoot.appendChild(leftCanvas);
			const rightCanvas = document.createElement('canvas');
			rightCanvas.id = 'right-canvas';
			pageRoot.appendChild(rightCanvas);
			requestAnimationFrame(() => {
				leftCanvas.width = leftCanvas.scrollWidth;
				leftCanvas.height = leftCanvas.clientHeight;
				leftCanvas.getContext('2d').drawImage(sourceCanvas, 0, 0);
				rightCanvas.width = rightCanvas.scrollWidth;
				rightCanvas.height = rightCanvas.clientHeight;
				rightCanvas.getContext('2d').drawImage(sourceCanvas, sourceCanvas.width / 2, 0, sourceCanvas.width / 2, rightCanvas.height, 0, 0, rightCanvas.width, rightCanvas.height);
			})
			setTimeout(() => {
				leftCanvas.remove();
				rightCanvas.remove();
				screenShade.remove();
			}, duration * 1000);
			this.$router.push('florian');
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
	filter: drop-shadow(0 0 10px #f00);
}
#circle-green {
	filter: drop-shadow(0 0 5px #ff0);
}
#circle-blue {
	filter: drop-shadow(0 0 4px #0ff);
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
