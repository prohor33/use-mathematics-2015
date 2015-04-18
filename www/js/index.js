/*
 * Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

var connection = true

function checkConnection() {
    try {
        var networkState = navigator.connection && navigator.connection.type;

        setTimeout(function(){
            // networkState = navigator.connection && navigator.connection.type;

            // var states = {};
            // states[Connection.UNKNOWN]  = 'Unknown connection';
            // states[Connection.ETHERNET] = 'Ethernet connection';
            // states[Connection.WIFI]     = 'WiFi connection';
            // states[Connection.CELL_2G]  = 'Cell 2G connection';
            // states[Connection.CELL_3G]  = 'Cell 3G connection';
            // states[Connection.CELL_4G]  = 'Cell 4G connection';
            // states[Connection.NONE]     = 'No network connection';

            // alert('Connection type: ' + states[networkState]);
            connection = !(networkState == Connection.NONE || networkState == Connection.UNKNOWN);
        }, 500);
    } catch(e) {
        alert(e);
        $.each(navigator, function(key, value) {
            alert(key+' => '+value);
        });
    }
}

function img_on_click() {

    // cordova.require('cordova/plugin/screenorientation').set("landscape");

    var video = document.getElementById("video");

    // doesn't work??
    alert("1");
    // set to either landscape
    alert('Orientation is ' + screen.orientation);
    alert(screen.width);
    screen.lockOrientation('landscape');
    // var so = cordova.plugins.screenorientation;
    alert("2");
    so.setOrientation(so.Orientation.LANDSCAPE);
    alert("set orination to landscape");

    video.addEventListener("playing", function() {
        alert("event");
        console.log("event");
        var so = cordova.plugins.screenorientation;
        so.setOrientation(so.Orientation.LANDSCAPE);
    }, false);
    

    checkConnection();

    setTimeout(function() {
        if (!connection) {
            alert("Есть проблемы с интернет соединением, пожалуйста, проверьте настройки подключения");
            return;
        }
        show_video();
    }, 550);
}

function show_video() {
    var youtube_player = document.getElementById('youtube_player');
    var video_image = document.getElementById('video_image');
    // TODO: make it autoplay
    youtube_player.innerHTML = "<iframe id=\"video\" class=\"video\" frameborder=\"0\"\
    src=\"http://www.youtube.com/embed/MMC0iaz6bac?autoplay=1&hd=1&rel=0&autohide=1&showinfo=0\"></iframe>";
    youtube_player.style.display = 'initial';
    video_image.style.display = 'none';
}

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

    document.body.style.backgroundImage = to_index ? 'url(img/back_squared.png)' : 'none';
    // alert("0");
    document.body.style.overflow = to_index ? "hidden" : "inherit";

    var back = document.getElementsByClassName('back')[0];
    back.style.display = !to_index ? 'inherit' : 'none';
}

