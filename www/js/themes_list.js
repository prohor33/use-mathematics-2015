/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

function render_themes_state() {
	  var res = localStorage.getItem("full_version_product_state");
	  var full_version = res == "owned";
	  // full_version = true;

	  var images = document.getElementsByClassName("theme_img");
	  var task_names = document.getElementsByClassName("taskname");
	  // alert(images);

	  // actually 19, withouy 18's
	  for (var i = 1; i <= 18; i++) {

	  		var img_el = images[i - 1];
	  		var task_name = task_names[i -1];

	  		if (i == 18)
	  			i = 19;	// it's actually 19
	  		var accepted = is_theme_accepted(i);
	  		var premium_theme = i >= 13;

				task_name.style.color = "#545454";
	  		if (accepted) {
	  				img_el.style.display = 'inherit';
	  				img_el.src = "img/accepted.png";
	  		} else if (premium_theme) {
	  				img_el.style.display = 'inherit';
	  				if (full_version) {
	  						img_el.src = "img/star.png";
	  				} else {
	  						img_el.src = "img/lock.png";
	  						task_name.style.color = "#AAAAAA";
	  				}
	  		}
	  }
}

function is_theme_accepted(theme_index) {
    for (task_i = 0; task_i < 5; task_i++) {
    	if (!is_task_accepted(theme_index, task_i))
    		return false;
    }
    return true;
}

function is_task_accepted(theme_index, task_index) {
    return get_task_state(theme_index, task_index) == "accepted";
}
function get_task_state(theme_index, task_index) {
		var theme_key = "Задание " + theme_index.toString();
    var state_key = theme_key + "_" + task_index + "_state";
    var state = localStorage.getItem(state_key);
    // alert(state_key + " = " + state);
    return state;
}

render_themes_state();