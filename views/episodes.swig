{% extends 'parts/layout.swig' %}

{% block title %}Episodes{% endblock %}

{% block content %}

<link rel="stylesheet" href="/css/dashboard.css">
<link rel="stylesheet" href="/css/episodes.css">

<body>
	{% include 'parts/top-nav.swig' %}
	<div id="app" class="container-fluid">
		<div class="row">
			{% include 'parts/left-nav.swig' %}

			<main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" v-cloak>

				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
					<h1 class="h2">Episode list</h1>
					<div class="btn-toolbar mb-2 mb-md-0 dropdown">
						<button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
							<span data-feather="calendar"></span>
							Add episode
						</button>
						<div class="dropdown-menu dropdown-menu-right">
							<b-button class="dropdown-item btn btn-primary" v-b-modal.modal-add-yt>From YouTube</b-button>
							<b-button class="dropdown-item btn btn-primary" v-b-modal.modal-add-file>Upload file</b-button>
						</div>
					</div>
				</div>
				<div class="loader" v-if="loading.episodes">
					<span class="fas fa-circle-notch fa-spin"></span>
					Loading episodes
				</div>
				<div v-else class="table-responsive">
					<table class="table table-striped table-sm">
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="episode in episodes">
								<td v-text="episode.title"></td>
								<td v-text="episode.date"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</div>

		{% include 'parts/modals/add-episode-file.swig' %}
		{% include 'parts/modals/add-episode-youtube.swig' %}
	</div>
</body>
{% endblock %}

{% block scripts %}
<script src="/js/episodes.js"></script>
{% endblock %}