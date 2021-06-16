<template>
	<main class="panel base-border">
		<h1>404 - The requested page or resource couldn't be found</h1>
		<hr>
		<p>Perhaps it has been moved or you have entered the wrong link</p>
		<p><nuxt-link to="/">Click here to go back home</nuxt-link></p>
	</main>
</template>

<style scoped>
	p {
		margin: 1em;
	}
	a {
		color: var(--accent-color)
	}
</style>