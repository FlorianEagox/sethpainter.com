<template>
	<header>
		<div class="container">
			
			<div id="title">
				<nuxt-link to="/">
					<h1 v-html="currentTitle"></h1>
				</nuxt-link>
			</div>
			
			<nav>
				<ul>
					<li :class="{onPage: $route.path == '/'}">
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase() == '/ABOUT'}">
						<nuxt-link to="/About">About</nuxt-link>
					</li>
					<li :class="{onPage: $route.path.toUpperCase() == '/PROJECTS'}">
						<nuxt-link to="/projects">Projects</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
const initTitle = "Sethington's Site";
let currentTitle = initTitle;

export default {
	name: 'Header',
	data() {
		return { currentTitle }
	},
	created() {
		let index = 0;
		let dir = 1;
		setInterval(() => {
			if (dir == 1)
				if (index == initTitle.length - 1)
					dir = -1;
			if (dir == -1)
				if (index <= 0)
					dir = 1;
			index += dir;
			this.currentTitle = [initTitle.slice(0, index), '<span class="accent">', initTitle.slice(index, index + 1), '</span>', initTitle.slice(index + 1)].join('');
		}, 350)
	}
};
</script>

<style scoped>
header {
	color: var(--white-txt);
	background: var(--dark-bkg);
	border-bottom: solid var(--accent-color) 6px;
	padding: 0.8em;
	padding-top: 2em;
}
header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
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
}
ul {
	list-style-type: none;
}
li {
	display: inline-block;
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
@media (max-width: 767px) {
	header .container {
		flex-direction: column;
	}
	ul {
		margin-top: 1.25em;
	}
	li {
		margin: auto 0.25em;
	}
}
</style>
