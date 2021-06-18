<template>
	<nuxt-content :document="article" />
</template>
<script>
export default {
	layout: 'dummy',
	async asyncData({$content, params}) {
		return {
			article: await $content('blog', params.rss).fetch()
		}
	},
}
</script>