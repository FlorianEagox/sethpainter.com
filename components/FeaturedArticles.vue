 <template>
	<section id="featured" v-if="featured">
		<div class="seperator">
			<h2 class="heading">Featured Articles</h2>
			<hr>
		</div>
		<div id="featured-articles">
			<article-preview class="side-border" v-for="article in featured" :key="article.slug" :article="article" />
		</div>
	</section>
</template>

<script>
export default {
	data () { return {featured: this.featured}},
	async fetch() {
		this.featured = await this.$content('blog').where({ featured: true }).fetch();
	}
}
</script>

<style scoped>
#featured {
	display: inline-block;
	grid-area: featured;
}
#featured-articles {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: stretch;
}
#featured-articles > * {
	flex: 1 1 400px;
}
</style>
