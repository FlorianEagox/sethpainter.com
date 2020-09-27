import projectData from './assets/projects.json';

export default {
	target: 'static',
	head: {
		title: 'Seth Painter | Software Development projects, tutorials, and more!',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Seth Painter\'s personal website for software development. Home to all my projects, portfolio, tutorials, and writtings about the software world.' },
			{ hid: 'og:description', name: 'og:description', content: 'Seth Painter\'s personal website for software development. Home to all my projects, portfolio, tutorials, and writtings about the software world.' },
			{ hid: 'og:title', name: 'og:title', content: 'Seth Painter | Software Development projects, tutorials, and more!' },
			{ hid: 'og:url', name: 'og:url', content: 'https://sethpainter.com' },
			{ hid: 'og:image', name: "og:image", content: '/logo.png' },
			{ hid: 'twitter:site', name: "og:site", content: '@FlorianEagox' },
			{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
		],
		htmlAttrs: {
			lang: 'en'
		},
		link: [
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'alternate icon', href: '/favicon.ico' }
		]
	},
	generate: {
		routes: projectData.projects.map(project => '/project/' + project.identifier)
	},
	plugins: ['~plugins/vue-scrollto.js'],
	loading: { color: '#fff' },

	buildModules: [
		// '@nuxtjs/eslint-module'
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
		]
	],
	sitemap: {
		hostname: 'https://sethpainter.com',
		gzip: true,
		routes: projectData.projects.map(project => '/project/' + project.identifier).concat('/quizletquery')
	},
	server: {
		host: 'sethpainter.com'
	}
}
