
var app = new Vue({
	el: '#app',

	data: {
		ytVideos: [],
		ytVideo: {},
		episodes: [],
		episode: {
			date: '',
			title: '',
			description: '',
			file: null
		},
		editEpisode: null,
		loading: {
			episodes: false,
			editEpisodeModal: false,
			ytModal: false
		}
	},

	mounted: function() {
		this.$root.$on('bv::modal::show', function(bvEvent, modalId) {
			if (modalId == 'modal-add-yt') app.loadYtModal();
		})

		this.loadEpisodes();
	},

	methods: {
		setEditEpisode: function(episode) {
			episode.date = moment(episode.date).format('DD/MM/YYYY HH:mm');
			this.editEpisode = episode;

			if (episode.source == 'yt') {
				this.loading.editEpisodeModal = true;

				// Make a request for a user with a given ID
				axios
				.get('/api/youtube/' + episode.fileId)
				.then(function (response) {
					app.ytVideo = response.data;
					app.loading.editEpisodeModal = false;
				})
				.catch(function (error) {
					app.makeToast('Error', 'Failed to load episode information!', 'danger');
					app.loading.editEpisodeModal = false;
				});
			}
		},

		loadEpisodes: function() {
			this.loading.episodes = true;

			// Make a request for a user with a given ID
			axios
			.get('/api/episodes')
			.then(function (response) {
				app.episodes = response.data;
				app.loading.episodes = false;
			})
			.catch(function (error) {
				app.makeToast('Error', 'Failed to load episode list!', 'danger');
				app.loading.episodes = false;
			});
		},

		loadYtModal: function() {
			if (this.ytVideos.length > 0) return;

			this.loading.ytModal = true;

			//Make a request for a user with a given ID
			axios
			.get('/api/youtube')
			.then(function (response) {
				app.loading.ytModal = false;

				// handle success
				app.ytVideos = response.data.map(function(item) {
					item.date = moment(item.date).format('DD/MM/YYYY HH:mm')
					return item
				});
			})
			.catch(function (error) {
				app.loading.ytModal = false;

				app.makeToast('Error', 'Failed to load YouTube video list!', 'danger');
			})
		},

		submitFile: function() {
			if (!this.episode.file) return;

			var formData = new FormData();
			formData.append('file', this.episode.file);
			formData.append('title', this.episode.title);
			formData.append('description', this.episode.description);
			formData.append('date', moment(this.episode.date, 'DD/MM/YYYY HH:mm').toISOString());

			axios.post( '/api/episodes', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(function(response) {
				var episode = response.data;
				app.episodes.push(episode);
				app.episodes = app.episodes.sort(function(a, b) {
					if (b.date < a.date) return -1
					return 1
				});

				app.makeToast('Add episode', 'Episode added successfully!');
			})
			.catch(function(error) {
				app.makeToast('Error', 'Failed to create episode!', 'danger');
			});
		},

		makeToast: function(title, message, variant) {
			this.$bvToast.toast(message, {
				title: title,
				autoHideDelay: 4000,
				variant: variant || 'info',
				appendToast: false
			});
		}
	}
});
