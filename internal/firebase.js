const fadmin = require('firebase-admin')

fadmin.initializeApp({
	credential: fadmin.credential.applicationDefault(),
	databaseURL: 'https://liberalpod.firebaseio.com/'
})

module.exports = fadmin
