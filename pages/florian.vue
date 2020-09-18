<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<PageHeader text="Florian" />
			<model-collada ref="model"
        		src="../static/ship.dae">
			</model-collada>
		</div>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
import { ModelCollada } from 'vue-3d-model';
export default {
	components: { PageHeader, ModelCollada }
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