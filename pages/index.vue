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
				:key="project.identifier"
				:title="project.name"
				:description="project.short_description"
				:image="project.image"
				:location="'/project/' + project.identifier"
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
import projectData from "../assets/projects.json"

export default {
	asyncData() {
		const featuredProjects = [];
		projectData.featured.forEach(identifier =>
			featuredProjects.push(projectData.projects.filter(project => project.identifier == identifier)[0])
		);
		return {
			featuredProjects
		};
	},
};
</script>

<style>
#featured-projects {
	margin: 1em auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	/* gap: 3em; */ /* because chrome is a poopy head :,-[ */
}
#featured-projects > .card {
	--gap-space: 4em;
	flex: 0 1 calc((100% - var(--gap-space)) / 2);
	margin: calc(var(--gap-space) / 2) 0;
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
