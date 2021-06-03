export default {
	target: 'static',
	components: true,
	head: {
		title: 'Seth Painter | Software Development Projects, Tutorials, and more!',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Seth Painter\'s personal website for software development. Home to all my projects, portfolio, tutorials, and writtings about the software world.' },
			{ hid: 'og:description', name: 'og:description', content: 'Seth Painter\'s personal website for software development. Home to all my projects, portfolio, tutorials, and writtings about the software world.' },
			{ hid: 'og:title', name: 'og:title', content: 'Seth Painter | Software Development projects, tutorials, and more!' },
			{ hid: 'og:url', name: 'og:url', content: 'https://sethpainter.com' },
			{ hid: 'og:image', name: 'og:image', content: '/logo.png' },
			{ hid: 'twitter:site', name: 'og:site', content: '@FlorianEagox' },
			{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'msapplication-TileColor', content: '#00aba9' },
			{ name: 'theme-color', content: '#ffffff' }
		],
		htmlAttrs: {
			lang: 'en'
		},
		link: [
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'alternate icon', href: '/favicon.ico' },
			{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
			{ rel: 'manifest', href: '/site.webmanifest' },
			{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
		]
	},
	plugins: ['~plugins/vue-scrollto.js'],
	loading: { color: '#fff' },

	buildModules: [
		// '@nuxtjs/eslint-module',
		'@aceforth/nuxt-optimized-images',
		['@nuxtjs/robots', {
			UserAgent: '*',
			Allow: '/',
			Sitemap: 'https://sethpainter.com/sitemap.xml'
		}
		],
		['nuxt-compress', {
			gzip: {
				cache: true
			},
			brotli: {
				threshold: 10240
			}
		}
		],
		'@nuxtjs/sitemap'
	],
	optimizedImages: {
		optimizeImages: true
	},
	modules: [
		['nuxt-fontawesome', {
			imports: [
				{
					set: '@fortawesome/free-solid-svg-icons',
					icons: ['fas']
				},
				{
					set: '@fortawesome/free-brands-svg-icons',
					icons: ['fab']
				}
			]
		}
		],
		'@nuxt/content'
	],
	sitemap: {
		hostname: 'https://sethpainter.com',
		gzip: true,
		async routes() {
			const { $content } = require('@nuxt/content')
			const contentRoutes = (await $content('/', {deep: true}).only(['dir', 'slug']).where({dir: {$ne: '/site'}}).fetch()).map(item => encodeURI(`${item.dir}/${item.slug}`))
			return [...contentRoutes, '/businesscardparser', '/quizletquery']
		}
	},
	server: {
		host: 'sethpainter.com'
	}
}
