(function(){
	
	facebook.photos = {};
	
	//this function creates a window containing all the photos of a album
	facebook.photos.createWindow = function(data){
		
		var win = Titanium.UI.createWindow({
			title			: "Photos",
			navBarHidden	: false,
			backButtonTitle	: 'Back',
			barColor		: '#444'
		});
		var scrollView = Titanium.UI.createScrollView({
			contentHeight				: 'auto',
			showVerticalScrollIndicator	: true
		});
		
		var leftPosition=0;
		var topPosition=0;
		var rowArray = [] ;
		
		function loadPhotos()
		{
			//execute the following query to get all the photos of the specified album
			var query = "Select pid,src_small,created,owner,caption,src_big from photo where aid='"+data+"'";
			Titanium.Facebook.request('fql.query', {query: query},  function(r)
			{
				if (!r.success) 
				{	
					if (r.error) 
						alert(r.error);
					else 
						alert("call was unsuccessful");
					return;
				}
				
				//parse and save the r.result we got by executing the query
				result = JSON.parse(r.result);
				Ti.API.info(result.length);
				for (var c=0;c<result.length;c++)
				{
					//save the info about the current photo
					var row = result[c];
					
					var imageView = Titanium.UI.createImageView({	//load  a defaul black image 1st until the intended photo is loaded
						defaultImage	: 'images/default_small.jpg',
						image			: row.src_small,
						top				: topPosition,
						height			: 80,
						width			: 80,
						left			: leftPosition,
						data			: row,
						photoIndex 		: c
					});	
					
					//if a image is clicked then open the image in a new window
					imageView.addEventListener('click',function(e){
						facebook.ui.tabGroup.activeTab.open(facebook.viewImage.createWindow(e.source.photoIndex,result));
					});
					scrollView.add(imageView);
					leftPosition+=82;
					var j = c%4;
					//update image height if the image was the last image of the row
					if(j==3)
					{
						topPosition+=82;
						leftPosition=0;
					}
				}
			});
		}
		
		//call the loadPhotos function to load the photos of an album
		loadPhotos();
	
		//add the scrollView to window
		win.add(scrollView);
		return win;	
	}
})();
