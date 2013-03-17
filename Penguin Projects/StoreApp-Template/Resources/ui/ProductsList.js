var ProductsList = (function(){
	// create product list window components
	var ProductsList = Ti.UI.createWindow({
			title        : "Products",
			navBarHidden : false
		}),
		Table  = Ti.UI.createTableView();

	// assemble UI
	ProductsList.add(Table);

	/*
	 * Product row factory method
	 *
	 * @param {String} name: the product name to display
	 * @param {String} image: the icon image to display
	 * @param {String} desc: description of item to display in row
	 * @param {String} itemId: item id used to load product page
	 */
	function createProductRow(name, image, desc, itemId){
		var row  = Ti.UI.createTableViewRow({
				className : "product_rows",
				height    : 62,
				hasChild  : true
			}),
			img  = Ti.UI.createImageView({
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
				width           : 200,
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
				width  : 200,
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
					{ "itemId" : itemId, "tab" : "Products" }
				);
			}
		);

		return row;
	}

	/*
	 * Product group factory method
	 * 
	 * @param {String} name: the name of the group/section
	 * @param {Array} products: array of products for this group/section
	 */
	function createProductGroup(name, products){
		var productGroup = Ti.UI.createTableViewSection({
			headerTitle     : name,
			backgroundColor : "#000"
		});
		for(var i=0,l=products.length;i<l;i++){
			productGroup.add(
				createProductRow(
					products[i].name,
					products[i].imgs.thumb,
					products[i].desc.short,
					products[i].id
				)
			);
		}
		return productGroup;
	}

	/*
	 * Assemble product groups for table view
	 *
	 * @param {Object} groups: the groups object containing product arrays for each group/section
	 */
	function displayProducts(){
		var data = [],
			groups = require('core/ProductManager').getProductGroup("__ALL__");
		for(var key in groups){
			data.push(
				createProductGroup(
					key,
					groups[key]
				)
			);
		}
		Table.setData(data);
	}

	ProductsList.addEventListener(
		"focus",
		displayProducts
	);

	ProductsList.displayProducts = displayProducts;

	return ProductsList;
})();