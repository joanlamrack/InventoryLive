Vue.component("login-modal", {
	template: `
	<div class="modal fade" id="loginModal">
	<div class="modal-dialog modal-dialog-centered">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">
		  <form action="/action_page.php">
			<div class="form-group">
			  <label for="email">Username:</label>
			  <input type="email" class="form-control" id="email">
			</div>
			<div class="form-group">
			  <label for="pwd">Password:</label>
			  <input type="password" class="form-control" id="pwd">
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		  </form>
		</div>
	  </div>
	</div>
  </div>
	`
});
