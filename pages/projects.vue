<template>
	<div class="container">
		<div id="projects" class="panel">
			<PageHeader text="Projects" />
			<CardHolder :cards="allProjects" label="All Projects" />
			<CardHolder
				v-for="(catagory, index) in projects"
				:key="index"
				:cards="catagory.projects"
				:label="catagory.name"
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
#projects {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
}
</style>
