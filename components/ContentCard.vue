<template>
	<div class="card base-border drop-shadow">
		<h3><nuxt-link class="card-title" :to="location" v-text="project.name" /></h3>
		<img v-if="loadedImage" :src="loadedImage" :alt="project.title + ' image missing'">
		<hr>
		<p v-html="project.description" />
		<nuxt-link v-if="readMore" class="card-title" :to="location"><strong>Read More</strong></nuxt-link>
		<tech-icons v-if="project.technologies" :icons="project.technologies" />
	</div>
</template>

<script>
export default {
	props: ['project', 'readMore'],
	data() {
		let loadedImage = null;
		try {
			if(this.project.image)
				loadedImage = require(`../assets/images/projects/${this.project?.image}`);
		} catch (error) {
			console.error(error);
		}
		return { loadedImage };
	},
	computed: {
		location() {
			return `project/${this.project.slug}`;
		}
	}
}
</script>

<style scoped>
.card {
	display: inline-flex;
	flex-direction: column;
	padding: 1.5em;
	text-align: center;
	background: var(--main-bkg);
	line-height: 2;
	justify-content: space-between;
}
.card-title {
	text-decoration: none;
	color: black;
}
img {
	max-height: 200px;
	padding: 0.1em;
	max-width: 200px;
	/* width: 100%; */
	align-self: center;
	filter: drop-shadow(0px 0px 5px #000000);
	margin-bottom: 0.5em;
}
</style>
