



function onDeviceReady() {
    console.log("onDeviceReady");
    window.analytics.startTrackerWithId('UA-58047549-5')
    

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

