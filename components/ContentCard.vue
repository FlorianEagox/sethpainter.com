<template>
	<div class="card">
		<h3>
			<a
				class="card-title"
				href="#"
			>{{title}}</a>
		</h3>
		<img
			:v-if="image"
			:src="image"
		>
		<hr>
		<p v-html="description"></p>
		<a href="https://google.com">Read More</a>
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
	props: ['title', 'link', 'description', 'image']
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
