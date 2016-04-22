/*
 * Copyright (c) 2014-2016 Crystal Tech. All rights reserved.
 */

// billing.js should be included earlier

var connection = false;

function checkConnection() {
    try {
        var networkState = navigator.connection && navigator.connection.type;

        setTimeout(function(){
            networkState = navigator.connection && navigator.connection.type;

            connection = !(networkState == Connection.NONE || networkState == Connection.UNKNOWN);
        }, 500);
    } catch(e) {
        window.analytics.trackException('checkConnection catch: ' + e, false);
        alert(e);
        $.each(navigator, function(key, value) {
            alert(key+' => '+value);
        });
    }
}

function on_buy() {
    check_connection();
    log('on_buy');
    
    app.purchase_full_version();
}

restore_requested = false;

function on_restore() {
    check_connection();

    window.analytics.trackEvent('Action', 'Restore', 'Full version');
    restore_requested = true;
    log('refresh');
    store.refresh();
}

function check_connection() {
    log("connection = " + connection);
    if (!connection) {
        checkConnection();

        setTimeout(function() {
            log("connection = " + connection);
            if (!connection) {
                alert("Проверьте интернет соединение");
                window.analytics.trackException('Проверьте интернет соединение', false);
            }
        }, 550);
        
        return;
    }
}

// redefine 
// this called when any product update
app.renderIAP = function(p) {
    // alert("renderIAP");

    update_text(p.price);

    if (p.owned) {
        document.location = "themes_list.html";
        return;
    } 
    
    if (restore_requested) {
        restore_requested = false;
        alert("У Вас пока нет покупок");
    }
};

update_text = function(price) {
    if (price == null)
        return;

    new_text = "";

    if (price.length >= 2 && price[price.length - 1] == "₽") {
        price = price.substring(0, price.length - 2);

        new_text = "Скорее осуществите доступ<br>еще к 6 темам: (11-15, 17)<br>всего за <b>" + price + " рублей</b>!";
    } else {
        new_text = "Скорее осуществите доступ<br>еще к 6 темам: (11-15, 17)<br>всего за <b>" + price + "</b>!";
    }

    var texts = document.getElementsByClassName("text");
    if (texts) {
        text = texts[0];
        if (text) {
            text.innerHTML = new_text;
        }
    }
}

on_store_error = function(error) {
    log("on_store_error");

    // alert(error.message);

    window.analytics.trackException(error.message, false);

    switch (error.code) {
        case 6777010:
            // Не удается подключиться к iTunes Store
            // alert("Проверьте интернет соединение");
            break;
        case 6777019:
            // Failed to restore purchases during refresh
            // alert("Не удалось восстановить покупку");
            break;
    }
};


