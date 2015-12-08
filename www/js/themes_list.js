/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

function i_to_old_index(i) {
	old_i = i;
	if (i >= 3)
		old_i = old_i + 1;

	if (old_i >= 12)
		old_i = old_i + 1;

	// 18 was skipped
	if (old_i == 18)
		old_i = 19;
	return old_i;
}

function render_themes_state() {
	  var res = localStorage.getItem("full_version_product_state");
	  var full_version = res == "owned";
	  // full_version = true;

	  var images = document.getElementsByClassName("theme_img");
	  var task_names = document.getElementsByClassName("taskname");
	  // alert(images);

	  for (var i = 1; i <= 16; i++) {

	  		old_i = i_to_old_index(i);

	  		var img_el = images[i - 1];
	  		var task_name = task_names[i -1];

	  		var accepted = is_theme_accepted(old_i);
	  		var premium_theme = old_i >= 13;

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

function on_share() {

	tasks_solved = 0;
	tasks_all_over = 0;

  for (var i = 1; i <= 16; i++) {

		old_theme_index = i_to_old_index(i);

		for (task_i = 0; task_i < 5; task_i++) {
  		if (is_task_accepted(old_theme_index, task_i))
  			tasks_solved = tasks_solved + 1;
  		tasks_all_over = tasks_all_over + 1;
  	}
  }
	text = '';
	if (tasks_solved == tasks_all_over) {
		text = '#ПобедиЕГЭ2016 Фух, только что решил все ' + tasks_solved.toString() + ' задания по математике! %)';
	} else if (tasks_solved == 0) {
		text = '#ПобедиЕГЭ2016 Фух, решил пока ' + tasks_solved.toString() + ' из ' + tasks_all_over.toString() + ' заданий по математике =('
	} else {
		text = '#ПобедиЕГЭ2016 Фух, решил пока ' + tasks_solved.toString() + ' из ' + tasks_all_over.toString() + ' заданий по математике =)'
	}
	link = 'https://play.google.com/store/apps/details?id=crystal.tech.defeat_use';
	text  = text + '\n' + link;
	window.plugins.socialsharing.share(text, null, 'https://cloud.githubusercontent.com/assets/5472900/11669155/3dd0cf68-9e0c-11e5-942f-cbe95fb8b192.png', null);
}


