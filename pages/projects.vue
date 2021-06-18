<template>
	<div class="container">
		<PageHeader text="Projects" />
		<div id="project-cards" class="panel">
			<!-- <CardHolder :cards="allProjects" label="All Projects" />
			<CardHolder
				v-for="(category, index) in projects"
				:key="index"
				:cards="category.projects"
				:label="category.name"
			/> -->
			<ContentCard
				v-for="project in projects"
				:key="project.slug"
				:title="project.name"
				:description="project.description"
				:image="project.image"
				:location="'/project/' + project.slug"
			/>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({$content}) {
		const projects = await $content('projects').fetch();
		return { projects };
	},
	head() {
		return {
			titleTemplate: "%s | Projects"
		};
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
