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

/* Global styles */
.container {
	margin: auto;
	/* overflow: hidden; */
	width: 80%;
}
.panel {
	background: var(--main-bkg);
	margin: var(--margin-buffer-desktop) auto;
	padding: 1em;
	min-width: inherit;
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
.rgb_border {
	box-shadow: 5px 5px 8px blue, 10px 10px 8px red, 15px 15px 8px green;
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
}

</style>
