<template>
	<main>
		<div id="meta" class="base-border drop-shadow">
			<secion id="player">
				<h2>Listen to this poem</h2>
				<hr>
				<audio controls>
					<source :src="`/audio/poems/${poem.slug}.mp3`" type="audio/mpeg">
				</audio>
			</secion>
			<Share
				:content="poem"
				contentType="article"
				:title="poem.title"
			/>
		</div>
		<mailing-list />
		<article class="page drop-shadow">
			<nav-back text="Hobbies" path="/hobbies" />
			<h1 class="title" v-text="poem.title" />
			<div id="dates">
				<span id="date-written">Written {{diaplayDate(poem.createdAt)}}</span>
				<!-- <span id="date-edited">Updated {{diaplayDate(poem.updatedAt)}}</span> -->
			</div>
			<nuxt-content :document="poem" />
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
			img.src = `/images/poetry/${this.$route.params.poem}/${img.src.split('/').slice(-1)}`
		);
	},
	async asyncData({$content, params}) {
		const [prev, next] = await $content('poetry')
			.only(['title', 'slug'])
			.sortBy('createdAt', 'asc')
			.where({ hidden: { $ne: true } })
			.surround(params.poem)
			.fetch();

		return {
			poem: await $content('poetry', params.poem).fetch(),
			prev, next
		}
	},
	head() {
		return {
			titleTemplate: (this.poem?.title || 'Poem Not Found') + ' | %s',
			meta: [
				{ hid: 'description', name: 'description', content: this.poem?.description || '' },
				{ hid: 'og:title', name: 'og:title', content: (this.poem?.title || '404 Poem Not Found') + ' | Tessa Painter' },
				// { hid: 'og:image', name: 'og:image', content: (`/images/poems/${this.poem.slug}/${this.poem?.mainImg}` || '') }
			]
		}
	},
	methods: {
		diaplayDate(date) {
			date = typeof date == 'string' ? new Date(date) : date;
			return date.toDateString();
		},
		copy(text) {
			window.navigator.clipboard.writeText(text);
		}
	},
	computed: {
		url() {
			return `https://tessapainter.com${this.$route.fullPath}`;
		}
	}
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
	#categories ul, #share ul {
		list-style-type: none;
		padding: 1em 0.5em;
	}
	#categories li {
		background: var(--body-bkg);
		padding: 0.1em 0.4em;
		margin: 0.25em;
	}
	#categories li, #share li {
		display: inline-block;
	}
	#categories a, #share a {
		color: inherit;
		text-decoration: none;
	}
	#categories li:hover {
		background: darkgrey;
	}

	#share ul {
		display: flex;
		justify-content: space-around;
	}
	#share a:hover {
		color: var(--accent-color);
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
	article >>> p {
		margin: 0 auto
	}
	article {
		white-space: pre-line;
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
