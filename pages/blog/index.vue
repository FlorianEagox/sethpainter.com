<template>
	<main>
		<header>
			<h2><span id="name">{Sethington's</span> <span id="story">Story}</span></h2>
			<h4>Tech, Blindness, and everything Sethington</h4>
		</header>
		<section id="blog">
			<featured-articles />
			<search-bar @keydown.native="search" />
			<category-box ref="categoryBox" :categories="existingCategories || ['Tech', 'Blindness', 'Programming', 'miscellaneous']" @change.native="filter" />
			<mailing-list />
			<div class="seperator">
				<h2 class="heading">Latest Articles</h2>
				<hr>
			</div>
			<div id="articles">
				<article-preview class="side-border" v-for="article in currentArticles" :key="article.slug" :article="article" />	
			</div>
		</section>
	</main>
</template>

<script>
let articles;
let existingCategories;
export default {
	async asyncData({$content}) {
		articles = await $content('blog').where({ hidden: { $ne: true } }).sortBy('createdAt', 'desc').fetch();
		existingCategories = [...new Set(
			articles.filter(article => article.categories)
			.reduce((allCategories, {categories}) =>
				allCategories.concat(categories), []
			)
		)];
		return { articles, currentArticles: articles, existingCategories };
	},
	mounted() {
		setTimeout(() => { // This is to access refs, I need to find a better way to do this.
			const queryCategory = this.$route.query.category;
			if (queryCategory) {
				this.$refs.categoryBox.$data.categoryData[queryCategory] = true
				this.$refs.categoryBox.$data.allChecked = false;
				this.filter();
			}
		}, 0)
	},
	methods: {
		async search(e) {
			this.currentArticles = await this.$content('blog').search(e.target.value).fetch();
		},
		filter() {
			const categoryBox = this.$refs.categoryBox.$data;
			const selectedCategories = Object.keys(categoryBox.categoryData).filter(category => categoryBox.categoryData[category]);
			if(categoryBox.allChecked)
				this.currentArticles = this.articles;
			else {
				this.currentArticles = this.articles.filter(article => {
					if(article.categories)
					if(typeof article?.categories == 'string')
						return selectedCategories.includes(article.categories)
					else
						return selectedCategories.some(category => article?.categories.includes(category));
				});
			}
		}
	},
}
</script>

<style scoped>
	main {
		width: 100%;
		display: grid;
		place-items: center;
		margin: auto;
	}
	header {
		width: 100%;
		height: 100%;
		padding: 1em;
		font-size: 3em;
		background: url("~assets/images/blog_bkg.jpg") center fixed;
		background-size: cover;
		background-repeat: no-repeat;
		display: grid;
		place-items: center;
		color: var(--white-txt);
		text-shadow: 0 0 30px;
		text-align: center;
	}
	header h2 {
		font-size: 2em;
		backdrop-filter: blur(10px);
		box-shadow: 25px 25px 50px 0 rgba(0,0,0,0.5) inset, -25px -25px 50px 0 rgba(0,0,0,0.5) inset;
		border-radius: 10px;
	}
	header #name {
		font-family: 'Brush Script MT';
	}
	header #story {
		font-family: monospace;
	}
	#blog {
		display: grid;
		max-width: 2000px;
		grid-template-areas:
		'featured featured'
		'. head'
		'search articles'
		'categories articles'
		'mailing articles'
		'. articles';
		grid-template-columns: 275px auto;
		overflow: visible;
		gap: 2em;
		width: 98%;
	}
	.seperator {
		grid-area: head;
		justify-self: stretch;
	}
	#search-bar, #category-box {
		font-size: 1.1em;
	}
	#articles {
		grid-area: articles;
		justify-self: stretch;
	}
	#articles > :first-child {
		margin-top: 0;
	}
	
	@media (max-width: 767px) {
		header {
			font-size: 1.3em;
		}
		#blog {
			grid-template-columns: 1fr;
			grid-template-areas: 
			'featured'
			'head'
			'search'
			'categories'
			'articles'
			'mailing';
			align-content: start;
			align-items: start;
			min-width: 0;
			width: 90%;
			margin: 1em 0;
		}
		.article, #featured-articles >>> .article {
			margin: 1em 0 !important;
		}
	}
</style>
 