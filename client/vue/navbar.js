Vue.component("navbar", {
	template:`
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<div class="container">
		<a class="navbar-brand" href="#">Uber Fox</a>

		<ul class="nav navbar-nav pull-sm-right">
			<li class="nav-item">
			<a href="#" class="nav-link" data-toggle="modal" data-target="#loginModal">Login
			<span class="sr-only">(current)</span>
			</a>
		</li>
		</ul>
		</div>
	</nav>
	`
})