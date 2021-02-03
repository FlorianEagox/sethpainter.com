<template>
	<div class="container">
		<header>
			<h2><span id="name">{Sethington's</span> <span id="story">Story}</span></h2>
		</header>
		<section id="featured" v-if="featured.length">
			<div class="seperator">
				<h2 class="heading">Featured Articles</h2>
				<hr>
			</div>
			<div id="featured-articles">
				<div class="article side-border" v-for="article in featured" :key="article">
					<h3 class="heading">
						<nuxt-link :to="article.path" v-text="article.title || article.slug" />
					</h3>
					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, nam?</p>
				</div>
			</div>
		</section>
		<section id="blog">
			<aside>
				<search-bar @change.native="search" />
				<catagory-box :catagories="['Tech', 'Blindness', 'Programming', 'Misc']" />
			</aside>
			<div id="articles">
				<div class="seperator">
					<h2 class="heading">Latest Articles</h2>
					<hr>
				</div>
				<!-- <nuxt-link v-for="article in articles" :key="article.slug" :to="article.path" class="panel">{{article.title || article.slug}}</nuxt-link> -->
				<div class="article side-border" v-for="article in articles" :key="article.slug">
					<h2 class="heading">
						<nuxt-link :to="article.path" v-text="article.title || article.slug" />
					</h2>
					<summary v-text="article.description" />
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import SearchBar from '~/components/SearchBar.vue';
let articles;
export default {
	components: { SearchBar },
	async asyncData({$content}) {
		articles = await $content('blog').where({ hidden: { $ne: true } }).fetch();
		const featured = await $content('blog').where({ featured: true }).fetch();
		return { articles, featured };
	},
	methods: {
		async search(e) {
			this.articles = await this.$content('blog').search(e.target.value).fetch();
		}
	}
}
</script>

<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@700&display=swap');
	.container {
		width: 100%;
		display: grid;
		place-items: center;
	}
	header {
		width: calc(100% - 1em);
		margin: 1em;
		padding: 1em;
		font-size: 3em;
		background: url("~assets/images/blog_bkg.jpg") center fixed;
		display: grid;
		place-items: center;
		color: var(--white-txt);
		text-shadow: 0 0 5px;
	}
	header h2 {
		font-size: 2em;
		backdrop-filter: blur(10px);
		box-shadow: 25px 25px 50px 0 rgba(0,0,0,0.5) inset, -25px -25px 50px 0 rgba(0,0,0,0.5) inset;
	}
	header #name {
		font-family: cursive;
	}
	header #story {
		font-family: monospace;
	}
	.seperator {
		width: auto;
	}
	#featured-articles {
		display: flex;
		justify-content: center;
	}
	#blog {
		display: flex;
		align-items: flex-start;
		width: 100%;
	}
	aside {
		margin-top: 5em;
		font-size: 1.1em;
	}

	#articles {
		margin: 1em;
		flex-grow: 1;
	}
	.article {
		background: var(--main-bkg);
		padding: 1em;
		margin: 1em;
	}
	.article .heading {
		font-family: 'Zilla Slab';
		margin-bottom: 0.2em;
	}
	@media (max-width: 767px) {
		header {
			font-size: 1.3em;
		}
		#blog {
			/* text-align: center; */
			align-items: center;
			flex-direction: column;
		}
		#blog #catagory-box {
			margin: 1em;
		}
	}
</style>
