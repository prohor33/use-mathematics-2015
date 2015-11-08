/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

function load_data() {
}

// function load_data() {
//     // alert(window.location);

//     var theme_index = 0;

//     var result = parse("theme");
//     if (result != "Not found")
//         theme_index = result;

//     var themes_data = JSON.parse(data);

//     // load header
//     var div_list = document.getElementsByClassName("header");
//     var div = div_list[0];    
//     div.innerHTML = themes_data[theme_index].name;

//     // load video
//     var div_list = document.getElementsByClassName("video");
//     var div = div_list[0];
//     div.src = themes_data[theme_index].video_link;

//     // load text
//     var div_list = document.getElementsByClassName("text");
//     var div = div_list[0];
//     div.innerHTML = themes_data[theme_index].text;
// }

// function parse(val) {
//     var result = "Not found",
//         tmp = [];
//     location.search
//     //.replace ( "?", "" ) 
//     // this is better, there might be a question mark inside
//     .substr(1)
//         .split("&")
//         .forEach(function (item) {
//         tmp = item.split("=");
//         if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
//     });
//     return result;
// }

