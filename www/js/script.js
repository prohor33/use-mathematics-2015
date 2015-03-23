var toolbar = {
	parent_page: "",
	setParent: function(parent_page) {
		this.parent_page = parent_page;
	},
	onBack: function() {
		window.location = this.parent_page;
		console.log("onBack() - " + this.parent_page);
	}
};