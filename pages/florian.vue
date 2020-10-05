<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<article id="intro">
				<img src="../assets/images/florian/badge transparent.png" alt="">
				<h2>Welcome to Florian's Secret Page!</h2>
				<p>Congratulations, you've found the secret page for Florian, my fursona! Here you will find all the art of I've commissioned of him, as well as an in-depth description of lore, personality, and the 3D model of him.</p>
				<p>Unfortunately for you, none of that is ready at the moment, so have this "lovely" pirate ship to tide you over. (Get it, tide? like the ocean!!! Hahaha I'm so funny)</p>
			</article>
			<div id="gallery" @contextmenu="enlarge">
				<div id="current">
					<img @click="nextImage" :src="currentImage.image">
					<p>Piece done by <a :href="currentImage.link"> {{ currentImage.artistName }}</a></p>
				</div>
				<div id="carousel" ref="carousel"
				@mousedown="clickCarousel" @mouseleave="mouseleaveCarousel" @mouseup="mouseupCarousel" @mousemove="mousemoveCarousel" @scroll="scrollCarousel">
					<img v-for="(image, index) in images" :key="index"
						:src="image.image" @click="selectImage(index)">
				</div>
			</div>
			<ModalImage ref="modal" />
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<!-- <model-fbx ref="model" src="../ship.fbx" backgroundAlpha=0.5 backgroundColor="#0077be" :cameraRotation="{ x: 3, y: 2, z: -1 }" /> -->
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
let slider = null;
let prevCarouselMouseX = 1;
let isDown = false;
let startX;
let scrollLeft;
let currentWidth = 0;
let remainder = -1;
export default {
	components: { PageHeader, ModalImage, ModelFbx },
	data() {
		images.forEach(image => image.image = require(`../assets/images/florian//${image.path}`)); //image.path));
		return {
			images,
			currentImage
		}
	},
	mounted() {
		slider = this.$refs.carousel;
		let marginOffset = 2 * (0.2 * parseFloat(getComputedStyle(slider).fontSize));
		let imagesCounted = 0;
		slider.children.forEach((img, index) => {
			console.log(currentWidth)
			if(currentWidth < slider.clientWidth) {
				if(currentWidth + img.clientWidth + marginOffset > slider.clientWidth) {
					remainder = img.clientWidth - (slider.clientWidth - currentWidth)
					currentWidth += remainder;
				} else
					currentWidth += img.clientWidth + marginOffset;
				images.push(images[index]);
			}
		})
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
		},
		selectImage(index) {
			imageIndex = index;
			this.currentImage = images[imageIndex % images.length];
		},
		scrollCarousel(e) {
			console.log(currentWidth)
			if (e.target.offsetWidth + e.target.scrollLeft >= e.target.scrollWidth - remainder) {
				e.target.scrollLeft = 1;
			}
			if (e.target.scrollLeft == 0)
				e.target.scrollLeft = e.target.scrollWidth - e.target.offsetWidth - remainder - 1
		},
		clickCarousel(e) {
			isDown = true;
			startX = e.pageX -slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		},
		mouseleaveCarousel() {
			isDown = false;
			slider.classList.remove('active');
		},
		mouseupCarousel() {
			isDown = false;
			slider.classList.remove('active');
		},
		mousemoveCarousel(e) {
			if(isDown) {
				e.preventDefault();
				const x = e.pageX - slider.offsetLeft;
				const walk = (x - startX) * 3; //scroll-fast
				slider.scrollLeft = scrollLeft - walk;
			}
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
	max-width: 90%;
	max-height: 90%;
}

#carousel {
	display: flex;
	overflow-x: scroll;
}
#carousel img {
	height: 200px;
	margin: 0 0.2em;
	user-drag: none; -moz-user-select: none; -webkit-user-drag: none;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
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
