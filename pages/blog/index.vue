<template>
	<div class="container">
		<PageHeader text="Blog" />
		<div id="articles">
			<nuxt-link v-for="article in articles" :key="article.slug" :to="article.path">{{article.title || article.slug}}</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({$content}) {
		const articles = await $content('blog').fetch();
		console.log(articles)
		return { articles };
	}
}
</script>