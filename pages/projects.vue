<template>
	<div class="container">
		<PageHeader text="Projects" />
		<div id="project-cards" class="panel">
			<!-- <CardHolder :cards="allProjects" label="All Projects" />
			<CardHolder
				v-for="(catagory, index) in projects"
				:key="index"
				:cards="catagory.projects"
				:label="catagory.name"
			/> -->
			<ContentCard
				v-for="project in allProjects"
				:key="project.identifier"
				:title="project.name"
				:description="project.short_description"
				:image="project.image"
				:location="'/project/' + project.identifier"
			/>
		</div>
	</div>
</template>

<script>
import projectData from '../assets/projects.json';
const projects = []
const allProjects = projectData.projects;

export default {
	head() {
		return {
			titleTemplate: "%s | Projects"
		}
	},
	data() {
		projects.length = 0;
		projectData.catagories.forEach(catagory =>
			projects.push({
				name: catagory.name,
				projects: projectData.projects.filter(project => project.catagories.map(catagory => catagory.toUpperCase()).includes(catagory.name.toUpperCase()))
			})
		);
		return { allProjects, projects }
	}
}
</script>

<style scoped>
#project-cards {
	background: var(--body-bkg);
	display: grid;
	gap: 1em;
	grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
}
</style>
