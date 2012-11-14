/*
 * HomeWindow
 * This component contains all the home window elements & behaviors
 */
var HomeWindow = (function(){
	// create home window components
	var Window = Ti.UI.createWindow({
			navBarHidden : true,
			title        : "Home"
		}),
		Spotlight = Ti.UI.createScrollableView({
			height              : 210,
			width               : 322,
			top                 : 0,
			left                : -1,
			backgroundImage     : config.SPOTLIGHT_BG_IMAGE || null,
			showPagingControl   : true,
			pagingControlHeight : 20,
			pagingControlColor  : config.SPOTLIGHT_BG_COLOR,
			backgroundColor     : config.SPOTLIGHT_BG_COLOR
		}),
		Featured  = Ti.UI.createTableView({
			top    : 210,
			bottom : 0,
			width  : 320
		});

	// get product manager
	var products = require('core/ProductManager'),
		productEvents = products.events;

	// assemble UI
	Window.add(Spotlight);
	Window.add(Featured);

	$.addListener(
		productEvents.SPOTLIGHTS_READY,
		function(e){
			assembleSpotlightViews(products.getSpotlightProducts());
		}
	);

	$.addListener(
		productEvents.FEATURED_READY,
		function(e){
			assembleFeaturedRows(products.getFeaturedProducts());
		}
	);
	// handle spotlight item singletap event
	Spotlight.addEventListener(
		"singletap",
		function(e){
			if(e.source.productId){
				Store.fireEvent(
					Store.events.SHOW_PRODUCT,
					{ "itemId" : e.source.productId, "tab" : "Home" }
				);
			}

		}
	);

	/*
	 * Spotlight view factory method
	 * 
	 * @param {String} image: image path or url for spotlight item
	 * @param {String} itemId: item id used to load product page
	 * @return {View} a spotlight view with public custom methods
	 */
	function createSpotlight(image, itemId){
		var view = Ti.UI.createView(),
			img  = Ti.UI.createImageView({
				image        : image,
				defaultImage : config.PRODUCTS_DEFAULT_SPOTLIGHT_IMAGE
			});

		// assemble
		view.add(img);

		// Public function use to update/set spotlight image
		view.setImage = function(img){
			img.image = img;
		};

		img.productId = itemId;

		return view;
	}

	/*
	 * Assemble spotlight scrollable view using list of spotlight properties
	 *
	 * @param {Array} list: array list of spotlight view properties
	 */
	function assembleSpotlightViews(list){
		for(var i=0, l=list.length;i<l;i++){
			Spotlight.addView(
				createSpotlight(list[i].img, list[i].id)
			);
		}
	}

	/*
	 * Featured row factory method
	 *
	 * @param {String} name: the product name to display
	 * @param {String} image: the icon image to display
	 * @param {String} desc: description of item to display in row
	 * @param {String} itemId: item id used to load product page
	 */
	function createFeaturedRow(name, image, desc, itemId){
		var row = Ti.UI.createTableViewRow({
				className : "featured_rows",
				height    : 62,
				hasChild  : true
			}),
			img = Ti.UI.createImageView({
				image        : image,
				height       : 56,
				left         : 3,
				width        : 75,
				top          : 3,
				defaultImage : config.PRODUCTS_DEFAULT_THUMB_IMAGE
			}),
			title = Ti.UI.createLabel({
				text            : name,
				minimumFontSize : 13,
				width           : 220,
				height          : 16,
				left            : 82,
				top             : 4,
				font : {
					fontSize   : 14,
					fontWeight : "bold"
				}
			}),
			body = Ti.UI.createLabel({
				text   : desc,
				width  : 210,
				height : 30,
				left   : 82,
				top    : 22,
				font : {
					fontSize : 12
				}
			});

		// assemble row
		row.add(img);
		row.add(title);
		row.add(body);

		// handle featured item click event
		row.addEventListener(
			"click",
			function(e){
				Store.fireEvent(
					Store.events.SHOW_PRODUCT,
					{ "itemId" : itemId, "tab" : "Home" }
				);
			}
		);

		return row;
	}

	/*
	 * Assemble featured table using list of featured products
	 *
	 * @param {Array} list: array list of featured row properties
	 */
	function assembleFeaturedRows(list){
		var rows = [];
		for(var i=0, l=list.length;i<l;i++){
			rows.push(
				createFeaturedRow(
					list[i].name,
					list[i].img,
					list[i].desc,
					list[i].id
				)
			);
		}
		Featured.setData(rows);
	}

	return Window;
})();
