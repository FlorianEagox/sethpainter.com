<template>
	<div class="card">
		<h3>
			<nuxt-link class="card-title" :to="location">{{title}}</nuxt-link>
		</h3>
		<img :v-if="image" :src="image">
		<hr>
		<p v-html="description"></p>
		<nuxt-link v-if="location" class="card-title" :to="location">{{title}}</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'ContentCard',
	created() {
		if (this.image)
			try {
				this.image = require('../assets/images/projects/' + this.image)
			} catch (error) {
				console.log(error)
			}
	},
	props: ['title', 'link', 'description', 'image', "location"]
}
</script>

<style scoped>
.card {
	display: inline-block;
	border-bottom: 0.5em solid green;
	padding: 1.5em;
	text-align: center;
	background: var(--main-bkg);
	line-height: 2;
}
.card-title {
	text-decoration: none;
	color: black;
}
img {
	max-height: 150px;
	/* width: 100%; */
	/* object-fit: scale-down; */
}
</style>
