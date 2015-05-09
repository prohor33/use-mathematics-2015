/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

// Our application's global object
var app = {};

//
// Constructor
// -----------
//

app.initialize = function() {
    log('initialize');

    // Listen to the deviceready event.
    // Make sure the score of 'this' isn't lost.
    document.addEventListener('deviceready', this.bind(this.onDeviceReady), false);
};

//
// Methods
// -------
//

// deviceready event handler.
//
// will just initialize the Purchase plugin
app.onDeviceReady = function() {
    log('onDeviceReady');
    this.initStore();
};

// initialize the purchase plugin if available
app.initStore = function() {

    if (!window.store) {
        log('Store not available');
        return;
    }

    // Enable maximum logging level
    store.verbosity = store.DEBUG;

    // Enable remote receipt validation
    store.validator = "https://api.fovea.cc:1982/check-purchase";

    // Inform the store of your products
    log('registerProducts');
    store.register({
        id:    'full_content_access',
        alias: 'full content',
        type:   store.NON_CONSUMABLE
    });

    // store.register({
    //     id:    'cc.fovea.purchase.nonconsumable1',
    //     alias: 'full version',
    //     type:   store.NON_CONSUMABLE
    // });

    // store.register({
    //     id:    'cc.fovea.purchase.subscription1',
    //     alias: 'subscription1',
    //     type:  store.PAID_SUBSCRIPTION
    // });

    // When any product gets updated, refresh the HTML.
    store.when("product").updated(function (p) {
        app.renderIAP(p);
    });

    // store.when("subscription1").approved(function(p) {
    //     log("verify subscription");
    //     p.verify();
    // });
    // store.when("subscription1").verified(function(p) {
    //     log("subscription verified");
    //     p.finish();
    // });
    // store.when("subscription1").unverified(function(p) {
    //     log("subscription unverified");
    // });
    // store.when("subscription1").updated(function(p) {
    //     if (p.owned) {
    //         document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
    //     }
    //     else {
    //         document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
    //     }
    // });

    // Log all errors
    store.error(function(error) {
        log('ERROR ' + error.code + ': ' + error.message);
    });

    // When purchase of an extra life is approved,
    // deliver it... by displaying logs in the console.
    // store.when("extra life").approved(function (order) {
    //     log("You got an EXTRA LIFE!");
    //     order.finish();
    // });

    // When purchase of the full version is approved,
    // show some logs and finish the transaction.
    store.when("full content").approved(function (order) {
        log('You just unlocked the FULL CONTENT!');
        // alert('You just unlocked the FULL CONTENT!');
        order.finish();
    });

    // The play button can only be accessed when the user
    // owns the full version.
    store.when("full content").updated(function (product) {

        // document.getElementById("access-full-version-button").style.display =
        //     product.owned ? "block" : "none";
        // alert("full content = " + product.owned);
    });

    // When the store is ready (i.e. all products are loaded and in their "final"
    // state), we hide the "loading" indicator.
    //
    // Note that the "ready" function will be called immediately if the store
    // is already ready.
    store.ready(function() {
        // var el = document.getElementById("loading-indicator");
        // if (el)
        //     el.style.display = 'none';
    });

    // When store is ready, activate the "refresh" button;
    store.ready(function() {
        // var el = document.getElementById('refresh-button');
        // if (el) {
        //     el.style.display = 'block';
        //     el.onclick = function(ev) {
        //         store.refresh();
        //     };
        // }
    });

    // Alternatively, it's technically feasible to have a button that
    // is always visible, but shows an alert if the full version isn't
    // owned.
    // ... but your app may be rejected by Apple if you do it this way.
    //
    // Here is the pseudo code for illustration purpose.

    // myButton.onclick = function() {
    //   store.ready(function() {
    //     if (store.get("full version").owned) {
    //       // access the awesome feature
    //     }
    //     else {
    //       // display an alert
    //     }
    //   });
    // };


    // Refresh the store.
    //
    // This will contact the server to check all registered products
    // validity and ownership status.
    //
    // It's fine to do this only at application startup, as it could be
    // pretty expensive.
    log('refresh');
    store.refresh();
};

app.renderIAP = function(p) {

    // var elId = p.id.split(".")[3];

    // var el = document.getElementById(elId + '-purchase');
    // if (!el) return;

    // if (!p.loaded) {
    //     el.innerHTML = '<h3>...</h3>';
    // }
    // else if (!p.valid) {
    //     el.innerHTML = '<h3>' + p.alias + ' Invalid</h3>';
    // }
    // else if (p.valid) {
    //     var html = "<h3>" + p.title + "</h3>" + "<p>" + p.description + "</p>";
    //     if (p.canPurchase) {
    //         html += "<div class='button' id='buy-" + p.id + "' productId='" + p.id + "' type='button'>" + p.price + "</div>";
    //     }
    //     el.innerHTML = html;
    //     if (p.canPurchase) {
    //         document.getElementById("buy-" + p.id).onclick = function (event) {
    //             var pid = this.getAttribute("productId");
    //             store.order(pid);
    //         };
    //     }
    // }
};

app.purchase = function(p) {
    // alert("trying to purchase");
    store.order("full_content_access");
    // alert("hm");
}

// 
// Utilities
// ---------
//

// shortcut to the app logging function.
function log(arg) { app.log(arg); }

// log both in the console and in the HTML #log element.
app.log = function(arg) {
    try {
        if (typeof arg !== 'string')
            arg = JSON.stringify(arg);
        console.log(arg);
        document.getElementById('log').innerHTML += '<div>' + arg + '</div>';
    } catch (e) {}
};

// make sure fn will be called with app as 'this'
app.bind = function(fn) {
    return function() {
        fn.call(app, arguments);
    };
};

app.initialize();