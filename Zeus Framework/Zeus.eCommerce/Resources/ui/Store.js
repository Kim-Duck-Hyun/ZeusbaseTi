/*
 * Store object contains all the components & logic for the application.
 */
var Store = (function(){

	// create store components
	var Store    = Ti.UI.createTabGroup({ barColor : "#000" }),
		Home     = Ti.UI.createTab({ title : "Home",     icon : "imgs/icons/light_home.png", window : HomeWindow   }),
		Products = Ti.UI.createTab({ title : "Products", icon : "imgs/icons/light_tag.png",  window : ProductsList }),
		Info     = Ti.UI.createTab({ title : "Info",     icon : "imgs/icons/light_info.png", window : InfoWindow   }),
		Cart     = Ti.UI.createTab({ title : "Cart",     icon : "imgs/icons/light_cart.png", window : CartWindow   });

	// Store event key constants
	var events = {
		"SHOW_PRODUCT" : "STORE:SHOW_PRODUCT"
	};

	// Load indicator
	var loadingIndicator = require('ui/Indicator');

	// get product manager
	var ProductManager  = require('core/ProductManager');

	// assemble store UI
	Store.addTab(Home);
	Store.addTab(Products);
	Store.addTab(Info);
	Store.addTab(Cart);

	// show product detail window for different sections
	Store.addEventListener(
		events.SHOW_PRODUCT,
		function(e){
			var sourceTab,
				selectedProduct = ProductManager.getProduct(e.itemId);

			if(e.tab=="Home"){
				sourceTab = Home;
			}
			else if(e.tab=="Products"){
				sourceTab = Products;
			}
			else if(e.tab=="Cart"){
				sourceTab = Cart;
			}
			sourceTab.open(
				createProductDetail( selectedProduct ),
				{ animated : true }
			);
		}
	);

	/*
	 * Load products from local data or from server based on param passed in
	 * 
	 * @param {String|Object} data: the json data or url for json data to load
	 */
	function load(data){
		var _callBack = function(productList){
			ProductManager.setProducts(
				productList,
				function(){
					loadingIndicator.hide();
				}
			);
		}
		if(typeof data==="string" && etc.isURL(data)){ etc.fetch(data, _callBack); }
		else if(typeof data==="object" && data.products){ _callBack(data.products); }
		else { return etc.error("Store.load: Invalid url or object"); }
	}

	/*
	 * Wrapper function for setting the cart badge number displayed in the cart tab
	 *
	 * @param {Number} count: the amount to display in the cart tab badge
	 */
	function setCartBadge(count){
		Cart.badge = (count==0) ? null : count;
	}

	// add public functions & parameters
	Store.events = events;
	Store.load   = load;
	Store.currentTab = Home;
	Store.updateStoreBadge = setCartBadge;
	Store.showIndicator = loadingIndicator.show;
	Store.hideIndicator = loadingIndicator.hide;

	return Store;
})();
