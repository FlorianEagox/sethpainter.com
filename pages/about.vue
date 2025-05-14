<template>
	<div class="container">
		<article class="panel page drop-shadow">
			<h1 class="title">About Tessa Painter</h1>
			<hr>
			<div id="about">
				<nuxt-content id="about_text" :document="article" />
			</div>
			<p>Last updated {{article.updatedAt}}</p>
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

<style scoped>

	#about {
		max-width: 100%;
		overflow: auto;
	}

	#about >>> #literally_me {
		width: 30%;
		float: right;
		margin-left: 0.5em;
	}

	/* p:not(:first-child) {
		float: left;
		width: 70%;
		background: red;
	} */
	#about_text {
		float:right;
	}
</style>
