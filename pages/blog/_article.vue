<template>
	<div class="container">
		<nuxt-link to="/blog">All Articles</nuxt-link>
		<article class="panel page">
			<h1 class="title" v-text="article.title" />
			<nuxt-content :document="article" />
		</article>
	</div>
</template>

<script>
export default {
	async asyncData({$content, params}) {
		return {
			article: await $content('blog', params.article).fetch()
		}
	}
}
</script>

<style>
	.container {
		display: block;
	}
	.title {
		font-family: 'Zilla Slab';
	}
</style>
