/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

IS_IOS = false;

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
        window.analytics.trackException('Store not available', false);
        return;
    }

    // Enable maximum logging level
    store.verbosity = store.DEBUG;

    // Enable remote receipt validation
    store.validator = "https://api.fovea.cc:1982/check-purchase";

    // Inform the store of your products
    log('registerProducts');
    store.register({
        id:    'crystal.tech.defeat_use.purchase.full_version',
        alias: 'full version',
        type:   store.NON_CONSUMABLE
    });


    // When any product gets updated, refresh the HTML.
    store.when("product").updated(function (p) {
        app.renderIAP(p);
    });

    // Log all errors
    store.error(function(error) {
        log('ERROR ' + error.code + ': ' + error.message);
        window.analytics.trackException('ERROR ' + error.code + ': ' + error.message, false);
    });

    // When purchase of the full version is approved,
    // show some logs and finish the transaction.
    store.when("full version").approved(function (order) {
        log('You just unlocked the FULL VERSION!');
        // alert('You just unlocked the FULL CONTENT!');
        order.finish();
    });

    // The play button can only be accessed when the user
    // owns the full version.
    store.when("full version").updated(function (product) {

        if (product.owned) {
            var was_res = localStorage.getItem("full_version_product_state");
            if (was_res != "owned") {
                window.analytics.trackEvent('Action', 'Purchase', 'Full version');
            } else {
                window.analytics.trackEvent('Info', 'Update owned', 'Full version');
            }

            localStorage.setItem("full_version_product_state", "owned");
        }

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
    // theme_list.js should be included first
    render_themes_state();
};

app.try_to_open_theme = function(theme_address) {
    if (IS_IOS) {
        document.location = theme_address;
        return;
    }

    var res = localStorage.getItem("full_version_product_state");
    if (res != "owned") {
        app.purchase_full_version();
        return;
    }

    document.location = theme_address;
};

app.purchase_full_version = function(p) {
    store.order("crystal.tech.defeat_use.purchase.full_version");
    window.analytics.trackEvent('Action', 'Open purchase window', 'Full version');
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