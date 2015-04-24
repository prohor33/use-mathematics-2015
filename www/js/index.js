/*
 * Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

function switch_pages(to_index) {
    // alert("0");
    var elements = document.getElementsByClassName('index_page');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = to_index ? 'inherit' : 'none';
    }

    var elements = document.getElementsByClassName('theme_list_page');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = !to_index ? 'inherit' : 'none';
    }

    document.body.style.backgroundImage = to_index ? '' : 'none';
    document.body.style.overflow = to_index ? "hidden" : "visible";
    document.documentElement.style.overflow = to_index ? "hidden" : "visible";

    // doesn't work! (bug #10 background scrolling)
    if (to_index)
        window.scrollTop = 0;

    var back = document.getElementsByClassName('back')[0];
    back.style.display = !to_index ? 'inherit' : 'none';

    // alert("ok");
}

