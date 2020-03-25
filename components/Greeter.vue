<template>
	<article id="greeter">
		<h1>Greetings</h1>
		<p>I'm Seth. I'm a college freshman and an aspiring software developer and freelancer located in Memphis Tennessee. This website will be the home of my projects and ideas. I like to make games, WebApps, desktop software and more. I also plan to create some more programming tutorials and maybe even CTF walktroughs in the future. Below you can find links to my various social platforms so feel free to drop me a line!</p>
		<button class="btn-black">
			Featured Projects
		</button>
	</article>
</template>

<script>
export default {
	name: "Greeter"
}
</script>

<style scoped>
#greeter {
	margin: 4em auto;
	width: 50%;
	min-width: 600px;
	padding: 2em;
	text-align: center;
	line-height: 2;
	background: var(--main-bkg);
	border-right: 6px solid var(--accent-color);
}
#greeter h1 {
	margin: 0.5em 0;
}
.btn-black {
	margin-top: 2em;
	padding: 0.75em;
	border: 3px solid black;
	background: none;
}
.btn-black:hover {
	transition: 0.1s;
	background: black;
	color: white;
}
@media (max-width: 767px) {
	#greeter {
		width: 90%;
		min-width: inherit;
		margin: 2em auto;
		padding: 2em 1em;
		border-right: none;
		border-bottom: 6px solid var(--accent-color);
		min-width: inherit;
	}
}
</style>
