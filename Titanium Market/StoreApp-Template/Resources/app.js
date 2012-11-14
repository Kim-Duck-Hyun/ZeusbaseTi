// Include all required scripts
Ti.include(
	// helper files
	"configuration.js",
	"utils/shortcuts.js",
	"utils/etc.js",

	// app files
	"ui/HomeWindow.js",
	"ui/ProductsList.js",
	"ui/ProductDetail.js",
	"ui/Info.js",
	"ui/Cart.js",
	"ui/WebView.js",
	"ui/Store.js"
);

// Open Main Store Window w/Animation
Store.open({ transition : Ti.UI.iPhone.AnimationStyle.CURL_UP });

// Show Loading Indicator Below Spotlight
Store.showIndicator({top : 235});

// Load Store Products
Store.load(config.PRODUCT_LIST_URL);
