/*
 * SingularTouch "Mosaic Flip Item" Component v1.0.2
 *
 * http://singulartouch.com
 * support@singulartouch.com
 * 
 * Copyright 2011 - All rights reserved
 */
	
SingularTouch.UI.createMosaicFlipItem = function (_args)
{
	if (!_args)
	{
		_args = {};
	}
	
	if (!_args.data)
	{
		_args.data = {};
	}

	// Basic view
	var item = Ti.UI.createView({
		borderRadius:_args.borderRadius || 0
	});

	// Data of the item (necessary to sorting)
	item.data = _args.data;
	item.remoteMedia = false;

	// Front View (not use ImageView because has a lot of bugs in the 1.7.2 version of the SDK)
	var front = Ti.UI.createView({
		backgroundImage: _args.data.image || '',
		backgroundColor:"#000",
		borderWidth:3,
		borderColor:'#FFF',
		top:0,
		bottom:0,
		left:0,
		right:0,
		zIndex:1,
		borderRadius:_args.borderRadius || 0
	});

	// If is a URL (not a media file in local path), 
	if (_args.data.image && Ti.Platform.canOpenURL(_args.data.image))
	{
		var indicator = Ti.UI.createActivityIndicator({});

		front.add(indicator);
		indicator.show();
		
		SingularTouch.Utils.downloadMedia({
				url: _args.data.image,
				forceDownload: false				// set to 'true' if you always want to download remote files (ignoring cache)
			},
			function (_local_file)
			{
				front.remove(indicator);
	
				if (_local_file)
					front.backgroundImage = _local_file;
				else
					front.backgroundImage = '';
			}
		);			
	}

	var titleBar = Ti.UI.createView({
		backgroundImage: '../demo/images/white_trans_50.png',
		borderWidth:0,
		bottom:10,
		left:0,
		right:0,
		height:'auto',
		layout:'vertical'
	});

	var lblTitle = Titanium.UI.createLabel({
		color:'#000',
		text: _args.data.title || "Title",
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:'bold'
		},
		textAlign:'center',
		height:'auto',
		width:'auto',
		shadowColor:"#FFF",
		shadowOffset: {
			x:0,
			y:1
		}
	});

	var lblSubtitle = Titanium.UI.createLabel({
		color:'#333',
		text: _args.data.subtitle || "Subtitle",
		font: {
			fontSize:12,
			fontFamily:'Helvetica Neue',
			fontWeight:'bold'
		},
		textAlign:'center',
		height:'auto',
		width:'auto',
		shadowColor:"#FFF",
		shadowOffset: {
			x:0,
			y:1
		}
	});

	//front.add(btnMore);
	titleBar.add(lblTitle);
	titleBar.add(lblSubtitle);
	front.add(titleBar);
	item.add(front);

	// Back View
	var back = Ti.UI.createView({
		backgroundColor:"#FFF",
		borderWidth:0,
		top:0,
		bottom:0,
		left:0,
		right:0,
		zIndex:0,
		borderRadius:_args.borderRadius || 0
	});

	var btnClose = Titanium.UI.createButton({
		backgroundImage: _args.closeButtonImage || '../demo/images/close.png',
		top:2,
		right:2,
		width:28,
		height:28,
		zIndex:9999,
		visible: _args.closeButtonVisible || true
	});

	var lblDescription = Titanium.UI.createLabel({
		color:'#999',
		text: _args.data.description || '',
		font: {
			fontSize:12,
			fontFamily:'Helvetica Neue',
			fontWeight:'bold'
		},
		textAlign:'center',
		height:'auto',
		left:10,
		right:10
	});

	back.add(lblDescription);
	back.add(btnClose);
	item.add(back);

	/*
	 * EVENTS
	 */
	front.addEventListener("click", function (ev) {
		item.fireEvent("flipBack");
	});
	
	item.addEventListener("flipBack", function (ev) {
		back.touchEnabled = false;
		front.animate({
			view:back,
			transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		}, function () {
			back.touchEnabled = true;
			item.fireEvent("atBack", {
				data: item.data
			});
		});
		item.fireEvent("goingBack");
	});
	
	btnClose.addEventListener('click', function(ev) {
		item.fireEvent("flipFront");
	});
	
	item.addEventListener("flipFront", function (ev) {
		front.touchEnabled = false;
		back.animate({
			view:front,
			transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		}, function () {
			front.touchEnabled = true;
			item.fireEvent("atFront");
		});
		item.fireEvent("goingFront");
	});
	
	return item;
};