
IS_IOS = true;


function onDeviceReady() {
    console.log("onDeviceReady");
    window.analytics.startTrackerWithId(IS_IOS ? 'UA-58047549-6' : 'UA-58047549-5');
    

    trackView();
}

function trackView() {
    var titles = document.getElementsByClassName("title");
    if (titles == null)
        return;

    title = titles[0];
    console.log("title: " + title.innerHTML);
    window.analytics.trackView(title.innerHTML);
}

document.addEventListener('deviceready', onDeviceReady, false);

