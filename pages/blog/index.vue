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
			<catagory-box :catagories="['Tech', 'Blindness', 'Programming', 'Misc']"/>
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
export default {
	async asyncData({$content}) {
		const articles = await $content('blog').fetch();
		const featured = articles.filter(article => article.featured);
		return { articles, featured };
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
	#blog #catagory-box {
		margin-top: 6em;
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
			font-size: 1.5em;
		}
		#blog {
			text-align: center;
			align-items: center;
			flex-direction: column;
		}
		#blog #catagory-box {
			margin-top: 1em;
		}
	}
</style>
