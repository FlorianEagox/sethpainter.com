<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<div>
				<article id="intro">
					<img src="/images/florian/badge transparent.png" alt="">
					<h2>Welcome to Florian's Secret Page!</h2>
					<p>Congratulations, you've found the secret page for Florian, my fursona! Here you will find all the art of I've commissioned of him, as well as an in-depth description of lore, personality, and the 3D model of him.</p>
					<p>3D Model comming soon</p>
				</article>
			</div>
			<gallery basePath="/images/florian/" thumbnailPath="/images/florian/thumbnails" :imageData="florianImages">
				<template v-slot:caption="slotProps">
					<p>Piece done by <a :href="slotProps.currentImage.link"> {{ slotProps.currentImage.artistName }}</a></p>
				</template>
			</gallery>
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<div id="ship-wrapper">
					<!-- <model-fbx src="../ship.fbx" :backgroundAlpha=0.5 backgroundColor="#0077be" :cameraRotation="{ x: 3, y: 2, z: -1 }"></model-fbx> -->
				</div>
			</client-only>
			<section id="refsheet">
				<PageHeader text="Character Reference" />
				
				<div id="ref-images">
					<img @click="$nuxt.$emit('enlarge', '/images/florian/ref/front.png')" src="/images/florian/ref/front.png">
					<img @click="$nuxt.$emit('enlarge', '/images/florian/ref/side.png')" src="/images/florian/ref/side.png">
					<img @click="$nuxt.$emit('enlarge', '/images/florian/ref/back.png')" src="/images/florian/ref/back.png">
				</div>

				<div id="colors">
					<h3 id="color-desc">Colors used, click to copy</h3>
					<div id="swatches">
						<div
							v-for="color in refColors" 
							id="color"
							:key="color"
							:style="`background: #${color}`"
							@click="copyColor(color)"
						/>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import florianImages from '../assets/florianImages.json';

const refColors = ['b85b20', '161616', 'f5f5f5', '359b26', 'daa6aa', 'bb6d73', '8f2d28', 'd7c540', 'd5332a', '1acb16', '1732f1', 'b49821', 'f0dd7a', 'fffbe6', '242320', '5e5b51'];

export default {
	data() { 
		return { florianImages, refColors }
	},
	methods: {
		copyColor(color) {
			navigator.clipboard.writeText('#' + color);
		}
	}
}
</script>

<style scoped>
.image-modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	margin: auto auto;
}

#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}

#intro {
	width: 60%;
	margin: 15% auto 3em;
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

#model-wrapper {
	height: 50%;
	width: 50%;
	min-width: 300px;
	max-width: 100%;
	margin: 3em auto 0;
}

#refsheet {
	text-align: center;
	width: 100%;
}
#ref-images {
	display: flex;
	justify-content: space-around;
}
#ref-images img {
	align-self: center;
	flex: 0 1 auto;
	max-height: 100%;
	filter: drop-shadow(5px 5px 5px #000000);
}

#swatches {
	display: flex;
	flex-wrap: wrap;
}
#color {
	flex: 1;
	min-width: 75px;
	height: 100px;
	/* flex: 1; */
}

@media (max-width: 600px) {
	#intro {
		width: 100%;
		min-width: inherit;
		margin: 2em auto;
		margin-top: 35%;
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
	#ref-images img {
		/* margin: 1em; */
	}
}
</style>
