/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

 var current_task = 0
 var max_task = 5

function next_task() {
    var task_was = current_task;
    if (current_task < max_task - 1)
        current_task++;

    update_task(task_was);
}
function prev_task() {
    var task_was = current_task;
    if (current_task > 0)
        current_task--;

    update_task(task_was);
}

function update_task(task_was) {
    var tasks = document.getElementsByClassName("text");

    tasks[task_was].style.display = "none";
    tasks[current_task].style.display = "inherit";

    var bottom_panel_title = document.getElementsByClassName("bottom_panel_title")[0];
    bottom_panel_title.innerHTML = "Вариант " + (current_task + 1).toString() + " из " + max_task.toString();

    // clear edit field
    document.getElementsByClassName("form-field")[0].value = "";
}

function show_answer() {
    var edit_field = document.getElementsByClassName("form-field")[0];
    edit_field.value = document.getElementsByClassName("answer")[current_task].innerHTML;
}

function try_to_answer() {
    var edit_field = document.getElementsByClassName("form-field")[0];
    var right = edit_field.value == document.getElementsByClassName("answer")[current_task].innerHTML;

    var color = "red";
    if (right)
        color = "green";

    edit_field.style.borderColor = color;
    edit_field.style.borderWidth = "medium";
}