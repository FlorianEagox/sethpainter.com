<template>
	<div id="app">
		<div id="main">
			<Header />
			<nuxt />
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
export default {
	components: {
		Header,
		Footer
	}
};
</script>

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
html,
body,
#app {
	height: 100vh;
	background: var(--body-bkg);
}
#app {
	display: flex;
	flex-direction: column;
	font-family: arial;
	line-height: 1.6;
}
#main {
	flex: 1 0 auto;
}
.container {
	margin: auto;
	overflow: hidden;
	width: 80%;
}
.seperator {
	margin: auto;
	width: 90%;
	text-align: center;
}
.seperator .heading {
	padding-bottom: 0.75em;
}
footer {
	margin-top: auto;
}
@media (max-width: 767px) {
	div.container {
		width: 100%;
	}
}
</style>
