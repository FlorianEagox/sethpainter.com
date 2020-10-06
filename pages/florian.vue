<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<article id="intro">
				<img src="~assets/images/florian/badge transparent.png" alt="">
				<h2>Welcome to Florian's Secret Page!</h2>
				<p>Congratulations, you've found the secret page for Florian, my fursona! Here you will find all the art of I've commissioned of him, as well as an in-depth description of lore, personality, and the 3D model of him.</p>
				<p>Unfortunately for you, none of that is ready at the moment, so have this "lovely" pirate ship to tide you over. (Get it, tide? like the ocean!!! Hahaha I'm so funny)</p>
			</article>
			<div @keydown="switchImage" tabindex="0" id="gallery" @contextmenu="enlarge">
				<div id="current">
					<img @click="nextImage" :src="currentImage.image">
				</div>
				<p>Piece done by <a :href="currentImage.link"> {{ currentImage.artistName }}</a></p>
				<div id="carousel" ref="carousel"
				@mousedown="clickCarousel" @mouseleave="mouseleaveCarousel" @mouseup="mouseupCarousel" @mousemove="mousemoveCarousel" @scroll="scrollCarousel">
					<img v-for="(image, index) in images" :key="index"
						:src="image.image" @click="selectImage(index)">
				</div>
			</div>
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<div id="ship-wrapper">
					<model-fbx src="../ship.fbx" :backgroundAlpha=0.5 backgroundColor="#0077be" :cameraRotation="{ x: 3, y: 2, z: -1 }"></model-fbx>
				</div>
			</client-only>
			<section id="refsheet">
				<PageHeader text="Character Reference" />
				<div id="ref-images">
					<img @click="enlarge" src="~assets/images/florian/ref/front.png">
					<img @click="enlarge" src="~assets/images/florian/ref/side.png">
					<img @click="enlarge" src="~assets/images/florian/ref/back.png">
				</div>
			</section>
		</div>
		<ModalImage ref="modal" />
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
import ModalImage from '../components/ModalImage';
import { ModelFbx } from 'vue-3d-model';
import imageData from '../assets/images/florian/images.json';

let imageIndex = 0;
let images = imageData;
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
		images.forEach(image => image.image = require(`../assets/images/florian/${image.path}`));
		return {
			images,
			currentImage
		}
	},
	mounted() {
		// images = images.filter(image => !image.clone)
		slider = this.$refs.carousel;

		let marginOffset = 2 * parseFloat(getComputedStyle(slider.children[0]).marginLeft);
		let imagesCounted = 0;
		slider.children.forEach((img, index) => {
			if(currentWidth < slider.clientWidth) {
				if(currentWidth + img.clientWidth + marginOffset > slider.clientWidth) {
					remainder = marginOffset + img.clientWidth - (slider.clientWidth - currentWidth)
					currentWidth += remainder;
				} else
					currentWidth += img.clientWidth + marginOffset;
				const clone = images[index];
				clone.clone = true;
				images.push(clone);
			}
		})
	},
	methods: {
		nextImage(e, backwards) {
			slider.children[imageIndex].classList.remove('selected');
			imageIndex += backwards ? -1 : 1;
			imageIndex = ((imageIndex % images.length) + images.length) % images.length;
			this.currentImage = images[imageIndex];
			const selectedImage = slider.children[imageIndex];
			slider.scrollLeft = selectedImage.offsetLeft - selectedImage.clientWidth / 2 - slider.clientWidth / 2;
			selectedImage.classList.add('selected');
		},
		enlarge(e) {
			const modal = this.$refs.modal;
			modal.image = e.target.src;
			modal.visible = true;
		},
		selectImage(index) {
			slider.children[imageIndex].classList.remove('selected');
			imageIndex = index;
			this.currentImage = images[imageIndex % images.length];
			const selectedImage = slider.children[imageIndex];
			slider.scrollLeft = selectedImage.offsetLeft - selectedImage.clientWidth / 2 - slider.clientWidth / 2;
			selectedImage.classList.add('selected');
		},
		scrollCarousel(e) {
			if (e.target.offsetWidth + e.target.scrollLeft >= e.target.scrollWidth - remainder)
				e.target.scrollLeft = 1;
			if (e.target.scrollLeft == 0)
				e.target.scrollLeft = e.target.scrollWidth - e.target.offsetWidth - remainder - 1
		},
		switchImage(e) {
			if(e.key == 'ArrowRight')
				this.nextImage();
			else if(e.key == 'ArrowLeft')
				this.nextImage(null, true);
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

#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}

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

#gallery {
	height: 90vh;
}
#current {
	width: 100%;
	height: 80%;
}
#current img {
	display: block;
	margin: auto;
	object-fit: contain;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
}

#carousel {
	display: flex;
	overflow-x: scroll;
	height: 20%;
}
#carousel img {
	height: 100%;
	object-fit: contain;
	margin: 0 0.5em;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}
#carousel img.selected {
	box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.5);
	border: 4px solid #000;
}
#ship-wrapper {
	height: 50%;
	width: 50%;
	min-width: 300px;
	max-width: 100%;
	margin: 3em auto 0;
}

#refsheet {
	margin-top: 2em;
	text-align: center;
	width: 100%;
}
#ref-images {
	display: flex;
	justify-content: space-around;
}
#ref-images img {
	align-self: center;
	filter: drop-shadow(5px 5px 5px #000000);
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
	#ref-images {
		flex-direction: column;
		width: 100%;
	}
}
</style>
