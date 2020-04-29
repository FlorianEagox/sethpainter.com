<template>
	<div class="container">
		<div id="project" class="panel">
			<NavBack />
			<div id="content" v-if="project">
				<main>
					<h1 class="title">{{project.name}}</h1>
					<p class="short-desc" v-html="project.short_description"></p>
					<hr>
					<article class="description" v-html="project.description"></article>
				</main>
				<aside>
					<img v-if="project.image" :src="image">
					<a target="blank" v-if="project.access" class="link" id="access-link" :href="project.access">
						{{ project.access_label ? project.access_label : "Download" }}
					</a>
					<a target="blank" v-if="project.source" :href="project.source" class="link" id="source-link">
						<font-awesome-icon :icon="['fab', 'github']" /> <span class="source-text">Source Code</span>
					</a>
				</aside>
			</div>
			<div id="content" v-else>
				<h1 class="error-missing">This project was not found. Perhaps it was moved or deleted.</h1>
			</div>
		</div>
	</div>
</template>

<script>
import NavBack from '../../components/NavBack'
import projectData from '../../assets/projects.json'
let project = null, image = null;
export default {
	head() {
		return {
			titleTemplate: '%s | ' + (project ? project.name : "Project Not Found"),
			meta: [
				{ hid: 'description', name: 'description', content: project ? project.short_description : 'Project Not Found' },
				{ hid: 'og:description', name: 'og:description', content: project ? project.short_description : 'Project Not Found' },
				{ hid: 'og:title', name: 'og:title', content: (project ? project.name : 'Project Not Found') + ' | Seth Painter' },
				{ hid: 'og:image', name: "og:image", content: image || '' },
			]
		}
	},
	components: {
		NavBack
	},
	data() {
		const identifier = this.$route.params.identifier;

		project = projectData.projects.filter(project => project.identifier == identifier)[0];
		if (project != null && project.image != null)
			try {
				image = require("../../assets/images/projects/" + project.image)
			} catch (error) {
				console.log(error)
			}
		return {
			project,
			image
		}
	}
}
</script>

<style scoped>
#project {
	width: 70%;
}
#project:first-child {
	border-bottom: 2px solid black;
}
#project #content {
	display: flex;
	padding: 2em;
	align-content: space-around;
}
.error-missing {
	color: darkred;
	text-align: center;
	margin: auto;
}
article >>> p {
	/* This changes raw html from the json */
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
#access-link {
	border: 3px solid var(--accent-color);
	background: var(--main-bkg);
	color: var(--accent-color);
	margin: 0.6em auto;
}
#access-link:hover {
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
	#project,
	#content {
		flex-direction: column;
		text-align: center;
	}
}
</style>
