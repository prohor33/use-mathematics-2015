/*
 * Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

var connection = false;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Now safe to use device APIs
    // alert("devide is ready");
    checkConnection();

    setTimeout(function() {
        if (connection) {
            // uncomment
            show_video();
        }
    }, 550);
}

function checkConnection() {
    // alert("0");
    try {
        var networkState = navigator.connection && navigator.connection.type;

        setTimeout(function(){
            networkState = navigator.connection && navigator.connection.type;

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
    // alert("1");
    // set to either landscape
    // alert('Orientation is ' + screen.orientation);
    // alert(screen.width);
    // screen.lockOrientation('landscape');
    // var so = cordova.plugins.screenorientation;
    // alert("2");
    // so.setOrientation(so.Orientation.LANDSCAPE);
    // alert("set orination to landscape");

    // video.addEventListener("playing", function() {
    //     alert("event");
    //     console.log("event");
    //     var so = cordova.plugins.screenorientation;
    //     so.setOrientation(so.Orientation.LANDSCAPE);
    // }, false);
    

    // checkConnection();

    // setTimeout(function() {
    //     if (!connection) {
    //         alert("Есть проблемы с интернет соединением, пожалуйста, проверьте настройки подключения");
    //         return;
    //     }
    //     show_video();
    // }, 550);

    if (!connection) {
        checkConnection();

        setTimeout(function() {
            if (connection) {
                show_video();
            } else {
                alert("Проверьте интернет соединение");
            }
        }, 550);
        
        return;
    }

    show_video();
}

function show_video() {
    var youtube_player = document.getElementById('youtube_player');
    var video_image = document.getElementById('video_image');
    youtube_player.style.display = 'initial';
    video_image.style.display = 'none';
}

