const login = require('./login.js')
const episodes = require('./episodes.js')
const api = require('./api/router.js')

module.exports = function(router) {
	login(router)
	episodes(router)

	api(router)
}
