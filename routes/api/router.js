const youtube = require('./youtube.js')
const episodes = require('./episodes.js')

module.exports = function(router) {
	youtube(router)
	episodes(router)
}
