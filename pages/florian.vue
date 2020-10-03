<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<article id="intro">
				<img src="../assets/images/florian/badge transparent.png" alt="">
				<h2>Welcome to Florian's Secret Page!</h2>
				<p>Congratulations, you've found the secret page for Florian, my fursona! Here you will find all the art of I've commissioned of him, as well as an in-depth description of lore, personality, and the 3D model of him.</p>
				<p>Unfortunately for you, none of that is ready at the moment, so have this "lovely" pirate ship to tide you over. (Get it, tide? like the ocean!!! Hahaha I'm so funny)</p>
			</article>
			<div id="gallery" @click="nextImage" @contextmenu="enlarge">
				<div id="current">
					<img :src="currentImage.image">
					<p>Piece done by <a :href="currentImage.link"> {{ currentImage.artistName }}</a></p>
				</div>
				<div id="carousel">
					<div v-for="(image, index) in images" :key="index" class="image">
						<img :src="image.image">
					</div>
				</div>
			</div>
			<ModalImage ref="modal" />
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<model-fbx ref="model" src="../ship.fbx" :cameraRotation="{ x: 3, y: 2, z: -1 }" />
			</client-only>

		</div>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
import ModalImage from '../components/ModalImage';
import { ModelFbx } from 'vue-3d-model';
import { images } from '../assets/images/florian/images.json';

let imageIndex = 0;
let currentImage = images[imageIndex];
export default {
	components: { PageHeader, ModalImage, ModelFbx },
	data() {
		images.forEach(image => image.image = require(`../assets/images/florian//${image.path}`)); //image.path));
		return {
			images,
			currentImage
		}
	},
	methods: {
		nextImage() {
			imageIndex++;
			this.currentImage = images[imageIndex % images.length];
		},
		enlarge() {
			const modal = this.$refs.modal;
			modal.image = this.currentImage;
			modal.visible = true;
		}
	}
}
</script>

<style>
.image-modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	margin: auto auto;
}
</style>

<style scoped>
#intro {
	width: 60%;
	margin: 3em auto;
	margin-top: 15%;
	padding: 2em;
	text-align: center;
	line-height: 2;
	background: var(--main-bkg);
	border-bottom: 6px solid var(--accent-color);
}
#intro img {
	width: 50%;
	margin-top: -32%;
	filter: drop-shadow(5px 5px 10px #000000);
}
#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}

#current {
	width: 100%;
}
#current img {
	display: block;
	margin: 0 auto;
	/* height: 100%; */
	max-height: 70vh;
	max-width: 900px;
}

#carousel {
	display: flex;
	overflow: scroll;
}
#carousel img {
	height: 200px;
	margin: 0 0.2em;
}

@media (max-width: 767px) {
	#intro {
		width: 100%;
		min-width: inherit;
		margin: 2em auto;
		margin-top: 3.5em;
		padding: 2em 1em;
		min-width: inherit;
	}
	#intro img {
		width: 75%;
		margin-top: -45%;
	}
}
</style>
