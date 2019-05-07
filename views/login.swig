{% extends 'parts/layout.swig' %}

{% block title %}Login{% endblock %}

{% block content %}
<link rel="stylesheet" href="/css/login.css">

<body class="text-center">
	<div id="app">
		<form class="form-signin" method="post" action="/login" v-on:submit.prevent="login">
			<img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
			<h1 class="h3 mb-3 font-weight-normal">Please sign in!</h1>

  			<div class="form-group">
				<label for="inputEmail" class="sr-only">Email address</label>
				<input type="email" v-model="email" :class="{'form-control':true, 'is-invalid':error != ''}" placeholder="Email address" required autofocus>
				<div class="invalid-feedback" v-if="error != ''" v-text="error"></div>
			</div>

  			<div class="form-group">
				<label for="inputPassword" class="sr-only">Password</label>
				<input type="password" v-model="password" class="form-control" placeholder="Password" required>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			<p class="mt-5 mb-3 text-muted">&copy; 2019</p>
		</form>
	</div>
</body>
{% endblock %}

{% block scripts %}
<script src="/js/login.js"></script>
{% endblock %}