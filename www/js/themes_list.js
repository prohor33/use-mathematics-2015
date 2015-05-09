/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

// // We must wait for the "deviceready" event to fire
// // before we can use the store object.
// document.addEventListener('deviceready', initializeStore, false);

// function initializeStore() {
// 		alert("initializeStore");

//     // Let's set a pretty high verbosity level, so that we see a lot of stuff
//     // in the console (reassuring us that something is happening).
//     store.verbosity = store.INFO;
//     alert("1");

//     // We register a dummy product. It's ok, it shouldn't
//     // prevent the store "ready" event from firing.
//     store.register({
//         id:    "com.example.app.inappid1",
//         alias: "100 coins",
//         type:  store.CONSUMABLE
//     });
//     alert("2");

//     // When every goes as expected, it's time to celebrate!
//     // The "ready" event should be welcomed with music and fireworks,
//     // go ask your boss about it! (just in case)
//     store.ready(function() {
//         console.log("\\o/ STORE READY \\o/");
//     });
//     alert("3");

//     // After we've done our setup, we tell the store to do
//     // it's first refresh. Nothing will happen if we do not call store.refresh()
//     store.refresh();
//     alert("4");
// }

// function locked() {
//     alert("Медиа контент для данной задачи находится в стадии разработки");

// }