<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<!-- <PageHeader text="Florian" /> -->
				<article id="intro">
					<img src="../assets/images/florian/badge transparent.png" alt="">
					<h2>Welcome to Florian's Secret Page!</h2>
					<p>Congratulations, you've found the secret page for Florian, my fursona! Here you will find all the art of I've commissioned of him, as well as an in-depth description of lore, personality, and the 3D model of him.</p>
					<p>Unfortunately for you, none of that is ready at the moment, so have this "lovely" pirate ship to tide you over. (Get it, tide? like the ocean!!! Hahaha I'm so funny)</p>
				</article>
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<model-fbx ref="model" src="../ship.fbx" :cameraRotation="{ x: 3, y: 2, z: -1 }" />
			</client-only>
		</div>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
import { ModelFbx } from 'vue-3d-model';
export default {
	components: { PageHeader, ModelFbx }
}

</script>

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
}
#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
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