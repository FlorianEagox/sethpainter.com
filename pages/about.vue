<template>
	<div class="container">
		<div id="about" class="panel">
			<h1>About Seth Painter</h1>
			<hr>
			<article>
				<nuxt-content :document="article" />
				<p>Last updated {{article.updatedAt}}</p>
			</article>
		</div>
	</div>
</template>

<script>
export default {
	head() {
		return {
			titleTemplate: "%s | About"
		}
	},
	async asyncData({$content, params}) {
		const article = await $content('site', 'about').fetch();
		console.log({article});
		return {
			article
		}
	}
}
</script>

<style>
#about {
	padding: 2em;
	line-height: 1.8;
	width: 70%;
}
p {
	margin: 2em auto;
}
</style>
