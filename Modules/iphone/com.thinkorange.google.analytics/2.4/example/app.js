// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

var GoogleAnalytics = require('com.thinkorange.google.analytics');
GoogleAnalytics.accountID = "UA-2061857-2";
GoogleAnalytics.debug = true;
GoogleAnalytics.trackUncaughtExceptions = true;

var tracker = GoogleAnalytics.tracker;
tracker.anonymize = true;
tracker.sampleRate = 95;

var top = 10;
function createButton(title, callback) {
  var button = Ti.UI.createButton({
    title: title, top: top, left: 10, right: 10, width: 300, height: 30
  });
  button.addEventListener('click', callback);
  window.add(button);

  top = top + 40;
}

createButton('setCustomVariable', function(e) {
  var result = tracker.setCustomVariable("iPhone1", "iv1");
  Ti.API.warn("setCustomVariable: " + result);
});

createButton('getVisitorCustomVariable', function(e) {
  alert(tracker.getCustomVariable("iPhone1"));
});

createButton('setCustomDimension', function(e) {
  var result = tracker.setCustomDimension(1, "1000x1000");
  Ti.API.warn("setCustomDimension: " + result);
});

createButton('setCustomMetric', function(e) {
  var result = tracker.setCustomMetric(2, 123456);
  Ti.API.warn("setCustomMetric: " + result);
});

createButton('trackPageView', function(e) {
  tracker.trackView('/app_entry_point');
});

createButton('trackEvent', function(e) {
  tracker.trackEvent({
    category: 'my_category',
    action  : 'my_action',
    label   : 'my_label',
    value   : 2
  });
});

createButton('trackTiming', function(e) {
  tracker.trackTiming({
    category: 'my_category',
    name    : 'timer1',
    label   : 'label1',
    time    : 69
  });
});

createButton('trackSocial', function(e) {
  tracker.trackSocial({
    network : 'Twitter',
    action  : 'tweet',
    target  : 'rubenfonseca'
  });
});

createButton('trackTransaction', function(e) {
  var transaction = GoogleAnalytics.createTransaction({
    transactionID: '1',
    affiliation: 'In-App Store',
    taxMicros: 0.17 * 1000000,
    shippingMicros: 0,
    revenueMicros: 2.16 * 1000000
  });

  transaction.addItem({
    productCode: 'SKU_789',
    productName: "Level Pack: Space",
    productCategory: "Game expansions",
    priceMicros: 1.99 * 1000000,
    quantity: 1
  });

  Ti.API.log("Transaction tracked!");
  tracker.trackTransaction(transaction);
});

createButton('setReferrer', function(e) {
  tracker.referrerURL = 'gclid=12345';
  Ti.API.log("Referrer setted!");
});

createButton('dispatch', function(e) {
  GoogleAnalytics.dispatch();
});

