<template>
	<div class="container">
		<article id="about" class="panel page drop-shadow">
			<h1 class="title">About Seth Painter</h1>
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
			titleTemplate: "About | %s"
		}
	},
	async asyncData({$content, params}) {
		return {
			article: await $content('site', 'about').fetch()
		}
	}
}
</script>
