var createWebViewWindow = function(title, url){

	var window = Ti.UI.createWindow({
			title           : title,
			navBarHidden    : false,
			backgroundColor : "#fff"
		}),
		webview = Ti.UI.createWebView({
			top             : 0,
			bottom          : 0,
			left            : 0,
			right           : 0,
			backgroundColor	: "transparent",
			visible         : false,
			scalesPageToFit : false,
			url             : url
		});

	window.add(webview);

	window.addEventListener( "focus", setInfoHTML );
	webview.addEventListener( "beforeload", function(){ Store.showIndicator(); });
	webview.addEventListener( "load", function(){ Store.hideIndicator(); });

	function setInfoHTML(){
		window.add(webview);
		webview.show();
	}

	return window;
};