<template>
	<div class="container">
		<div id="project">
			<main>
				<h1 class="title">{{project.name}}</h1>
				<p class="short-desc" v-html="project.short_description"></p>
				<hr>
				<article class="description" v-html="project.description"></article>
			</main>
			<aside>
				<img :v-if="image" :src="image">
				<a class="link" id="download-link" :href="project.download">Download</a>
				<a :href="project.source" class="link" id="source-link">
					<font-awesome-icon :icon="['fab', 'github']" /> Source Code
				</a>
			</aside>
		</div>
	</div>
</template>

<script>
import projectData from "../../assets/projects.json"
let project, image;
export default {
	data() {
		const identifier = this.$route.params.identifier;

		project = projectData.projects.filter(project => project.identifier == identifier)[0]
		if (project.image)
			try {
				image = require("../../assets/images/projects/" + project.image)
			} catch (error) {
				console.log(error)
			}
		return {
			project,
			image
		}
	},
	created() {

	}
}
</script>

<style scoped>
#project {
	background: var(--main-bkg);
	width: 70%;
	margin: var(--margin-buffer-desktop) auto;
	display: flex;
	padding: 1em;
	align-content: space-around;
}
article >>> p {
	margin: 0.5em 0;
}
aside {
	flex: 1 0 30%;
	text-align: center;
}
.short-desc {
	color: grey;
	font-size: 0.8em;
}
.description {
	margin-top: 2em;
}
aside img {
	display: block;
	width: 100%;
	padding-bottom: 2em;
}
.link {
	display: block;
	width: 80%;
	padding: 0.5em 0.75em;
	text-decoration: none;
	margin: auto;
	font-size: 1.2em;
}
#download-link {
	border: 3px solid var(--accent-color);
	background: var(--main-bkg);
	color: var(--accent-color);
	margin: 0.6em auto;
}
#download-link:hover {
	color: white;
	background: green;
}
#source-link {
	border: 3px solid black;
	color: black;
}
#source-link:hover {
	color: white;
	background: black;
}
@media (max-width: 767px) {
	#project {
		flex-direction: column;
		width: 90%;
		margin: var(--margin-buffer-mobile) auto;
		text-align: center;
	}
}
</style>
