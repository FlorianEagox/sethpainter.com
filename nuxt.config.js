import projectData from './assets/projects.json';

export default {
	mode: 'universal',
	head: {
		title: 'Seth Painter',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'The personal website of software developer Seth Painter. Home to all my projects, portfolio, and writtings about the software world.' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	generate: {
		routes: projectData.projects.map(project => '/project/' + project.identifier)
	},
	plugins: ['~plugins/vue-scrollto.js'],
	loading: { color: '#fff' },

	buildModules: [
		// '@nuxtjs/eslint-module'
	],

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
		},
			// ['vue-scrollto/nuxt', { duration: 300 }]
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

	build: {
		extend(config, ctx) {
		}
	},
	sitemap: {
		hostname: 'https://sethpainter.com',
		gzip: true,
		routes: projectData.projects.map(project => '/project/' + project.identifier)
	},
	server: {
		host: 'sethpainter.com'
	}
}
