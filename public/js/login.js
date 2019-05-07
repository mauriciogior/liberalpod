
var app = new Vue({
	el: "#app",
	data: {
		email: "",
		password: "",
		error: ""
	},

	mounted: function() {
		firebase.initializeApp({
			apiKey: firebaseApiKey,
			authDomain: "liberalpod.firebaseapp.com",
			databaseURL: "https://liberalpod.firebaseio.com",
			projectId: "liberalpod",
			storageBucket: "liberalpod.appspot.com",
			messagingSenderId: "sender-id",
			appID: "app-id",
		});

		firebase.auth().signOut();

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				app.post('/login', { token: user.uid });

			} else {
				console.log('signed-out');

			}
		});
	},

	methods: {
		login: function() {
			app.error = "";

			firebase.auth().signInWithEmailAndPassword(app.email, app.password).catch(function(error) {
				app.error = "Email or password incorrect";
			});
		},

		post: function(path, params) {
			var form = document.createElement('form');
			form.method = 'post';
			form.action = path;

			for (const key in params) {
				if (params.hasOwnProperty(key)) {
					var hiddenField = document.createElement('input');
					hiddenField.type = 'hidden';
					hiddenField.name = key;
					hiddenField.value = params[key];

					form.appendChild(hiddenField);
				}
			}

			document.body.appendChild(form);
			form.submit();
		}
	}

});
