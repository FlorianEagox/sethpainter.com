<template>
	<article id="greeter" class="side-border">
		<h2 class="title">Ahoy There!</h2>
		<Logo @logoSecret="passEvent" class="strokeless" />
		<p>
			I'm Tessa Painter <span class="pronouns-wrapper" v-show="true"><span class="pronouns">(they/them)</span></span>, a software developer and freelancer located in Memphis Tennessee. This is the home of my projects and ideas. I like to make games, WebApps, and really any kinds of software. I also run a blog with topics including programming tutorials, blindness, and assistive technology. Below you can find my featured projects, articles, and links to my various social platforms. Feel free to drop me a line if you're interested in professional opportunities or just want to chat! I do plenty of work on commission, so don't hesitate to contact me if you're interested in my services.
		</p>
		<button href="#" v-scroll-to="'#projects-seperator'" class="btn-black">
			Featured Projects
		</button>
	</article>
</template>

<script>
export default {
	methods: {
		passEvent() {
			this.$emit('logoSecret');
		}
	},
	mounted() {
		window.onresize = () => {
			this.$el.classList.add(matchMedia('(max-width: 767px)').matches ? 'base-border' : 'side-border');
			this.$el.classList.remove(matchMedia('(max-width: 767px)').matches ? 'side-border' : 'base-border');
		}
		window.onresize();
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
}
#greeter h1 {
	margin: 0.5em 0;
}
#greeter Logo {
	padding: 0.1em;
}
.pronouns {
	font-size: 1.35rem;
	border-radius: 5px;
	font-weight: bolder;
	-webkit-text-stroke: #fff 1px;
	padding: 4px;
	background: linear-gradient(180deg, #fff434 0%, #fff434 25%, #ffffff 25%, #ffffff 50%, #9b59d0 50%, #9b59d0 75%, #000000 75%, #000000 100%);
	/* -webkit-text-fill-color: transparent; */
	/* text-shadow: 0 0 1px #fff434, 0 0 1px #9b59d0; */
}

.btn-black {
	margin-top: 2em;
	padding: 0.75em;
	border: 3px solid var(--main-color);
	background: none;
	color: var(--main-color);
}
.btn-black:hover {
	transition: 0.1s;
	background: black;
	color: white;
	border-color: black;
}
@media (max-width: 767px) {
	#greeter {
		width: 90%;
		min-width: inherit;
		margin: 2em auto;
		padding: 2em 1em;
		min-width: inherit;
	}
}
</style>
