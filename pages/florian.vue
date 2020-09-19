<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<PageHeader text="Florian" />
			<client-only>
				<!-- <model-fbx ref="model" src="../florian.fbx" :width="100" /> -->
				<model-fbx ref="model" src="../ship.fbx" width="100" />
				<model-fbx ref="model" src="../ship.fbx" width="100" />
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
#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>