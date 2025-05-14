<template>
	<label class="sundial">
		<input type="checkbox" v-model="isDark" @change="toggle" />
		<font-awesome-icon :icon="['fas', (isDark ? 'moon' : 'sun')]" size="lg" />
	</label>
</template>

<script>
export default {
	data() {
		return {
			isDark: false
		}
	},
	mounted() {
		const stored = localStorage.theme
		const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
		this.isDark = stored === 'dark' || (!stored && prefers)

		this.applyTheme()
		this.nightSound = new Audio('/audio/sfx/cricket.mp3')
		this.daySound = new Audio('/audio/sfx/rooster.mp3')
	},
	methods: {
		toggle() {
			this.nightSound.currentTime = 0
			this.daySound.currentTime = 0
			if(this.isDark)
				this.nightSound.play()
			else
				this.daySound.play()
			this.applyTheme()
		},
		applyTheme() {
			document.documentElement.classList.toggle('dark', this.isDark)
			localStorage.theme = this.isDark ? 'dark' : 'light'
		}
	}
}
</script>

<style scoped>
.sundial {
	position: absolute;
	top: 1em;
	right: 1em;
	cursor: pointer;
	font-size: 1.5rem;
	display: inline-block;
	margin: auto;
	align-items: center;
}
.sundial input {
	display: none;
}
</style>