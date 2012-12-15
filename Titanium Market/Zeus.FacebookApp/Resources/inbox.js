(function(){

	facebook.inbox = {};
	
	//this function creates a window containing all the threads that is inbox messages
	facebook.inbox.createWindow = function(){
		
		var win = Titanium.UI.createWindow({
			title			: "Messages",
			navBarHidden	: false,
			backgroundColor : 'fff',
			backButtonTitle	: 'Back',
			barColor		: '#444'
		});
		var tv 				= Titanium.UI.createTableView({minRowHeight:60});
		var row 			= [];
		var k				= 0;
		var data 		   	= [];
		var id 				= [];
		var currentIndex=0;
		var limit=20;
		var olderButton = Titanium.UI.createButton({
			title:"Older Messages"
		});
		
		olderButton.addEventListener('click',function(e)
		{
			//change the title from Older Posts to Loading... and update the 
			//currentIndex to be used in the next query
			olderButton.title = "Loading...";
			currentIndex=currentIndex+limit;
			showMore();
		});
		
		//this functions appends messages found from querying thread table
		function createInbox()
		{
			var checkLength=0;
			
			//if this is not the 1st time this function is called then delete the last
			//row from previous call that is delete the "Older Messages" row
			if(k!=0)
				tv.deleteRow(k);
			
			//update the table if no of new rows is less than currently available data
			//feched from the querying inbox messages in thread table
			for(;checkLength< data.length;checkLength++)
			{
				//if this thread contains two recipients then create a new row for this thread
				if(data[checkLength].recipients.length == 2)
				{
					//save the id of the friend not of the user himself
					id[k] = data[checkLength].recipients[0]==Titanium.Facebook.uid ? data[checkLength].recipients[1]:data[checkLength].recipients[0];
					
					//create the row
					row[k] = Titanium.UI.createTableViewRow({
						height					: 'auto',
						selectedBackgroundColor	: '#576996',
						backgroundColor			: (k%2==0)?'#eee':'#ddd'
					});
					
					//create the snippetLabel
					var snippetLabel = Titanium.UI.createLabel({
						text	: data[checkLength].snippet,
						font	: {fontSize:12},
						left	: 70,
						top		: 45,
						bottom	: 10,
						right	: 20,
						height	: 'auto',
						color	: '#222'
					});
					row[k].add(snippetLabel);
					
					//convert the unix time and save it to time
					var time = facebook.thread.convertUnixTime(data[checkLength].updated_time);
					
					//create a label showing the time and add it to row
					var timeLabel = Titanium.UI.createLabel({
						text	: time,
						font	: {fontSize:10 },
						left	: 70,
						top		: 30,
						height	: 10,
						color	:'#222',
					});
					row[k].add(timeLabel);
					
					//save the thread_id and recipients in the row
					row[k].thread_id = data[checkLength].thread_id;
					row[k].recipients = data[checkLength].recipients;
						
					//send a request to fetch the information of the friend from the current_thread		
					Titanium.Facebook.request('fql.query', {query:"select name,pic_small,uid from user where uid="+id[k]},  function(r)
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
							//parse and save the result from the request
							var result = JSON.parse(r.result);
							
							//create a image view showing the frind's profile photo
							var imageView  = Titanium.UI.createImageView
							({
								image	: result[0].pic_small,
								left	: 10,
								width	: 50,
								height	: 50
							});
							row[id.indexOf(result[0].uid)].add(imageView);
							
							var nameLabel = Titanium.UI.createLabel
							({
								text	: result[0].name,
								font	: {fontSize:16, fontWeight:'bold'},
								left	: 70,
								top		: 3,
								right	: 5,
								height	: 20,
								color	: '#576996',
							});
							row[id.indexOf(result[0].uid)].add(nameLabel);
						}
					});
					
					//append the row in tha table view
					tv.appendRow(row[k]);	 
					k++;
				}
			}
			
			if(data.length==20)
			{
				//at last append a row showing Older Messages Button
				row[k] = Titanium.UI.createTableViewRow();
				olderButton.title= "Older Messages"
				row[k].add(olderButton);
				tv.appendRow(row[k]);
			}
			
			//automatically scroll 2 rows 
			tv.scrollToIndex(currentIndex+2);	
		}
		
		function showMore()
		{
			//create and execute query to fetch information about the specified amount of threads
			var query1="select snippet,recipients,snippet_author,thread_id,updated_time from thread where folder_id=0 LIMIT "+currentIndex+","+limit;
			Titanium.Facebook.request('fql.query', {query:query1},  function(r)
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
					data = JSON.parse(r.result);
					
					//call the createInbox function to show the inbox
					createInbox();
				}
			});
		}	
		
		//add a click event listener to the tableview
		tv.addEventListener('click',function(e)
		{
			//open the clicked thread in a new window to show all messages of that thread
			facebook.ui.tabGroup.activeTab.open(facebook.thread.createWindow(row[e.index].thread_id,row[e.index].recipients));
		});
		
		showMore();
		win.add(tv);
		
		return win;	
	}
})();