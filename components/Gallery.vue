<template>
	<div id="gallery" @keydown="switchImage" tabindex="0">
		<div id="current">
			<img @click="$nuxt.$emit('enlarge', `${basePath}/${currentImage.path}`)" :src="`${basePath}/${currentImage.path}`">
		</div>
		<slot name="caption" :currentImage="currentImage" />
		<div id="carousel" ref="carousel" @scroll="scrollCarousel">
			<img v-for="(image, index) in images" :key="index" :class="{selected: imageIndex == index}"
				:src="`${thumbnailPath || basePath}/${image.path}`" @click="selectImage(index)">
		</div>
	</div>
</template>

<script>
let slider = null;
let currentWidth = 0;
let remainder = -1;
export default {
	props: [
		"basePath",
		"imageData",
		"thumbnailPath"
	],
	data() {
		this.images = this.imageData.filter(image => !image.nsfw || this.$route.query.nsfw);
		this.currentImage = this.images[0]
		return {
			images: this.images,
			currentImage: this.currentImage,
			imageIndex: 0
		};
	},
	mounted() {
		// images = images.filter(image => !image.clone)
		slider = this.$refs.carousel;
		const marginOffset = 2 * parseFloat(getComputedStyle(slider.children[0]).marginLeft);
		[... slider.children].forEach((img, index) => {
			if (currentWidth < slider.clientWidth) {
				if (currentWidth + img.clientWidth + marginOffset > slider.clientWidth) {
					remainder = marginOffset + img.clientWidth - (slider.clientWidth - currentWidth)
					currentWidth += remainder;
				} else
					currentWidth += img.clientWidth + marginOffset;
				
				this.images.push({...this.images[index], clone: true});
			}
		});
	},
	methods: {
		nextImage(e, backwards) {
			this.imageIndex += backwards ? -1 : 1;
			this.imageIndex = ((this.imageIndex % this.images.length) + this.images.length) % this.images.length;
			this.currentImage = this.images[this.imageIndex];
			// modal.image = this.basePath + this.currentImage.path;
			slider.scrollLeft = this.selectedImage.offsetLeft - this.selectedImage.clientWidth / 2 - slider.clientWidth / 2;
		},
		selectImage(index) {
			slider.children[this.imageIndex].classList.remove('selected');
			this.imageIndex = index;
			this.currentImage = this.images[this.imageIndex % this.images.length];
			slider.scrollLeft = this.selectedImage.offsetLeft - this.selectedImage.clientWidth / 2 - slider.clientWidth / 2;
		},
		scrollCarousel(e) {
			if (e.target.scrollLeft == 0)
				e.target.scrollLeft = e.target.scrollWidth - e.target.offsetWidth - remainder - 1
			else if (e.target.offsetWidth + e.target.scrollLeft >= e.target.scrollWidth - remainder)
				e.target.scrollLeft = 1;
		},
		switchImage(e) {
			if(e.key == 'ArrowRight')
				this.nextImage();
			else if(e.key == 'ArrowLeft')
				this.nextImage(null, true);
		}
	},
	computed: {
		selectedImage() {
			return slider.children[this.imageIndex]
		}
	}
}
</script>

<style scoped>
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
	/* #carousel img:not(.selected):not(.selected + img), #carousel img:not(.selected):not(.selected + img):not(img + .selected) {
		border: red 2px solid !important;
	} */
	/* #carousel .selected + img, #carousel img + .selected { 
		border: red 2px solid !important;
	}
	#carousel .selected + img, #carousel img + .selected {
		transform: scale3d(0.85);
	} */
	#carousel img.selected {
		box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.5);
		border: 4px solid #000;
		/* transform: translateZ(5); */
	}
</style>