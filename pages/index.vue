<template>
	<div ref="main" class="container">
		<Greeter />
		<div class="seperator" id="projects-seperator">
			<h2 class="heading">Featured Projects</h2>
			<hr>
		</div>
		<div id="featured-projects">
			<ContentCard
				v-for="project in featuredProjects"
				:key="project.slug"
				:title="project.name"
				:description="project.description"
				:image="project.image"
				:location="'/project/' + project.slug"
				read-more="true"
			/>
		</div>
		<div class="seperator" id="projects-seperator">
			<h2 class="heading">View all my projects <nuxt-link to="/projects">Here</nuxt-link></h2>
			<hr>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ $content }) {
		const featuredProjects = await $content('projects').where({ featured: true }).fetch();
		return { featuredProjects };
	}
};
</script>

<style>
#featured-projects {
	margin: 1em auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
#featured-projects > .card {
	--gap-space: 4em;
	flex: 0 1 calc((100% - var(--gap-space)) / 2);
	margin: calc(var(--gap-space) / 2) 0;
	max-width: 800px;
}
@media (max-width: 767px) {
	#featured-projects {
		flex-direction: column;
		width: 85%;
	}
	#featured-projects .card {
		--gap-space: 1em;
	}
}
</style>
