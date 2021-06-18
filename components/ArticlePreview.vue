<template>
	<div class="article drop-shadow">
		<h2 class="heading">
			<nuxt-link :to="encodeURI(article.path)" v-text="article.title || article.slug" />
		</h2>
		<summary v-text="article.description" />
	</div>
</template>

<script>
export default { props: ['article'] }
</script>

<style scoped>
.article {
	background: var(--main-bkg);
	padding: 1em;
	margin: 1em;
}
.article .heading {
	font-family: "Zilla Slab";
	margin-bottom: 0.2em;
}
</style>
