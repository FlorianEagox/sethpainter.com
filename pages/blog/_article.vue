<template>
	<div class="container">
		<article class="panel page">
		<nav-back text="Blog" path="./" />
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
		font-size: 2em;
	}
</style>
