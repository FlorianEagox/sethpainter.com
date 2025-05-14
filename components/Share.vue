<template>
	<section id="share">
		<h2>Share this {{contentType}}</h2>
		<hr>
		<ul class="meta-list">
			<li>
				<a title="Click to Copy" @click.prevent="copy(url)" class="tooltip"><font-awesome-icon icon="link" size="lg"/></a>
			</li>
			<li>
				<a :href="`https://twitter.com/intent/tweet?url=${url}&text=${content.title}`" title="Share to Twitter" class="tooltip" target="blank">
					<font-awesome-icon :icon="['fab', 'twitter']" size="lg"/>
				</a>
			</li>
			<li><a title="Copy RSS Feed" class="tooltip" @click="copy('https://sethpainter.com/feed.xml')"><font-awesome-icon icon="rss" size="lg"/></a></li>
			<li v-if="content.medium"><a :href="content.medium" target="_blank" title="Read on Medium" class="tooltip"><font-awesome-icon :icon="['fab', 'medium']" size="lg"/></a></li>
				<li v-if="content.devTo"><a href="" title="Read on Dev.to" class="tooltip"><font-awesome-icon :icon="['fab', 'dev']" size="lg"/></a></li>
		</ul>
	</section>
</template>

<script>
export default {
	props: ["content", "contentType"],
	computed: {
		url() {
			return `https://tessapainter.com${this.$route.fullPath}`;
		}
	},
	methodsd: {
		copy(text) {
			window.navigator.clipboard.writeText(text);
		}
	}
}
</script>

<style scoped>
	#share ul {
		display: flex;
		justify-content: space-around;
	}
	
	#share a:hover {
		color: var(--accent-color);
	}
	#share li {
		display: inline-block;
	}
	#share a {
		color: inherit;
		text-decoration: none;
	}
</style>