<template>
	<div class="container">
		<h1>An Article!</h1>
		<nuxt-content :document="article" />
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

</style>