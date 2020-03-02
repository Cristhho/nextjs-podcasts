const routes = module.exports = require('next-routes')()

routes
.add('about')
.add('home', '/', 'index')
.add('channel', '/:slug.:id', 'channel')
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')