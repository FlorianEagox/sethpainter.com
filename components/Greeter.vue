<template>
	<article id="greeter">
		<h2>Ahoy There!</h2>
		<Logo @logoSecret="passEvent" class="strokeless" />
		<p>
			I'm Seth Painter, a software developer and freelancer located in Memphis Tennessee. This website will be the home of my projects and ideas. I like to make games, WebApps, desktop software, and more. I also plan to create some more programming tutorials and maybe even CTF walkthroughs. Below you can find my featured projects and links to my various social platforms, so feel free to drop me a line if you're interested in professional opportunities or just want to chat! I do plenty of work on commission, so don't hesitate to contact me if you're interested in my services.
		</p>
		<button href="#" v-scroll-to="'#projects-seperator'" class="btn-black">
			Featured Projects
		</button>
	</article>
</template>

<script>
import Logo from "../components/Logo"

export default {
	name: "Greeter",
	components: {
		Logo
	},
	methods: {
		passEvent() {
			this.$emit('logoSecret');
		}
	}
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
#greeter Logo {
	padding: 0.1em;
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
