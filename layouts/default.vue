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
	--body-bkg: #ddd;
	--dark-bkg: #444;
	--responsive-switch: 767px;

	--margin-buffer-desktop: 4em;
	--margin-buffer-mobile: 2em;
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
	margin: var(--margin-buffer-desktop) auto;
	padding: 1em;
	min-width: inherit;
}
.page {
	padding: 2em;
	line-height: 1.8;
	/* width: 70%; */
	max-width: 1200px;
}
.page p {
	margin: 2em auto;
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
	border-bottom: 0.5em solid var(--accent-color);
}
.side-border {
	border-right: 0.5em solid var(--accent-color) !important;
}
.rgb_border {
	box-shadow: 5px 5px 8px blue, 10px 10px 8px red, 15px 15px 8px green;
}
.drop-shadow {
	box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.2);
	  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
#secret-canvas {
	position: fixed;
	pointer-events: none;
	width: 100%;
	height: 100%;
}

@media (max-width: 767px) {
	.container {
		width: 100%;
	}
	.panel {
		width: 90% !important;
		margin: var(--margin-buffer-mobile) auto;
		min-width: inherit;
		text-align: center;
	}
	.page {
		max-width: 95%;
	}
}

</style>
