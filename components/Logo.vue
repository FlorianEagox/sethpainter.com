<template>
	<svg
	style="stroke-opacity:0;
	stroke:black; stroke-miterlimit:10;
	stroke-width:1.5;"
	width="103"
	height="89">
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
<style scoped>
svg.strokeless {
	/* stroke-opacity: 0 !important; */
}
svg {
	transform-origin: center 33%;
}
svg {
	pointer-events: none;
}
circle {
	pointer-events: auto;
}
svg:hover {
	animation: 1s rotate infinite linear;
}
@keyframes rotate {
	to {
		transform: rotate(360deg);
		stroke-width: 5 !important;
	}
}
</style>
