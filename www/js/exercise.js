/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

 var current_task = 0;
 var max_task = 5;

var theme_key = document.getElementsByClassName("title")[0].innerHTML;

function next_task() {
    var task_was = current_task;
    if (current_task < max_task - 1)
        current_task++;

    switch_task(task_was);
}
function prev_task() {
    var task_was = current_task;
    if (current_task > 0)
        current_task--;

    switch_task(task_was);
}

function switch_task(task_was) {
    update_task(task_was);
    update_accepted();

    // save curr task number
    var curr_task_key = theme_key + "_" + "curr_task";
    localStorage.setItem(curr_task_key, current_task);
}

var edit_field = document.getElementById("form-field");

function update_task(task_was) {
    var tasks = document.getElementsByClassName("text");

    tasks[task_was].style.display = "none";
    tasks[current_task].style.display = "inherit";

    var bottom_panel_title = document.getElementsByClassName("bottom_panel_title")[0];
    bottom_panel_title.innerHTML = "Вариант " + (current_task + 1).toString() + " из " + max_task.toString();

    // clear edit field
    edit_field.value = "";
}

function show_answer() {
    edit_field.value = document.getElementsByClassName("answer")[current_task].innerHTML;
    var state_key = theme_key + "_" + current_task + "_state";
    localStorage.setItem(state_key, "answer_was_shown");
}

// apply all webkit events
edit_field.addEventListener("webkitAnimationStart", animation_listener);
edit_field.addEventListener("webkitAnimationIteration", animation_listener);
edit_field.addEventListener("webkitAnimationEnd", animation_listener);

// and standard events
edit_field.addEventListener("animationstart", animation_listener);
edit_field.addEventListener("animationiteration", animation_listener);
edit_field.addEventListener("animationend", animation_listener);

// handle animation events
function animation_listener(e) {
    if (e.type.toLowerCase().indexOf("animationend") >= 0) {
        toggle_animation(true);
    }
}

// start/stop animation
function toggle_animation(right) {
    var on = (edit_field.className != "");
    edit_field.className = (on ? "" : ((right ? "right" : "wrong") + "_answer"));
};

function try_to_answer() {
    var right = edit_field.value == document.getElementsByClassName("answer")[current_task].innerHTML;

    // var color = "red";
    // if (right)
    //     color = "green";

    // edit_field.style.borderColor = color;
    // edit_field.style.borderWidth = "medium";

    right ? right_answer() : wrong_answer();

    toggle_animation(right);
}

function right_answer() {
    var state_key = theme_key + "_" + current_task + "_state";

    var state = localStorage.getItem(state_key);
    var answer_already_shown = state == "answer_was_shown";

    if (!answer_already_shown) {
        localStorage.setItem(state_key, "accepted");
        show_accepted();
    }
    alert("Ответ верный!");
}
function wrong_answer() {
    var state_key = theme_key + "_" + current_task + "_state";
    localStorage.setItem(state_key, "wrong");
    edit_field.style.background = '';
}

function show_accepted() {
    edit_field.style.background = 'url(../img/accepted.png)';
    edit_field.style.backgroundRepeat = 'no-repeat';
    edit_field.style.backgroundSize = '30px 30px';
    edit_field.style.backgroundPosition = '98%';
}

function update_accepted() {
    var state_key = theme_key + "_" + current_task + "_state";
    var state = localStorage.getItem(state_key);
    // alert(state_key + " = " + state);
    if (state == "accepted") {
        show_accepted();
    } else {
        edit_field.style.background = '';
    }
}

on_start();
function on_start() {
    var curr_task_key = theme_key + "_" + "curr_task";
    current_task = localStorage.getItem(curr_task_key);
    // alert(curr_task_key + " = " + current_task);
    if (current_task == null) {
        current_task = 0;
    } else {
        current_task = parseInt(current_task);
        // alert(typeof(current_task));
        if (current_task != 0)
            switch_task(0);
    }

    update_accepted();
}

