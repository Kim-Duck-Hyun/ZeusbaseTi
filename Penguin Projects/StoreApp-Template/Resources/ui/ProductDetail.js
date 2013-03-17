
Ti.include("ProductOptions.js");

var createProductDetail = function(productObj){
	// create product detail window components
	var ProductDetail = Ti.UI.createWindow({
			title        : "Details",
			navBarHidden : false,
			layout       : "vertical"
		}),
		top = Ti.UI.createView({
			height           : 115,
			width            : 322,
			top              : -1,
			left             : -1,
			borderColor      : "#ccc",
			backgroundColor  : "#fff"
		}),
		bottom = Ti.UI.createView({
			height          : 250,
			width           : 320,
			backgroundColor : "#fff",
			layout          : "vertical"
		}),
		img  = Ti.UI.createImageView({
			image        : productObj.imgs.main,
			defaultImage : config.PRODUCTS_DEFAULT_MAIN_IMAGE,
			height       : 100,
			left         : 3,
			width        : 140,
			top          : 3
		}),
		name = Ti.UI.createLabel({
			text   : productObj.name,
			width  : 170,
			height : 50,
			top    : 3,
			left   : 145,
			font : {
				fontSize   : 16,
				fontWeight : "normal"
			}
		}),
		price = Ti.UI.createLabel({
			text   : "$" + productObj.price,
			width  : 100,
			height : 20,
			top    : 50,
			left   : 145,
			color  : "#00c",
			font : {
				fontSize   : 16,
				fontWeight : "bold"
			}
		}),
		info = Ti.UI.createWebView({
			visible : false,
			height  : 250,
			width   : 320,
			html : [
				"<htm><head><style>body{margin:5px;padding:0}body,p,strong",
				"{font-family:helvetica;font-size:12px}</style></head><body>",
				productObj.desc.long,
				"</body></html>"
			].join("")
		}),
		buyButton = Ti.UI.createButtonBar({
			labels          : [ "Add to Cart" ],
			backgroundColor : "#063",
			style           : Ti.UI.iPhone.SystemButtonStyle.BAR,
			height          : 30,
			width           : 80
		});

	// assemble UI
	top.add(img);
	top.add(name);
	top.add(price);
	ProductDetail.add(top);
	ProductDetail.add(bottom);
	ProductDetail.setRightNavButton(buyButton);

	ProductDetail.addEventListener(
		"focus",
		setInfoHTML
	);

	ProductDetail.addEventListener(
		"blur",
		function(e){
			setTimeout(
				function(){
					ProductDetail.close({animated : false});
				},
				300
			);
		}
	);

	function setInfoHTML(){
		bottom.add(info);
		info.show();
	}

	function clearInfoHTML(){
		bottom.remove(info);
	}

	function buyHandler(){
		if(productObj.options){
			createProductOptions(productObj).open();
		}
		else{
			CartWindow.addItem(productObj.id);
		}
	}

	buyButton.addEventListener(
		"click",
		buyHandler
	);

	return ProductDetail;
};