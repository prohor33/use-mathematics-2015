/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

 var current_task = 0;
 var max_task = 5;

var theme_key = document.getElementsByClassName("title")[0].innerHTML;
var showing_answer = false;

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
    update_radio_buttons();

    // save curr task number
    put_current_task();
}

var edit_field = document.getElementById("form-field");

function update_task(task_was) {
    var tasks = document.getElementsByClassName("task");

    tasks[task_was].style.display = "none";
    tasks[current_task].style.display = "inherit";

    var bottom_panel_title = document.getElementsByClassName("bottom_panel_title")[0];
    bottom_panel_title.innerHTML = "Вариант " + (current_task + 1).toString() + " из " + max_task.toString();

    // clear edit field
    if (edit_field)
        edit_field.value = "";
}

function show_answer() {
    edit_field.value = document.getElementsByClassName("answer")[current_task].innerHTML;
    showing_answer = true;
    setTimeout(function() {
        showing_answer = false;
        edit_field.value = "";
    }, 2000);
    window.analytics.trackEvent('Answer', 'Show answer', theme_key + " task: " + current_task.toString());
}

// apply all webkit events
if (edit_field) {
    edit_field.addEventListener("webkitAnimationStart", animation_listener);
    edit_field.addEventListener("webkitAnimationIteration", animation_listener);
    edit_field.addEventListener("webkitAnimationEnd", animation_listener);

    // and standard events
    edit_field.addEventListener("animationstart", animation_listener);
    edit_field.addEventListener("animationiteration", animation_listener);
    edit_field.addEventListener("animationend", animation_listener);
}

// handle animation events
function animation_listener(e) {
    if (e.type.toLowerCase().indexOf("animationend") >= 0) {
        toggle_animation(true);
    }
}

// start/stop animation
function toggle_animation(right) {
    if (!edit_field)
        return;
    var on = (edit_field.className != "");
    edit_field.className = (on ? "" : ((right ? "right" : "wrong") + "_answer"));
};

function try_to_answer() {
    if (showing_answer) {
        // Эй, так не честно!
        show_overlay("overlay_cheat");
        window.analytics.trackEvent('Answer', 'Cheat', theme_key + " task: " + current_task.toString());
        return;
    }
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
    put_task_accepted();
    show_accepted();
    //alert("Правильно!");
    show_overlay('overlay_correct');

    window.analytics.trackEvent('Answer', theme_key + " task: " + current_task.toString(), "Right");
}
function wrong_answer() {
    if (edit_field) {
        // if input field
        edit_field.style.background = '';
    } else {
        // if variants
        show_overlay("overlay_wrong");
    }

    window.analytics.trackEvent('Answer', theme_key + " task: " + current_task.toString(), "Wrong");
}

function show_accepted() {
    if (!edit_field)    // may be variants and no edit  field
        return;
    edit_field.style.background = 'url(../img/accepted.png)';
    edit_field.style.backgroundRepeat = 'no-repeat';
    edit_field.style.backgroundSize = '35px 35px';
    edit_field.style.backgroundPosition = '98%';
}

function update_accepted() {
    if (is_task_accepted()) {
        show_accepted();
    } else {
        if (edit_field)
            edit_field.style.background = '';
    }
}

on_start();
function on_start() {
    current_task = get_current_task();
    if (current_task < 0) {
        current_task = 0;
    } else {
        if (current_task != 0)
            switch_task(0);
    }
    update_accepted();
    update_radio_buttons();
}

function put_task_accepted() {
    put_task_state("accepted");
}
function is_task_accepted() {
    return get_task_state() == "accepted";
}
function get_task_state() {
    var state_key = theme_key + "_" + current_task + "_state";
    var state = localStorage.getItem(state_key);
    // alert(state_key + " = " + state);
    return state;
}
function put_task_state(state) {
    var state_key = theme_key + "_" + current_task + "_state";
    localStorage.setItem(state_key, state);
}

function put_current_task() {
    var curr_task_key = theme_key + "_" + "curr_task";
    localStorage.setItem(curr_task_key, current_task);
}
function get_current_task() {
    var curr_task_key = theme_key + "_" + "curr_task";
    var res = localStorage.getItem(curr_task_key);
    // alert(curr_task_key + " = " + res);
    if (res == null)
        return -1;
    return parseInt(res);
}

// Overlay
function show_overlay(overlayId) {
    el = document.getElementById(overlayId);
    el.style.visibility = "visible";
}

function hide_overlay(overlayId) {
    el = document.getElementById(overlayId);
    el.style.visibility = "hidden";
}


function try_to_answer_with_variant() {
    var selected = get_selected_answer_variant();
    var right = selected == parseInt(document.getElementsByClassName("answer")[current_task].innerHTML);
    right ? right_answer() : wrong_answer();
}

function get_selected_answer_variant() {
    var task_el = document.getElementsByClassName("task")[current_task];
    var node_list = task_el.getElementsByTagName('input');
 
    var answer_index = 0;
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
     
        if (node.getAttribute('type') == 'radio') {
            if (node.checked)
                return answer_index + 1;
            answer_index++;
        }
    }
    return -1;
}

function update_radio_buttons() {
    var task_el = document.getElementsByClassName("task")[current_task];
    var node_list = task_el.getElementsByTagName('input');
    if (!node_list)
        return;

    var node = node_list[0];
    node.checked = true;
}


