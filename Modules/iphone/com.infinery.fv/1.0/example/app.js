var ui = require('com.infinery.fv');
var win;
var vw, vw2;
var v1 = [];
var v2 = [];
var or = 0;

function addViews(tgt, nmb, bgc, w, h, cbadd)
{
	for (var i = 0; i < nmb; i++)
	{
		var v = Ti.UI.createView(
			{
				width: w,
				height: h,
				borderRadius: 7,
				borderWidth: 2,
				borderColor: 'black',
				backgroundColor: bgc
			});
			
		var l = Ti.UI.createLabel( 
			{
				text: 'view ' + i,
				width: v.width,
				textAlign: 'center',
				height: 21
			});
		
		v.addEventListener('dblclick', function()
		{
			try
			{		
				var vv = Ti.UI.createView(
				{
					width: w,
					height: h,
					borderRadius: 7,
					borderWidth: 2,
					borderColor: 'red',
					backgroundColor: bgc,
					backgroundImage: 'bg1.jpg'
				});
			
				cbadd(vv);
			}
			catch (eee)
			{
				alert('[WARN] error: ' + eee);
			}
		});
		
		v.add(l);		
			
		tgt.push(v);
	}
}

var w = Ti.Platform.displayCaps.platformWidth;
var h = Ti.Platform.displayCaps.platformHeight;

addViews(v1, 12, 'green', w * 0.2, h * 0.15, function(vv) { v1[vw.SelectedIndex].backgroundImage = 'bg1.jpg'; });
addViews(v2, 21, 'blue', w * 0.3, h * 0.25, function(vv) { vw2.AddView(vv); });

win = Ti.UI.createWindow(
	{
		backgroundColor: 'white'
	});

vw = ui.createCarousel(
{
	type: 3,
	design: true,
	views: v1,
	top: 0,
	width: '100%',
	height: '50%',
});
	
win.add(vw);

vw2 = ui.createCarousel(
{
	type: 7,
	views: v2,
	top: '50%',
	width: '100%',
	height: '50%',
	design: false
});
	
win.add(vw2);

win.open();
	
