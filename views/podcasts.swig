{% extends 'parts/layout.swig' %}

{% block title %}Podcasts{% endblock %}

{% block content %}

<link rel="stylesheet" href="/css/dashboard.css">

<body>
	{% include 'parts/top-nav.swig' %}
	<div class="container-fluid">
		<div class="row">
			{% include 'parts/left-nav.swig' %}

			<main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
					<h1 class="h2">Podcast</h1>
					<div class="btn-toolbar mb-2 mb-md-0 dropdown">
						<button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
							<span data-feather="calendar"></span>
							Add episode
						</button>
						<div class="dropdown-menu dropdown-menu-right">
							<button type="button" class="dropdown-item btn btn-primary" data-toggle="modal" data-target="#addEpisodeYouTube">From YouTube</button>
							<button type="button" class="dropdown-item btn btn-primary" data-toggle="modal" data-target="#addEpisodeFile">Upload file</button>
						</div>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{% for i in episodes %}
							<tr>
								<td>{{episodes.indexOf(i) + 1}}</td>
								<td>{{i.title}}</td>
							</tr>
							{% endfor %}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	</div>

	{% include 'parts/modals/add-episode-file.swig' %}
	{% include 'parts/modals/add-episode-youtube.swig' %}
</body>

{% endblock %}