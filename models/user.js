const firebase = require('../internal/firebase.js')
const firestore = firebase.firestore()

module.exports = {

	get: async function(uid) {

		var userCol = firestore.collection('users').doc(uid)
		var user = await userCol.get()

		if (!user.exists) return null

		var podcastCol = userCol.collection('podcasts').doc('0')
		var podcast = (await podcastCol.get()).data()
		var id = user.id

		user = user.data()
		user.id = id
		user.podcasts = [podcast]

		return user

	}

}
