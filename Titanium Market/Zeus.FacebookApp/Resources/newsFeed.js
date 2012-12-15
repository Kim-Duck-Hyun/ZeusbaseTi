(function(){
	
	facebook.newsFeed =  {};
	
	//this function creates a window containing all the recent posts from friends,groups & pages
	facebook.newsFeed.createWindow = function(value)
	{
		var win = Titanium.UI.createWindow({
			title			: (value=="News Feed")? value: "Wall",
			navBarHidden	: false,
			backgroundColor	: 'fff',
			barColor		: '#444',
			backButtonTitle	: 'Back'
		});
		
		var labelClicked = false;
		var tableView = Ti.UI.createTableView({minRowHeight:60});
		var row = [] ;
		var view2=[];
		var uid=[];
		var tableUpdateIndex =0;
		var limit=10;
		var globalData=[];
		var i=0;
		var olderButton = Titanium.UI.createButton({
			title			: "Older Posts",
			backgroundColor	: '#aaa'
		});
		
		olderButton.addEventListener("click",function(e)
		{
			olderButton.title= "Loading...";
			
			//assign current feed length to tableUpdateIndex.to be used in updating the table in next query
			tableUpdateIndex=globalData.length;
			limit = 2*limit;
			getPosts();
		});
		
		//call this function to append the user wall or newsfeed posts to the tableview
		function createPost(data)
		{
			//if this is not the 1st row then delete the ith row that is older post row
			if(i!=0)
				tableView.deleteRow(i);
			var checkLength=0;
			
			//create and append to the table view all the posts available in data 
			for(;checkLength<data.length;checkLength++)
			{
				globalData[i]=data[checkLength];
				
				//create the row and set to vertical layout and save the user id of the
				//current post and add a field named used and assign 0 to it
				row[i]= Titanium.UI.createTableViewRow({
					height					: 'auto',
					layout					: 'vertical',
					id	  					: globalData[i].actor_id,
					used  					: 0,
					backgroundColor			: "#fff",
					selectedBackgroundColor	:'#fff'
				});
				
				//save the user id of the current post to uid
				uid[i] = globalData[i].actor_id;
				
				//create a view currently containing nothing and add it to the row
				view2[i] = Titanium.UI.createView({
					top		: 0,
					height	: 60
				});
				row[i].add(view2[i]);
				
				//execute another query to get the post's user and target's id,user name and photo	
				if(globalData[i].target_id !=null)
					var query= "SELECT id,name,pic_square,type from profile WHERE id="+globalData[i].actor_id+"OR id="+globalData[i].target_id;
				else
					var query = "SELECT id,name,pic_square,type from profile WHERE id="+globalData[i].actor_id;
				
				Titanium.Facebook.request('fql.query', {query: query},  function(r)
				{
					if (!r.success) 
					{	
						if (r.error) 
							alert(r.error);
						else 
							alert("call was unsuccessful");
					}
					else
					{	
						//parse and save the result of the query to result
						var result = JSON.parse(r.result);
						
						var infoView = Titanium.UI.createView({layout: 'horizontal'});
						//create an imageView using the result	
						var userImageView  = Titanium.UI.createImageView({
							image	: result[0].pic_square,
							top		: 10,
							left	: 10,
							width	: 50,
							height	: 50
						});
						
						//if someone has posted this message in another person or group's wall then
						//show both the names else normally show the owner's name of this post
						var userLabel = Ti.UI.createLabel({
							font	: {fontSize:16, fontWeight:'bold'},
							left	: 70,
							top		: (result[1]!=null)?5:10,
							layout	: 'horizontal',
							height	: 'auto',
							width	: 'auto',
							color	: '#576996',
							text	: (result[1]!=null)?result[0].name+'>'+result[1].name:result[0].name
						});
						
						//add eventlistener to userlabel 
						userLabel.addEventListener('click',function(e)
						{
							labelClicked = true;	
							
							//if the type of the poster is user then open the profile of the user
							if(result[0].type == "user")
								facebook.ui.tabGroup.activeTab.open(facebook.profile.createWindow(result[0].id));
						});
						infoView.add(userLabel);
						
						infoView.addEventListener('click',function(e){
							Ti.API.info('row clicked');
						});
						//find the index of the user id from result in the 
						//tableView and save it to findIndex
						var findIndex = uid.indexOf(result[0].id);
						var count = findIndex;
						
						//create a loop starting from the current row until the end of rows
						while(count<globalData.length)
						{
							//if the user id of the current result matches the row and
							//also used field of that row is 0 meaning view2 of this row does
							//not contain the user imageView and userLabel then add those
							if(row[count].id == result[0].id && row[count].used==0)
							{
								
								
								if(globalData[count].description!=null)
								{	
									var storyText = globalData[count].description;
									storyText = storyText.substr(userLabel.text.length,storyText.length);
									var storyLabel = Ti.UI.createLabel({
										font	: {fontSize:12},
										left	: 80,
										top		: 30,
										height	: 'auto',
										width	: 'auto',
										color	: '#000',
										text	: storyText
									});
									
									view2[count].add(storyLabel);
								}
								//add userImageView and UserLabel to view2
								view2[count].add(userImageView);
								view2[count].add(userLabel);
								
								//set the used field of the row to 1 to indicate this row
								//contains an imageView and userLabel
								row[count].used=1;
								break;
							}
							count++;
						}
					}
				});
				
				//create and add the messageLabel to the row 
				var messageLabel = Ti.UI.createLabel({
					font	: {fontSize:13},
					left	: 72,
					top		: 0,
					bottom	: 5,
					right	: 20,
					height 	: 'auto',
					color	: '#222',
					text	: globalData[i].message
				});	
				row[i].add(messageLabel);
				
				//if current data contains any meadia
				if(globalData[i].attachment.media != null && globalData[i].attachment.media[0]!= null)
				{	
					//then create a view
					var view = Titanium.UI.createView({
						top		: 0,
						bottom	: 5,
						height	: "auto"
					});
					
					//create a imageView using the media
					var imageView = Ti.UI.createImageView({
						image	: globalData[i].attachment.media[0].src,
						left	: 62,
						width	: 65,
						height	: 65
					});
					view.add(imageView);
					
					//create & add the attachment name label
					var attachmentNameLabel = Ti.UI.createLabel(
					{
						font	: {fontSize:12},
						top		: 0,
						left	: 130,
						height	: 'auto',
						color	: '#222',
						text	: globalData[i].attachment.name	
					});
					view.add(attachmentNameLabel);
					
					//if attachmentName label is less than 50 character then add attachment description
					if(globalData[i].attachment.name.length<=50)
					{	
						var descriptionLabel =Ti.UI.createLabel(
						{
							font	: {fontSize:10},
							top		: 25,
							height	: "auto",
							left	: 130,
							height	: 'auto',
							color	: '#222',
							text	: globalData[i].attachment.description	
						});
						view.add(descriptionLabel);
					}
					//add the view to row
					row[i].add(view);
				}	
				//append the tableView row
				tableView.appendRow(row[i]);	
				i++;
			}
			//create a new row containing the older posts button
			row[i] = Titanium.UI.createTableViewRow();
			
			olderButton.title="Older Posts";
			row[i].add(olderButton);
			tableView.appendRow(row[i]);
		}
		//call this function to execute the query to get the newsfeed or wall posts
		function getPosts()
		{
			//if this window is for newsfeed then execute the following query
			if(value=="News Feed")
				var query = "SELECT post_id, actor_id, target_id, attachment, message,description FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') LIMIT "+tableUpdateIndex+","+limit;
		  	
		  	//if this window is for any user's wall then execute the following query
			else
				var query = "SELECT post_id, actor_id, attachment, message, description  FROM stream WHERE source_id="+value.uid+" limit "+tableUpdateIndex+","+limit;
			
			Titanium.Facebook.request('fql.query', {query: query},  function(r)
			{
				//if something went wrong then execute this
				if (!r.success) 
				{	
					if (r.error) 
						alert(r.error);
					else 
						alert("call was unsuccessful");
				}
				else
				{	
					//parse the result and save it
					data = JSON.parse(r.result);
					
					//call create post function to create all the posts in data
					createPost(data);
				}
			});
		}
		//initially call this function to load 1st 10 posts
		getPosts();
		
		tableView.addEventListener('click',function(e)
		{
			//if the post has href then open the url in a new window
			if(globalData[e.index].attachment.href!=null && labelClicked==false)
				facebook.ui.tabGroup.activeTab.open(facebook.newsFeed.createWebView(globalData[e.index].attachment.href));
			
			else if(labelClicked==true)
				labelClicked = false;
		});
		
		//add the tableView to window
		win.add(tableView);
		
		return win;
	}
	
	//open the webUrl in a webView and return the window
	facebook.newsFeed.createWebView = function(webUrl)
	{
		var win = Titanium.UI.createWindow({
			navBarHidden	: false,
			backgroundColor	: 'fff',
			barColor		: '#444',
			backButtonTitle	: 'Back'
		});
		var webView = Titanium.UI.createWebView({
			url	: webUrl
		});
		
		win.add(webView);
		return win;
	}
})();
