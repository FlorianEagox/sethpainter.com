<template>
	<header>
		<div class="container">
			<div id="title">
				<nuxt-link to="/">
					<h1><span id="title-fun" v-html="currentTitle"/></h1>
				</nuxt-link>
			</div>

			<nav>
				<ul>
					<li :class="{onPage: $route.path == '/'}">
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase() == '/ABOUT'}">
						<nuxt-link to="/about">About</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase().includes('/PROJECT') && !$route.path.toUpperCase().includes('/BLOG')}">
						<nuxt-link to="/projects">Projects</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase().includes('/BLOG')}">
						<nuxt-link to="/blog">Blog</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase().includes('/HOBBIES')}">
						<nuxt-link to="/hobbies">Hobbies</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
const initTitle = 'Tessington\'s Site';
let currentTitle = 'Tessa Painter';

export default {
	name: 'Header',
	data() {
		return { currentTitle }
	},
	created() {
		let index = 0;
		let dir = 1; // the direction to go
		let skip; // the ammount of chars to jump
		if (process.client) { // This code only meant to be run on the client, not the server!!!
			this.currentTitle = initTitle;
			setInterval(() => {
				skip = 1;
				if (dir == 1 && index == initTitle.length - 1)
					dir = -1;
				if (dir == -1 && index <= 0)
					dir = 1;
				if (['\'', ' '].includes(initTitle[index + dir]))
					skip = 2;
				index += dir * skip;
				this.currentTitle = [initTitle.slice(0, index), '<span class="accent">', initTitle.slice(index, index + 1), '</span>', initTitle.slice(index + 1)].join('');
			}, 350);
		}
	}
};
</script>

<style scoped>
header {
	color: var(--white-txt);
	background: var(--dark-bkg);
	border-bottom: solid var(--accent-color) 6px;
	padding-bottom: 0.8em;
	padding-top: 2em;
}
header .container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%
}
#title {
	padding: 0.25em;
}
#title a {
	text-decoration: none;
	color: var(--white-txt);
}
#title >>> .accent {
	color: green;
	animation: wiggle 0.15s infinite;
	display: inline-block;
	font-weight: bold;
}
@keyframes wiggle {
	from { transform: rotate(-20deg) }
	to { transform: rotate(20deg) }
}
ul {
	list-style-type: none;
}
li {
	display: inline-block;
}
li:nth-last-child(2) {
	margin-right: 0.5em;
}
li a {
	color: white;
	text-decoration: none;
	display: inline-block;
	padding: 1.25em;
}

.onPage,
li:hover {
	background: #222;
	font-weight: bold;
}
@media (max-width: 805px) {
	header {
		padding-top: 1em;
	}
	#title {
		text-align: center;
	}
	#title-fun {
		display: block;
	}
	header .container {
		flex-direction: column;
	}
	ul {
		margin-top: 0.5em;
		display: flex;
		flex: 0 1 auto;
		max-width: 100vw;
		flex-wrap: wrap;
		justify-content: center;
		/* overflow: scroll; */

	}
	li a {
		padding: 0.7em;
	}
}
</style>
