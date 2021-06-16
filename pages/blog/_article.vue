<template>
	<main class="container">
		<aside class="base-border">
			<div id="categories" v-if="article.categories">
				<h2>Categories</h2>
				<hr>
				<ul>
					<li v-if="typeof article.categories == 'string'">
						<nuxt-link :to="`/blog?category=${category}`" v-text="article.categories" />
					</li>
					<li v-else v-for="category in article.categories" :key="category" >
						<nuxt-link :to="`/blog?category=${category}`" v-text="category" />
					</li>
				</ul>
			</div>
			<div id="contents" v-if="article.toc.length">
				<h2>
					On This Page
					<button id="btn-collapse" @click="showContents = !showContents"><font-awesome-icon :icon="['fas', 'sort-down']" size="2x" /></button>
				</h2>
				<hr>
				<ul id="contents" v-if="showContents">
					<li v-for="link of article.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
						<nuxt-link :to="`#${link.id}`" v-text="link.text" />
					</li>
				</ul>
			</div>
		</aside>
		<article class="panel page">
			<nav-back text="Blog" path="./" />
			<h1 class="title" v-text="article.title" />
			<div class="dates">
				<span id="date-written">Written: {{diaplayDate(article.createdAt)}}, </span>
				<span id="date-edited">Updated: {{diaplayDate(article.updatedAt)}}</span>
			</div>
			<nuxt-content :document="article" />
		</article>
	</main>
</template>

<script>
export default {
	async asyncData({$content, params}) {
		return {
			showContents: true,
			article: await $content('blog', params.article).fetch()
		}
	},
	mounted() {
		console.log(window.innerWidth)
		if(window.innerWidth < 767)
			this.showContents = false;
	},
	head() {
		return {
			titleTemplate: (this.article?.title || 'Article Not Found') + ' | %s',
			meta: [
				{ hid: 'description', name: 'description', content: this.article?.description || 'Project Not Found' },
				{ hid: 'og:description', name: 'og:description', content: this.article?.description || 'Project Not Found' },
				{ hid: 'og:title', name: 'og:title', content: (this.article?.description || 'Project Not Found') + ' | Seth Painter' },
				{ hid: 'og:image', name: 'og:image', content: (this.article?.mainImg || '') }
			]
		}
	},
	methods: {
		diaplayDate(date) {
			console.log(this.article.categories)
			date = typeof date == 'string' ? new Date(date) : date;
			return date.toDateString();
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
		margin: 0 0.5em;
		flex: 0 0 auto;
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
	.toc3 {
		font-size: 0.9rem;
		text-indent: 1em;
	}
	#categories li:hover {
		background: darkgrey;
	}
	#btn-collapse {
		background: none;
		border: none;
	}
	#contents ul {
		list-style-position: inside;
	}
	#contents li {
		margin: 1em;
	}
	#contents a {
		color: inherit;
	}
	article {
		text-align: left;
		margin: 0 0.5em;
		flex: 1 1 auto;
		min-width: 0;
	}
	h1, h2, h3 {
		font-family: 'Zilla Slab';
	}
	.title {
		font-size: 2em;
	}
	@media (max-width: 767px) {
		main {
			flex-direction: column;
			align-items: center;
		}
		aside {
			margin: 0 auto 1em;
			width: 90%;
		}
		article {
			padding: 1em 0.5em;
		}
	}
</style>
