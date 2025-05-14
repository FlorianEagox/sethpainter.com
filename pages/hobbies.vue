<template>
    <div class="container">
        <PageHeader text="Hobbies!"/>
        <div class="seperator">
			<h2 id="crochet" class="heading">Crochet 🧶</h2>
			<hr>
		</div>
        <gallery class="gallery-crochet" basePath="/images/crochet/" thumbnailPath="/images/crochet/thumbnails" :imageData="crochetImages">
				<template v-slot:caption="slotProps">
					<p>{{ slotProps.currentImage.description }}</p>
				</template>
        </gallery>
        <div class="seperator">
			<h2 id="poetry" class="heading">Poetry 🪶</h2>
			<hr>
            <div id="poems" class="drop-shadow">
			    <article-preview class="side-border poem lightning" v-for="poem in poems" :key="poem.slug" :article="poem" />
		    </div>
		</div>
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
let poems;
export default {
    async asyncData({$content}) {
		poems = await $content('poetry').where({ hidden: { $ne: true } }).sortBy('createdAt', 'desc').fetch();

		return { poems };
	},
    data() {
		return { crochetImages }
	},
	mounted() {
		let lastScrollTop = window.scrollY;
		let lastTimestamp = performance.now();

		window.addEventListener("scroll", () => {
			const currentScrollTop = window.scrollY;
			const currentTime = performance.now();

			const deltaY = Math.abs(currentScrollTop - lastScrollTop);
			const deltaTime = currentTime - lastTimestamp;
			const speed = deltaY / deltaTime;

			const poems = document.querySelectorAll(".poem");

			poems.forEach((el) => {
				if (speed > 0.25) {
					el.classList.add("scrolling");
				} else {
					el.classList.remove("scrolling");
				}
			});

			lastScrollTop = currentScrollTop;
			lastTimestamp = currentTime;
		});
	}
}
</script>

