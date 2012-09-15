// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

// TODO: write your module tests here

var button = Ti.UI.createButton({
    title:'Show Alert',
    width:100,
    height:50
});

var advalertview = require('com.emityme.advalertview');
button.addEventListener('click', function(e) {
    var alert = advalertview.createView({
        tag:1,
        cancelButton:{title:"Cancel"},
        otherButtons:[{title:"OK", 
                        callback:function(e){
                            Ti.API.log("clicked button tag: " + e.tag);
                        }
                      }]
    });
	alert.addEventListener('close', function(e) {
		Ti.API.log('info','close alert with tag ' + e.tag);
		win.remove(alert);
	});
	win.add(alert);
	
});

win.add(button);

win.open();