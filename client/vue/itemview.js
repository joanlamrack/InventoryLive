Vue.component("itemview", {
	template: `
	<div class="col-lg-4 col-md-6 mb-4">
		<div class="card h-100">
			<a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
			<div class="card-body">
				<h4 class="card-title">
				<a href="#">{{ item.name }}</a>
				</h4>
				<h5>{{ item.price }}</h5>
				<p class="card-text">Stock: {{item.stock}}pcs</p>
			</div>
			<div class="card-footer">
				<span v-for="tag in item.tags" class="badge badge-primary tag">
				{{tag}}
				</span>
			</div>
		</div>
	</div>
	`,
	props:["item"]
});
