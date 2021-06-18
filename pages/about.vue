<template>
	<div class="container">
		<article id="about" class="panel page">
			<h1>About Seth Painter</h1>
			<hr>
			<div>
				<nuxt-content :document="article" />
				<p>Last updated {{article.updatedAt}}</p>
			</div>
		</article>
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
		return {
			article
		}
	}
}
</script>
