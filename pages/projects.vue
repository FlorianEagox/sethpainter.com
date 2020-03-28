<template>
	<div class="container">
		<div id="projects" class="panel">
			<div class="page-tag base-border">
				<h1>Projects</h1>
			</div>
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
import CardHolder from '../components/CardHolder';
import projectData from '../assets/projects.json';
const projects = []
const allProjects = projectData.projects;

export default {
	components: {
		CardHolder
	},
	data() {
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
.page-tag {
	display: inline-block;
	margin: 0 auto;
	background: var(--main-bkg);
	padding: 0.5em 3em;
	border-bottom-width: 0.3em;
	margin-bottom: var(--margin-buffer-desktop);
}
</style>
