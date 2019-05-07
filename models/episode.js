const firebase = require('../internal/firebase.js')
const firestore = firebase.firestore()

module.exports = {

	get: async function(user) {

		var userCol = firestore.collection('users').doc(user.id)
		var podcastCol = userCol.collection('podcasts').doc('0')
		var episodesCol = await podcastCol.collection('episodes').get()
		var episodes = []

		episodesCol.forEach(function(ep) {
			var episode = ep.data()
			episode.id = ep.id
			episodes.push(episode)
		})

		var episodes = episodes.sort(function(a, b) {
			if (b.date < a.date) return -1
			return 1
		})

		return episodes

	},

	put: async function(user, data) {

		var userCol = firestore.collection('users').doc(user.id)
		var podcastCol = userCol.collection('podcasts').doc('0')
		var episodesCol = podcastCol.collection('episodes')

		var ref = await episodesCol.add(data)

		return ref

	}

}
