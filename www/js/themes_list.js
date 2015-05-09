/*
    Copyright (c) 2014-2015 Crystal Tech. All rights reserved.
 */

// alert("1");
inappbilling.init(successInit,errorCallback, {showLog:true})
// alert("2");

function successInit(result) {
    // display the extracted text   
    alert(result); 
    // make the purchase
    inappbilling.buy(successPurchase, errorCallback, "full_content_access");

}    
function errorCallback(error) {
   alert(error); 
} 

function successPurchase(productId) {
   alert("Your item has been purchased!");
}

function locked() {
    alert("Медиа контент для данной задачи находится в стадии разработки");

}