<template>
	<main class="container">
		<aside class="base-border">
			<div id="categories">
				<h2>Categories</h2>
				<hr>
				<ul>
					<li v-if="typeof article.categories == 'string'">
						<nuxt-link :to="`/blog?category=${category}`" v-text="category" />
					</li>
					<li v-else v-for="category in article.categories" :key="category" >
						<nuxt-link :to="`/blog?category=${category}`" v-text="category" />
					</li>
				</ul>
			</div>
			<h2>On This Page</h2>
			<hr>
			<ul id="contents">
				<li v-for="link of article.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
					<nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
				</li>
			</ul>
		</aside>
		<article class="panel page">
			<nav-back text="Blog" path="./" />
			<h1 class="title" v-text="article.title" />
			<span id="date-written">Written: {{new Date(article.createdAt)}}, Updated: {{article.updatedAt}}</span>
			<nuxt-content :document="article" />
		</article>
	</main>
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

<style scoped>
	main {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin: var(--margin-buffer-desktop) auto;
		width: 100%;
	}
	aside {
		background: var(--main-bkg);
		max-width: 300px;
		padding: 1em;
	}
	#categories ul {
		list-style-type: none;
		padding: 1em 0.5em;
	}
	#categories li {
		background: var(--body-bkg);
		display: inline-block;
		padding: 0.1em 0.4em;
		margin: 0.25em;
	}
	#categories a {
		color: inherit;
		text-decoration: none;
	}

	#categories li:hover {
		background: darkgrey;
	}
	ul#contents {
		list-style-position: inside;
	}
	#contents li {
		margin: 1em;
	}
	#contents a {
		color: inherit;
	}
	h1, h2 {
		font-family: 'Zilla Slab';
	}
	article {
		text-align: left;
		margin: 0 1em;
		max-width: 1200px;
	}
	.title {
		font-size: 2em;
	}
</style>
