<template>
	<div id="app">
		<Header />
		<nuxt />
		<Footer />
		<elevator-button />
		<Sundial />
		<ModalImage ref="modal" />
	</div>
</template>

<script>

export default {
	created() {
		this.$nuxt.$on('enlarge', (image) => this.enlarge(image));
	},
	methods: {
		enlarge(path) {
			this.$refs.modal.image = path;
			this.$refs.modal.visible = true;
		},
	}
};
</script>


<style>
:root {
  --accent-color: green;
  --dark-link: DarkGoldenrod;

  --main-bkg: white;
  --white-txt: #eee;
  --light-text: #bbb;
  --body-bkg: #ddd;
  --main-color: black;
  --dark-bkg: #444;

  color: var(--main-color);
  --margin-buffer: 4em;
  --main-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.19);
  --accent-border: 0.5em solid var(--accent-color);
  --secret-duration: 3s;
}

/* Manual or system-triggered dark mode */
.dark {
  --main-bkg: #333;
  --white-txt: #eee;
  --light-text: #999;
  --body-bkg: #222;
  --main-color: white;
  --dark-bkg: #444;
  color: var(--main-color);
}

/* Optional: dark-specific link styling */
.dark a {
  color: var(--dark-link);
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
	width:100%;
	overflow: auto;
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
@font-face {
	font-family: 'Cinzel Decorative';
	src: url("/fonts/Cinzel Decorative.wolf2");
	font-style: bold;
	font-weight: 700;
	font-display: swap;
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
	border-bottom: var(--accent-border) !important;
}
.side-border {
	border-right: var(--accent-border) !important;
}
.reverse-side-border {
	border-left: var(--accent-border) !important;
}

.rgb_border {
	box-shadow: 5px 5px 8px blue, 10px 10px 8px red, 15px 15px 8px green;
}
.drop-shadow {
	box-shadow: var(--main-shadow);
	  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
#left-canvas, #right-canvas {
	position: fixed;
	pointer-events: none;
	width: 50vw;
	height: 100vh;
	box-shadow: 0 0 15px 8px rgba(0, 0, 0, 0.19);
	animation-duration: var(--secret-duration);
	animation-timing-function: ease-in-out;
}
#left-canvas {
	animation-name: moveLeft;
	left: 0;
}
#right-canvas {
	animation-name: moveRight;
	left: 50%;
}
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
	background: rgba(0, 0, 0, 0.15);
	position: fixed;
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

.meta-list {
	list-style-type: none;
	padding: 1em 0.5em;
}

</style>
