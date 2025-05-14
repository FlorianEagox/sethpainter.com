<template>
	<main>
		<div id="meta" class="base-border drop-shadow">
			<section id="categories" v-if="article.categories">
				<h2>Categories</h2>
				<hr>
				<ul class="meta-list">
					<li v-if="typeof article.categories == 'string'">
						<nuxt-link :to="`/blog?category=${article.categories}`" v-text="article.categories" />
					</li>
					<li v-else v-for="category in article.categories" :key="category" >
						<nuxt-link :to="`/blog?category=${category}`" v-text="category" />
					</li>
				</ul>
			</section>
			<Share
				:content="article"
				contentType="article"
			/>
			<secion id="player">
				<h2>Listen to this article</h2>
				<hr>
				<audio controls>
					<source :src="`/audio/blog/${article.slug}.mp3`" type="audio/mpeg">
				</audio>
			</secion>
			<Collapsable id="contents" v-if="article.toc.length">
				<h2 slot="before">On This Page</h2>
				<ul id="contents">
					<li v-for="link of article.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
						<nuxt-link :to="`#${link.id}`" v-text="link.text" />
					</li>
				</ul>
			</Collapsable>
		</div>
		<mailing-list />
		<article class="page drop-shadow">
			<nav-back text="Blog" path="./" />
			<h1 class="title" v-text="article.title" />
			<div id="dates">
				<span id="date-written">Written {{diaplayDate(article.createdAt)}}, </span>
				<span id="date-edited">Updated {{diaplayDate(article.updatedAt)}}</span>
			</div>
			<div id="description" v-text="article.description" />
			<nuxt-content :document="article" />
		</article>
		<nav id="wrap-nav">
			<NuxtLink id="prev" class="drop-shadow reverse-side-border" v-if="prev" :to="prev.slug">
				<font-awesome-icon :icon="['fas', 'arrow-left']" size="lg"/>
				<p v-text="prev.title" />
			</NuxtLink>
			<div v-else />
			<NuxtLink id="next" class="drop-shadow side-border" v-if="next" :to="next.slug">
				<p v-text="next.title" />
				<font-awesome-icon :icon="['fas', 'arrow-right']" size="lg"/>
			</NuxtLink>
			<div v-else />
		</nav>
	</main>
</template>

<script>
export default {
	mounted() {
		this.$el.querySelectorAll('img').forEach(img =>
			img.src = `/images/blog/${this.$route.params.article}/${img.src.split('/').slice(-1)}`
		);
	},
	async asyncData({$content, params}) {
		const [prev, next] = await $content('blog')
			.only(['title', 'slug'])
			.sortBy('createdAt', 'asc')
			.where({ hidden: { $ne: true } })
			.surround(params.article)
			.fetch();

		return {
			article: await $content('blog', params.article).fetch(),
			prev, next
		}
	},
	head() {
		return {
			titleTemplate: (this.article?.title || 'Article Not Found') + ' | %s',
			meta: [
				{ hid: 'description', name: 'description', content: this.article?.description || 'Project Not Found' },
				{ hid: 'og:description', name: 'og:description', content: this.article?.description || 'Project Not Found' },
				{ hid: 'og:title', name: 'og:title', content: (this.article?.title || 'Project Not Found') + ' | Tessa Painter' },
				{ hid: 'og:image', name: 'og:image', content: (`/images/blog/${this.article.slug}/${this.article?.mainImg}` || '') }
			]
		}
	},
	methods: {
		diaplayDate(date) {
			date = typeof date == 'string' ? new Date(date) : date;
			return date.toDateString();
		}
	},
	
}
</script>

<style scoped>
	main {
		margin: var(--margin-buffer) auto;
		overflow: visible;
		display: grid;
		grid-template-areas:
		'meta    article'
		'mailing article'
		'.       article'
		'.       wrap';
		grid-template-columns: 300px minmax(0, 1200px);
		gap: 2em;
		place-items: center;
		padding: 0 1em;
	}
	
	#meta {
		padding: 1em;
		background: var(--main-bkg);
		grid-area: meta;
		min-width: 300px;
	}
	#categories li {
		background: var(--body-bkg);
		padding: 0.1em 0.4em;
		margin: 0.25em;
	}
	#categories li {
		display: inline-block;
	}
	#categories a {
		color: inherit;
		text-decoration: none;
	}
	#categories li:hover {
		background: darkgrey;
	}

	
	#contents li {
		margin: 1em;
	}
	#contents a {
		color: inherit;
	}
	.toc3 {
		font-size: 0.9rem;
		text-indent: 1em;
	}

	article {
		text-align: left;
		grid-area: article;
		overflow: auto;
		max-width: 100%;
	}
	.title {
		font-size: 2em;
	}
	#dates {
		color: var(--light-text)
	}
	#description {
		font-style: italic;
	}

	/* CSS for content IN the article */
	h1, article >>> h2, article >>> h3 {
		font-family: 'Zilla Slab';
	}
	article >>> .nuxt-content-highlight {
		max-width: 100%;
		overflow: hidden;
	}
	article >>> img {
		width: 100%;
		margin: auto;
		min-height: 300px;
		background: #ccc;
	}
	article >>> ul {
		list-style-position: inside;
	}
	#wrap-nav {
		grid-area: wrap;
		display: flex;
		justify-content: space-between;
		width: 100%;
		display:flex;
	}
	#wrap-nav a {
		padding: 0.8em;
		background: var(--main-bkg);
		font-weight: bold;
		font-family: 'Zilla Slab';
		display: inline-flex;
		align-items: center;
		/* max-width: 50%; */
	}
	#prev {
		margin-right: 1em;
		display: flex;
		align-content: flex-end;
	}
	#prev p {
		margin-left: 1em;
	}
	#next {
		margin-left: 1em;
		display: flex;
		justify-content: flex-end;
		text-align: right;
	}
	#next p {
		margin-right: 1em;
	}

	@media (max-width: 900px) {
		main {
			grid-template-areas: 'meta' 'article' 'wrap' 'mailing';
			grid-template-columns: 100%;
			place-items: center;
			width: 95%;
			padding: 0;
		}
		article {
			padding: 1em 0.75em;
			max-width: 100%;
		}
		#categories ul {
			padding: 0.25em;
		}
		.title {
			font-size: 1.75em;
		}
		#dates {
			font-size: 0.7em;
		}
	}
	@media(max-width: 700px) {
		#wrap-nav {
			flex-direction: column;
		}
		#wrap-nav > * {
			margin-bottom: 1em;
		}
		#wrap-nav > *:last-child {
			margin-bottom: 0;
		}
	}
</style>
