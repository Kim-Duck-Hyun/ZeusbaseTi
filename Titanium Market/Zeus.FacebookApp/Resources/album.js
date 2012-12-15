(function(){
	
	facebook.album ={};
	
	//this function creates a window containing all the albums of a user
	facebook.album.createWindow = function(data){
		var win = Titanium.UI.createWindow({
			title			: "Photo Albums",
			navBarHidden	: false,
			backgroundColor : '#fff',
			barColor		: '#444',
			backButtonTitle	: 'Back'
		});
		
		var tvRow =[];
		var albumIndex=[];
		var tv = Titanium.UI.createTableView({minRowHieght:120});
		
		function getAlbums()
		{
			//query to find the album name ,album size and album id for the owner name specified
			var query = "SELECT aid, cover_pid, name, size FROM album WHERE owner="+data;
			
			//send the request to fetch information
			Titanium.Facebook.request('fql.query', {query: query},  function(r)
			{
				//if something goes wrong
				if (!r.success) 
				{
					if (r.error)
						alert(r.error);
					else 
						alert("call was unsuccessful");
				}
				
				//parse the result we got
				var result = JSON.parse(r.result);
				for (c=0;c<result.length;c++)
				{	
					//save current album info in row
					var row = result[c];
					albumIndex[c]=row.cover_pid;
					
					tvRow[c] = Ti.UI.createTableViewRow({
						hasChild				: true,
						height					: 'auto',
						selectedBackgroundColor	: '#576996',
						backgroundColor			: (c%2==0)?'#eee':'#ddd'
					});
					
					//create album name label
					var albumLabel = Ti.UI.createLabel({
						font	: {fontSize:15, fontWeight:'bold'},
						left	: 70,
						top		: 5,
						width	: 'auto',
						height	: 40,
						color	: '#050505',
						text	: row.name
					});
					tvRow[c].add(albumLabel);
		
					//create the album size label
					var sizeLabel = Ti.UI.createLabel({
						font	: {fontSize:13},
						left	: 70,
						top		: 50,
						height	: 'auto',
						width	: 'auto',
						color	: '#576996',
						text	: "Photos:"+row.size
					});
					tvRow[c].add(sizeLabel);
					
					//save the current album id in this row
					tvRow[c].aid = row.aid;
					
					Titanium.Facebook.request('fql.query', {query: "Select pid,src_small from photo where pid="+row.cover_pid},  function(r)
					{
						//if something goes wrong
						if (!r.success) 
						{
							if (r.error) 
								alert(r.error);
							else 
								alert("call was unsuccessful");
						}
						
						//parse the result we got
						var result = JSON.parse(r.result);
						
						//create the cover Image
						var coverImageView =  Titanium.UI.createImageView({
							image		: result[0].src_small,
							height		: 80,
							width		: 60,
							left		: 5,
							top			: 5
						});
						
						//add the cover image to the proper row by finding index of this pid
						var index = albumIndex.indexOf(result[0].pid);
						tvRow[index].add(coverImageView);
					});
					//append the row in tableview
					tv.appendRow(tvRow[c]);
				}
			});
		}
		
		//if a row is clicked then create a new window showing the album photos
		tv.addEventListener('click',function(e)
		{
			facebook.ui.tabGroup.activeTab.open(facebook.photos.createWindow(e.rowData.aid));
		});
		
	 	//add the tableView to the window
		win.add(tv);
		
		//call the getAlbums() function to get the albums
		getAlbums();
		
		return win;
	}
})();
