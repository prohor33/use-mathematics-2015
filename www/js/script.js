IS_IOS = false;
NO_PURCHASE = false;

var toolbar = {
	parent_page: "",
	onBack: function() {
  	// navigator.app.backHistory();
  	// window.history.back()
  	if (parent_page == "exit") {
  	 	if (navigator.app && navigator.app.exitApp) {
		  	 navigator.app.exitApp();
			}
			if (navigator.device && navigator.device.exitApp) {
			    navigator.device.exitApp();
			}
  	 	return;
  	}
  	document.location = parent_page;
	},
	handleDeviceBackButton: function() {
		toolbar.onBack();
	},
	setParent: function(parent) {
		parent_page = parent;
	}
};

function onDeviceReadyBackBtn() {
	document.addEventListener("backbutton", toolbar.handleDeviceBackButton, false);
}

document.addEventListener("deviceready", onDeviceReadyBackBtn, false);