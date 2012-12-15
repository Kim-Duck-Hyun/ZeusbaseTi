(function(){
	
	facebook.viewImage = {};
	
	//this function creates a window to show a particular image in large form
	facebook.viewImage.createWindow = function(index,data){
		
		var currentPhoto = index+1;
		
		var win = Ti.UI.createWindow({
			title 			: "Photos: "+currentPhoto+" of "+data.length,
			barColor		: '#444',
			tabBarHidden	: true,
			backButtonTitle	: 'Back'
		});
		
		var actIndicator = Titanium.UI.createActivityIndicator({top:-100});
		actIndicator.show();
		win.add(actIndicator);
		
		//Create a scroll view
		var scrollView = Titanium.UI.createScrollView({
		    contentHeight				: 'auto',
		    top							: 0,
		    showVerticalScrollIndicator	: true
		});
		
		//Create an image view
		var imageView = Titanium.UI.createImageView({
			image				: data[index].src_big,
			top					: 0,
			height				: 300,
			preventDefaultImage : true
		});		
		scrollView.add(imageView);		
		
		//Hide the Activity Indicator after the image loading
		imageView.addEventListener("load",function() {
			actIndicator.hide();
		});
		
		var captionLabel = Ti.UI.createLabel({
			text	: data[index].caption,
			left	: 10,
			top		: 320,
			height	: 20,
			width	: '300',
			color	: '#BBB',
			font	: { fontSize: 14, fontWeight: 'bold' }
		});
		scrollView.add(captionLabel);

		// -------------------- Start Toolbar Section --------------------- //
		//create a left button for toolbar
		var left = Titanium.UI.createButton ({
			image:'images/icon_arrow_left.png'
		});
		
		//If the left button is clicked then show the previous photo
		left.addEventListener('click',function(e) {
			if(index > 0) {
				
				//Decrease the photo index and current photo number
				index--;
				var currenPhotoNumber = index+1;
				
				//Change the window title
				win.title = currenPhotoNumber + ' of ' + data.length;
				
				//Change the image
				actIndicator.show();
				imageView.image = data[index].src_big;
				
				//change Caption
				captionLabel.text = data[index].caption;
			}
		});
		
		//create a right button for toolbar
		var right = Titanium.UI.createButton ({
			image:'images/icon_arrow_right.png'
		});
		
		//If the right button is clicked then show the next photo
		right.addEventListener('click',function(e) 
		{			
			if(index < data.length-1) 
			{	
				//Increase the photo index and current photo number
				index++;
				var currenPhotoNumber = index+1;
				
				//Change the window title
				win.title = currenPhotoNumber + ' of ' + data.length;
				
				//Change the image
				actIndicator.show();
				imageView.image = data[index].src_big;
				
				//Change the Caption
				captionLabel.text = data[index].caption;
			}
		});
		
		//Create flexible space button to add between the buttons
		var flexSpace = Titanium.UI.createButton 
		({
			systemButton	: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		//Create the toolbar using left button, flexible space button and right button
		var toolbar = Titanium.UI.createToolbar
		({
		    items			: [left, flexSpace, right],
		    bottom			: 0,
		    borderTop		: true,
		    borderBottom	: false,
		    zIndex			: 10
		});
		// ------------------------ End Toolbar Section ------------------------ //
		
		win.add(scrollView);
		win.add(toolbar);
		return win;
	}
})();
