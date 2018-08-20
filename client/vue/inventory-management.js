Vue.component("inventory-management", {
	template: `
	<div>
	<navbar>
	</navbar>
	<login-modal>
	</login-modal>

	<!-- Page Content -->
	<div class="container">
		<div class="my-4">
			<div class="success-alert" style="">
				<div class="alert alert-success">
					Login success
				</div>
			</div>
			<div class="error-alert" style="display: none;">
				<div class="alert alert-danger">
					Error message
				</div>
			</div>
		</div>

		<div class="new-item">
			<h2>Create new Item</h2>
			<div class="form-group">
				<label for="name">Name:</label>
				<input v-model="input_name" type="text" class="form-control">
			</div>
			<div class="form-group">
				<label for="price">Price:</label>
				<input v-model="input_price" type="text" class="form-control">
			</div>
			<div class="form-group">
				<label for="stock">Stock:</label>
				<input v-model="input_stock" type="text" class="form-control">
			</div>
			<div class="form-group">
				<label for="tags">Tags:</label>
				<input v-model="input_tags" type="text" class="form-control">
			</div>
			<button type="submit" class="btn btn-primary" @click="addItem">Submit</button>
			<hr>
		</div>

		<div class="search-item">
			<h2>Search Item</h2>
			<div class="form-group">
				<label for="name">Name:</label>
				<input v-model="input_name" type="text" class="form-control">
			</div>
			<div class="form-group">
				<label for="price">Start Price:</label>
				<input v-model.number="input_price" type="text" class="form-control">
			</div>
			<div class="form-group">
				<label for="tags">Tags:</label>
				<input v-model="input_tags" type="text" class="form-control">
			</div>
			<button type="submit" class="btn btn-primary" @click="searchItem">Search</button>
			<hr>
		</div>

		<div class="row">
			<div class="col-lg-12">
				<div class="row my-4">
					<div v-for="(item,index) in stuffs">
						<itemview :item="item"></itemview>
						<div>
						</div>
						<!-- /.row -->

					</div>
					<!-- /.col-lg-9 -->

				</div>
				<!-- /.row -->

			</div>
			<!-- /.container -->

		</div>
	</div>

	</div>
  
	`,
	data: function() {
		return {
			stuffs: [],
			input_tags: "",
			input_price: 0,
			input_name: "",
			input_stock: ""
		};
	},
	methods: {
		searchItem: function() {
			let stringurl =
				"http://localhost:3000/items" +
				(this.input_name.length || this.input_price || this.input_tags.length
					? "?name=" +
					  this.input_name +
					  "&price_start=" +
					  this.input_price +
					  (this.input_tags.length ? "&tag=" + this.input_tags : "")
					: "");

			console.log(stringurl);
			axios.get(stringurl).then(({ data }) => {
				console.log(data);
				this.stuffs = data;
			});
		},
		addItem: function(name, stock, price, tags) {
			axios.post("http://localhost:3000/items", {
				name,
				stock,
				price,
				tags
			});
		}
	}
});
