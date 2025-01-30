<template>
    <div class="container">
        <PageHeader text="Hobbies!"/>
        <div class="seperator">
			<h2 class="heading">Crochet</h2>
			<hr>
		</div>
        <gallery class="gallery-crochet" basePath="/images/crochet/" thumbnailPath="/images/crochet/thumbnails" :imageData="crochetImages">
				<template v-slot:caption="slotProps">
					<p>{{ slotProps.currentImage.description }}</p>
				</template>
        </gallery>
        <div class="seperator">
			<h2 class="heading">Music 🎶</h2>
			<hr>
		</div>
        <article class="panel side-border">
            <p>Coming Soon, Stay Tuned!</p>
        </article>
    </div>
</template>

<script>
import crochetImages from '../assets/crochetImages.json';
export default {
    data() { 
		return { crochetImages }
	}
}
</script>

<style scoped>
    .container {
        overflow: scroll;
    }
    .gallery-crochet {
        padding-bottom: 2em;
    }
</style>