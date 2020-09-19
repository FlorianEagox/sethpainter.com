<template>
	<div ref="main" class="container">
		<Greeter @logoSecret="tearScreen" />
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
import ContentCard from '../components/ContentCard'
import Greeter from '../components/Greeter'
import projectData from "../assets/projects.json"
import html2canvas from 'html2canvas'
export default {
	components: {
		ContentCard,
		Greeter
	},

	asyncData() {
		const featuredProjects = [];
		projectData.featured.forEach(identifier =>
			featuredProjects.push(projectData.projects.filter(project => project.identifier == identifier)[0])
		);
		return {
			featuredProjects
		};
	},
	methods: {
		async tearScreen() {
			const pageRoot = document.querySelector('#app');
			let canvas = await html2canvas(pageRoot, {
				imageTimeout: 0
			});
			pageRoot.appendChild(canvas);
			const ctx = canvas.getContext("2d");
			const leftHalf = ctx.getImageData(0, 0, canvas.width / 2, canvas.height);
			const rightHalf = ctx.getImageData(canvas.width / 2, 0, canvas.width, canvas.height);
			let delta = 0, prevTime = 0;
			let displacement = 0, speed = 240;
			const dropShadow = 10;
			const _this = this;
			ctx.globalCompositeOperation = 'multiply';
			const grd = ctx.createLinearGradient(0, 0, dropShadow, 0);
			grd.addColorStop(0, "black");
			grd.addColorStop(1, "white");
			ctx.fillStyle = grd;
			function rip(time) {
				if (displacement <= canvas.width / 2) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.putImageData(leftHalf, 0 - displacement, 0);
					ctx.putImageData(rightHalf, canvas.width / 2 + displacement, 0);
					// Drop Shadows
					ctx.fillRect(canvas.clientWidth / 2 - displacement, 0, dropShadow, canvas.height)
					ctx.fillRect(canvas.clientWidth / 2 + displacement, 0, dropShadow, canvas.height)
					delta = (time - prevTime) / 1000;
					delta = Math.min(delta, 0.1);
					prevTime = time;
					displacement += speed * delta;
					window.requestAnimationFrame(rip);
				} else {
					canvas.remove();
					canvas = null;
					// _this.$router.push('florian')
				}
			}
			window.requestAnimationFrame(rip);
		}
	}
};
</script>

<style>
canvas {
	position: fixed;
	pointer-events: none;
	width: 100vh;
	height: 100vh;
}
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
