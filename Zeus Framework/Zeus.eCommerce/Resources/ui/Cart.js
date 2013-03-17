var CartWindow = (function(){

	// Add PayPal (requires module package)
	var PaypalModule = require('ti.paypal');

	// Add CartManager
	var CartManager = require('core/CartManager');
	
	// Add ProductManager
	var ProductManager = require('core/ProductManager');

	// Include Order Fullfilment calls
	Ti.include("../core/ProcessOrder.js");

	// Create Cart UI Components
	var CartWindow = Ti.UI.createWindow({ 
			title           : "Cart",
			navBarHidden    : false,
			backgroundColor : "#cbd2d8"
		}),
		buttons = [{
			title   : "Checkout",
			enabled : false
		}],
		checkoutButton = Ti.UI.createButtonBar({
			labels          : buttons,
			backgroundColor : '#063',
			style           : Ti.UI.iPhone.SystemButtonStyle.BAR,
			height          : 30
		}),
		table = Ti.UI.createTableView({
			allowsSelectionDuringEditing : false,
			allowsSelection              : false,
			editable                     : true,
			width                        : 320,
			height                       : 326,
			top                          : 0
		}),
		editButton = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.EDIT,
			enabled      : false
		}),
		cancelButton = Ti.UI.createButton({
			title : "Done",
			style : Ti.UI.iPhone.SystemButtonStyle.DONE
		}),
		emptyCartRow = Ti.UI.createTableViewRow({
			className : "empty_cart",
			height    : 370
		}),
		emptyCartLbl = Ti.UI.createLabel({
			text      : "Your Cart Is Empty",
			textAlign : "center",
			font : {
				fontSize   : 16,
				fontWeight : "bold"
			}
		}),
		subTotalView = Ti.UI.createView({
			width  : 320,
			height : 44,
			top    : 326,
			layout : "horizontal"
		}),
		subTotalLbl = Ti.UI.createLabel({
			text      : "Subtotal: ",
			textAlign : "right",
			height    : 44,
			width     : 230,
			font : {
				fontSize   : 16,
				fontWeight : "normal"
			}
		}),
		subTotalAmountLbl = Ti.UI.createLabel({
			text      : "$0.00",
			width     : 80,
			height    : 44,
			left      : 10,
			textAlign : "left",
			color     : "#00c",
			font : {
				fontSize   : 16,
				fontWeight : "bold"
			}
		});

	// Cart Data (as table row components) and other vars
	var CartItems = [emptyCartRow],
		undefinedVar;

	// PayPal Constants
	var PayPalConts = {
		"SANDBOX"    : PaypalModule.PAYPAL_ENV_SANDBOX,
		"LIVE"       : PaypalModule.PAYPAL_ENV_LIVE,
		"NONE"       : PaypalModule.PAYPAL_ENV_NONE,
		"HARD_GOODS" : PaypalModule.PAYMENT_TYPE_HARD_GOODS,
		"SERVICE"    : PaypalModule.PAYMENT_TYPE_SERVICE,
		"PERSONAL"   : PaypalModule.PAYMENT_TYPE_PERSONAL
	};

	// Assemble Cart UI
	subTotalView.add(subTotalLbl);
	subTotalView.add(subTotalAmountLbl);
	emptyCartRow.add(emptyCartLbl);
	CartWindow.setRightNavButton(checkoutButton);
	CartWindow.setLeftNavButton(editButton);
	CartWindow.add(table);
	CartWindow.add(subTotalView);

	/*
	 * check if cart contains any items
	 *
	 * @return {Boolean}
	 */
	CartWindow.hasItems = function(){
		return CartManager.hasItems();
	};

	/*
	 * add an item to the cart
	 *
	 * @param {String} id: unique id of product to add to cart
	 */
	CartWindow.addItem = function(id, options){
		CartManager.addItem(id, options);
	};

	/*
	 * remove an item from the cart
	 *
	 * @param {String} id: unique id of product to remove from cart
	 */
	CartWindow.removeItem = function(id, options){
		CartManager.removeItem(id, options);
	};

	/*
	 * Empty Cart
	 */
	CartWindow.empty = function(){
		subTotalAmountLbl.text = "$0.00";
		CartItems = [emptyCartRow];
		buttons[0].enabled = false;
	    checkoutButton.labels = buttons;
		table.allowsSelection = false;
		editButton.enabled = false;
		if(table.editing == true){
			CartWindow.setLeftNavButton(editButton);
			CartWindow.setRightNavButton(checkoutButton);
			table.editing = false;
		}
		table.setData(CartItems);
		Store.updateStoreBadge(0);
		CartManager.empty();
	};

	function setCartTable(){
		var cartData = CartManager.getRawCartData(),
			tableRows = [],
			product,
			i = 0,
			len = cartData.length;

		for(; i<len; i++){
			product = ProductManager.getProduct(cartData[i].id);
			tableRows.push(createRow(product, cartData[i].options, cartData[i].quantity));
		}
		if(CartManager.hasItems()){
		    buttons[0].enabled = true;
		    checkoutButton.labels = buttons;
			table.allowsSelection = true;
			editButton.enabled = true;
			table.setData(tableRows);
			CartItems = tableRows;
		}
		else{
			CartWindow.empty();
		}

	}

	function createRow(product, options, quantity){
		var row  = Ti.UI.createTableViewRow({
				className : "cart_item",
				hasChild  : true
			}),
			img  = Ti.UI.createImageView({
				image  : product.imgs.thumb,
				height : 36,
				left   : 3,
				width  : 55,
				top    : 3
			}),
			title = Ti.UI.createLabel({
				text            : product.name,
				minimumFontSize : 13,
				width           : 220,
				height          : 16,
				left            : 65,
				top             : 4,
				font : {
					fontSize   : 14,
					fontWeight : "bold"
				}
			}),
			optionsList = Ti.UI.createLabel({
				color  : "#5C5C5C",
				left   : 28,
				height : "auto",
				width  : 220,
				left   : 65,
				text   : "",
				font : {
					fontSize   : 11,
					fontWeight : "normal"
				}
			}),
			price = Ti.UI.createLabel({
				text   : "$"+product.price,
				width  : 55,
				height : 14,
				left   : 65,
				top    : 25,
				color  : "#00c",
				font : {
					fontSize   : 12,
					fontWeight : "bold"
				}
			}),
			qty = Ti.UI.createLabel({
				text   : "Qty: " + (quantity || 1),
				width  : 100,
				height : 14,
				left   : 125,
				top    : 25,
				font : {
					fontSize   : 12,
					fontWeight : "normal"
				}
			}),
			qtyField = Ti.UI.createTextField({
				width  : 30,
				height : 18,
				left   : 150,
				bottom    : 2,
				visible: false,
				font : {
					fontSize   : 12,
					fontWeight : "normal"
				},
				borderRadius : 4,
				borderWidth  : 1,
				paddingLeft  : 3,
				paddingRight : 3,
				textAlign : "right",
				keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
			});

		row.add(img);
		row.add(title);
		row.add(price);
		row.add(qty);
		row.add(qtyField);

		row.id = product.id;
		row.quantity = quantity || 1;
		row.qtyLbl = qty;
		row.qtyFld = qtyField;
		row.price = product.price;
		row.name = product.name;
		row.options = options;

		if(options!==""){
			optionsList.text = options;
			row.add(optionsList);
			optionsList.top = 22;
			row.height = optionsList.height + 44;
			price.top = 25 + optionsList.height;
			qty.top = 25 + optionsList.height;
			row.options = optionsList.text;
		}

		row.addEventListener(
			"click",
			function(e){
				Store.fireEvent(
					Store.events.SHOW_PRODUCT,
					{ "itemId" : product.id, "tab" : "Cart" }
				);
			}
		);
		return row;
	}

	/*
	 * Create PayPal Button object
	 *
	 * @param {Number} amount: The total amount of the order
	 * @param {Number} tax: Tax amount to apply to transaction
	 * @param {Number} shipping: Shipping cost to apply to transaction
	 * @param {String} desc: Description (not required)
	 * @returns {Object} PayPal button UI object
	 */
	function getPayPalButton(amount, tax, shipping, desc){
		return PaypalModule.createPaypalButton({
			// NOTE: height/width only determine the size of the view that the button is embedded in - the actual button size
		    // is determined by the buttonStyle property!
		    width             : 194,
			height            : 37,
			top               : 10,
			language          : 'en_US',
			textStyle         : PaypalModule.PAYPAL_TEXT_PAY, // Set to "Pay" to "Donate"
		    buttonStyle       : PaypalModule.BUTTON_194x37, // The style & size of the button
		    paypalEnvironment : PayPalConts[config.PAYPAL_ENVIRONMENT],
		    feePaidByReceiver : false, // This will only be applied when the transaction type is Personal
		    enableShipping    : config.PAYPAL_ENABLE_SHIPPING, // Whether or not to select/send shipping information
		
		    payment : { // The payment itself
		    	paymentType     : PayPalConts[config.PAYPAL_TRANSACTION_TYPE], // The type of payment
		    	paymentSubtype  : PaypalModule.SUBTYPE_NOT_SET, // To change this you must be authorized for by Paypal (see module documentation)!
				appId           : (config.PAYPAL_APP_ID!=="null") ? config.PAYPAL_APP_ID : undefinedVar,
		        subtotal        : amount, // The total cost of the order, excluding tax and shipping
		        tax             : tax || 0.00,
		        shipping        : shipping || 0.00,
		        currency        : 'USD',
		        recipient       : config.PAYPAL_RECIPIENT,
		        itemDescription : desc || "",
		        merchantName    : config.MERCHANT_NAME
		    }
		})
	}

	/*
	 * Create checkout modal
	 */
	function createCheckoutModal(){
		var total = CartManager.getSubTotal(),
			checkoutWin = Ti.UI.createWindow({
				modal           : true,
				barColor        : "#000",
				title           : "Checkout",
				backgroundColor : "#fff",
				layout          : "vertical"
			}),
			checkoutLbl = Ti.UI.createLabel({
				text      : "Total: $" + total,
				textAlign : "center",
				height    : 30,
				top       : 100,
				color     : "#000"
			}),
			cancelButton = Ti.UI.createButton({
				systemButton : Ti.UI.iPhone.SystemButton.CANCEL
			}),
			paypalBtn = getPayPalButton(parseFloat(CartManager.getSubTotal()));

		checkoutWin.setLeftNavButton(cancelButton);
		checkoutWin.add(checkoutLbl);
		checkoutWin.add(paypalBtn);

		cancelButton.addEventListener(
			'click',
			function(){
				checkoutWin.close();
			}
		);
		PaypalModule.addEventListener(
			'paymentCanceled',
			function(e) {
				ProcessOrder.cancelled(CartManager.getCartData());
		    	checkoutWin.close();
			}
		);
		
		PaypalModule.addEventListener(
			'paymentSuccess',
			function(e) {
				ProcessOrder.success(CartManager.getCartData(), e.transactionID);
		    	CartWindow.empty();
		    	checkoutWin.close();
			}
		);
		PaypalModule.addEventListener(
			'paymentError',
			function(e) {
				ProcessOrder.failed(CartManager.getCartData(), e.errorCode, e.errorMessage);
		    	checkoutWin.close();
			}
		);

		return checkoutWin;
	}

	/*
	 * Bind Events & Handlers
	 */
	table.addEventListener(
		"delete",
		function(e){
			CartWindow.removeItem(e.row.id, e.row.options);
		}
	);

	Ti.App.addEventListener(
		CartManager.events.change,
		function(e){
			if(table.editing){ return; }
			if(!CartManager.hasItems()){
				CartWindow.empty();
			}
			else{
				setCartTable();
				Store.updateStoreBadge(CartManager.getItemCount());
				subTotalAmountLbl.text = "$" + CartManager.getSubTotal();
			}
		}
	);

	CartWindow.addEventListener(
		"focus",
		function(e){
			//hack to disable buttonbar buttons (http://bit.ly/pmxL7Y)
			checkoutButton.labels = buttons;
			setCartTable();
		}
	);

	editButton.addEventListener(
		"click",
		function(e){
			CartWindow.setLeftNavButton(cancelButton);
			CartWindow.setRightNavButton();
			table.editing = true;

			for(var i=0,len=CartItems.length;i<len;i++){
				CartItems[i].qtyFld.setVisible(true);
				CartItems[i].qtyFld.value = CartItems[i].quantity;
				CartItems[i].qtyLbl.text = "Qty:";
			}
		}
	);

	checkoutButton.addEventListener(
		"click",
		function(e){
			if(e.index==0){// make sure button is clicked
				var modal = createCheckoutModal();
				modal.open();
			}
		}
	);

	cancelButton.addEventListener(
		'click', 
		function(e){
			var hasQuantityChanged = false,
				tempQuantity,
				item,
				i = 0,
				len = CartItems.length;

			CartWindow.setLeftNavButton(editButton);
			CartWindow.setRightNavButton(checkoutButton);
			table.editing = false;

			for(;i<len;i++){
				item = CartItems[i];
				if(item.qtyFld.value!=="" && !isNaN(item.qtyFld.value-0)){
					tempQuantity = Math.floor(item.qtyFld.value - 0);
					if(!hasQuantityChanged && item.quantity!==tempQuantity){
						hasQuantityChanged = true;
					}
					item.quantity =  tempQuantity;
				}
				CartManager.setItemQuantity(item.id, item.options, item.quantity);
			}
			if(!hasQuantityChanged){
				setCartTable();
			}
		}
	);

	return CartWindow;
})();