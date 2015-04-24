/*
 * Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

on_load();

function on_load() {
    var load_index = true;

    var result = parse("theme_list_page");
    // uncomment
    if (result != "Not found")
        load_index = false;

    // alert("0");
    if (load_index) {
        document.write('<style>.theme_list_page { display: none; }\nbody { background-image: url("img/back_squared.png");\noverflow: hidden; }\n\
            html { overflow: hidden; }</style>');
    } else {
        document.write('<style>.index_page { display: none; }</style>');
    }
    
}

function parse(val) {
    var result = "Not found",
        tmp = [];
    location.search
    //.replace ( "?", "" ) 
    // this is better, there might be a question mark inside
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