<style scoped>
    .container {
        /* overflow: scroll; */
    }
    .gallery-crochet {
        padding-bottom: 2em;
    }

	#poems {
		padding: 1em;
		position: relative; /* Required for absolute positioning of ::before */
		display: flex;
		overflow: hidden;
		justify-content: space-between;
		flex-wrap: wrap;
		background: url("~assets/images/poetry_bkg.jpeg") center fixed;
		background-blend-mode: multiply;
		background-size: cover;
		/* background-repeat: no-repeat; */
		z-index: 0; /* Make sure children appear above the ::before */
	}

	@keyframes slow-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}


	#poems::before {
		content: "";
		position: absolute; /* Constrain it to #poems */
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("~assets/images/gears.gif") center center;
		background-size: cover;
		pointer-events: none;
		z-index: -1; /* Same as parent, so children are above */
		opacity: 1;
		/* animation: slow-rotate 60s linear infinite; */
	}

	.poem {
		position: relative;
		z-index: 1;
		overflow: hidden;
		margin: 1em;
		padding: 1.5rem;
		border-right: none !important;
		background: url("~assets/images/parchment.png") center center !important;
		background-size: cover;
		clip-path: polygon(
		10% 0%, 90% 0%, 100% 10%,
		100% 90%, 90% 100%, 10% 100%,
		0% 90%, 0% 10%
	);
		color: #b48400 !important; /* ancient parchment ink */
		text-shadow: 1px 1px 2px #000000aa;
		box-shadow:
		inset 0 0 40px rgba(255, 80, 0, 0.4),     /* deep fiery core */
		inset 0 0 80px rgba(255, 30, 0, 0.2),     /* burning heart */
		inset 0 0 10px rgba(255, 255, 255, 0.05), /* edge sharpening */
		0 0 20px rgba(255, 100, 0, 0.3),          /* glowing aura */
		0 0 80px rgba(255, 50, 0, 0.15);          /* faint haze */
	text-shadow:
		0 0 3px rgba(255, 200, 100, 0.2),
		0 0 15px rgba(255, 180, 100, 0.25);
	}

	.poem:hover,
	.poem.scrolling {
		transform: scale(1.02) rotate(0.5deg);
		animation:
			flickerFrameExtreme 2.5s forwards ease-in-out,
			colorGlow 2s infinite ease-in-out;;
	}

	@keyframes flickerFrameExtreme {
		0%   { transform: scale(1.03) rotate(0deg) translate(0px, 0px); }
		10%  { transform: scale(1.06) rotate(-0.6deg) translate(-3px, 2px); }
		20%  { transform: scale(1.05) rotate(0.4deg) translate(2px, -3px); }
		40%  { transform: scale(1.07) rotate(-0.8deg) translate(-2px, 3px); }
		60%  { transform: scale(1.05) rotate(0.6deg) translate(3px, -2px); }
		80%  { transform: scale(1.06) rotate(-0.5deg) translate(-1px, 1px); }
		100% { transform: scale(1.03) rotate(0deg) translate(0px, 0px); }
	}
	@keyframes colorGlow {
		0%   { filter: drop-shadow(0 0 10px orange); }
		50%  { filter: drop-shadow(0 0 20px red); }
		100% { filter: drop-shadow(0 0 10px yellow); }
	}

	.poem.lightning::after {
		content: "";
		position: absolute;
		--frame-offset: -1rem;
		top: var(--frame-offset);
		left: var(--frame-offset);
		width: calc(100% - var(--frame-offset));
		height: calc(100% - var(--frame-offset));
		background: url("~assets/images/fire frame.png") center center no-repeat;
		background-size: cover;
		z-index: 2;
		pointer-events: none;
		animation: 
			flickerFrameExtreme 2.5s infinite ease-in-out,
			colorGlow 2s infinite ease-in-out;;
	}

	.poem.lightning:nth-child(odd)::after {
		animation-delay: 0s, 0s; /* flickerFrameExtreme, colorGlow */
	}

	.poem.lightning:nth-child(even)::after {
		animation-delay: 1.2s, 0.5s; /* Stagger both animations */
	}

	.poem.scrolling:nth-child(even) {
		animation-delay: 0.4s, 0.5s; /* Stagger both animations */
		animation: flickerScroll 6s ease-in-out forwards 0.3s;
		filter: blur(0.3px) drop-shadow(0 0 5px purple);
	}

	@keyframes flickerScroll {
		0%   { transform: translate(0px, 0px) scale(1); }
		10%  { transform: translate(-20px, -30px) scale(1.3); }
		30%  { transform: translate(40px, -10px) scale(0.99); }
		50%  { transform: translate(-15px, 40px) scale(1.015); }
		70%  { transform: translate(10px, -20px) scale(0.585); }
		90%  { transform: translate(-40px, 8px) scale(1); }
		100% { transform: translate(0px, 0px) scale(1); }
	}

	.poem >>> h2.heading {
		font-family: 'Cinzel Decorative' !important; /* Or something scroll-like */
		font-weight: bolder;
	}
	.poem >>> a {
		color: black;
		text-shadow:
			0 0 4px rgba(255, 240, 200, 0.2),
			0 0 8px rgba(255, 240, 200, 0.3);
	}

	.dark #poems {
		background-blend-mode: screen;
		background-color: #0a0a0a;
	}

	.dark .poem {
		filter: brightness(1.2) contrast(1.1);
	}

	.dark .poem.lightning::after {
		background-blend-mode: screen;
		filter: brightness(2) contrast(2);
	}
	@media (max-width: 900px) {
		#poems {
			font-size: 0.7em;
		}
		.poem {
			padding: 0.25em;
			margin: 0.6em;
		}
		.poem >>> h2.heading {
			padding-bottom: inherit;
			padding: 0.25 0;
		}
		.poem.lightning::after {
			--frame-offset: 0.25rem

		}
	}
</style>