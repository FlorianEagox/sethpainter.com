<template>
	<div class="container">
		<header>
			<h2><span id="name">{Sethington's</span> <span id="story">Story}</span></h2>
			<h4>Tech, Blindness, and everything Sethington</h4>
		</header>
		<featured-articles />
		<section id="blog" class="container">
			<aside>
				<search-bar @change.native="search" />
				<category-box :categories="['Tech', 'Blindness', 'Programming', 'miscellaneous']" />
				<mailing-list />
			</aside>
			<div id="articles">
				<div class="seperator">
					<h2 class="heading">Latest Articles</h2>
					<hr>
				</div>
				<article-preview class="side-border" v-for="article in articles" :key="article.slug" :article="article" />
			</div>
		</section>
	</div>
</template>

<script>
let articles;
export default {
	async asyncData({$content}) {
		articles = await $content('blog').where({ hidden: { $ne: true } }).sortBy('createdAt', 'desc').fetch();
		return { articles };
	},
	methods: {
		async search(e) {
			this.articles = await this.$content('blog').search(e.target.value).fetch();
		}
	}
}
</script>

<style scoped>
	.container {
		width: 100%;
		display: grid;
		place-items: center;
	}
	header {
		width: 100%;
		padding: 1em;
		font-size: 3em;
		background: url("~assets/images/blog_bkg.jpg") center fixed;
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
	.seperator {
		width: auto;
	}
	#blog {
		display: flex;
		align-items: flex-start;
		width: 100%;
		max-width: 2000px;
	}
	aside {
		margin: 5em 1em 0;
		font-size: 1.1em;
		
	}
	aside > * {
		margin: 1em 0;
	}
	#articles {
		margin: 1em;
		flex-grow: 1;
	}
	@media (max-width: 767px) {
		.container {
			/* text-align: center; */
		}
		header {
			font-size: 1.3em;
		}
		#featured-artilces {
			flex-direction: column;
		}
		#blog {
			/* text-align: center; */
			align-items: center;
			flex-direction: column;
		}
		aside {
			margin: 0;
		}
		#articles {
			margin: 0;
		}
		#blog #category-box {
			margin: 1em;
		}
	}
</style>
