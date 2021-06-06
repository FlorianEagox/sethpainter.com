<template>
	<main class="container">
		<div v-if="this.$route.query.email">
			<h1>You've been removed from my list!</h1>
			<p>{{this.$route.query.email}} will no longer recieve emails.</p>
		</div>
		<div v-else>
			<h1>It's possible there was an error leaving my mailing list.</h1>
			<h2>Please contact me for support if the issue is not resolved.</h2>
		</div>
		<p>You can rejoin here: </p>
		<mailing-list :email="this.$route.query.email"/>
	</main>
</template>

<style scoped>
	main {
		max-width: 800px;
	}
	main > *, main:first-child > * {
		margin: 1em;
	}
	#mailing-list {
		/* max-width: 500px;
		margin: auto;
		margin-top: 2em; */
	}
</style>
