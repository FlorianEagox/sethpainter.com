<template>
	<header>
		<div class="container">
			<div id="title">
				<h1>Sethington's Site</h1>
			</div>
			<nav>
				<ul>
					<li>
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/About">About</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/projects">Projects</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	components: {}
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
ul {
	list-style-type: none;
}
li {
	height: 100%;
	display: inline-block;
	padding: 1.25em;
}
li * {
	color: white;
	text-decoration: none;
	padding: 1.25em 0;
}

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
