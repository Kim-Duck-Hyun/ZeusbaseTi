(function(){
	
	facebook.thread = {};
	
	//this function creates a window containg all the messages of a thread that is between two users
	facebook.thread.createWindow = function(thread_id,recipients)
	{
		var win=Titanium.UI.createWindow({
			title			:  "Messages",
			backgroundColor	: '#fff',
			backButtonTitle	: 'Back',
			barColor		: '#444'
		});
		var tv = Titanium.UI.createTableView({minRowHeight:60});
		var data = [];
		var recipentsData =[];
		var i = 0;
		var currentMessageIndex = 0;
		var limit = 30;
		var olderButton = Titanium.UI.createButton({
			title:"Older Messages"
		});
		
		olderButton.addEventListener('click',function(e)
		{
			//change the title from Older Posts to Loading... and update the 
			//currentMessageIndex to be used in the next query
			olderButton.title = "Loading...";
			currentMessageIndex=currentMessageIndex+limit;
			getMessages();
		});
		
		//this function appends all the messages in this thread to the tableView
		function createMessages()
		{
			//delete the extra row that contains the older post button
			if(i!=0)
				tv.deleteRow(i);
			
			var checkLength=0;
			
			//append rows till  data Length value and scrollLength has to be less than 
			//data that is total messages recieved from sending query
			for(;checkLength< data.length;i++)
			{
				//create a row for each message
				var row = Titanium.UI.createTableViewRow({
					height					: 'auto',
					backgroundColor			: (i%2==0)?'#eee':'#ddd'
				});	
				
				//create messageLabel for the message body
				var messageLabel = Titanium.UI.createLabel({
					text	: data[checkLength].body,
					font	: {fontSize:12},
					left	: 70,
					top		: 45,
					bottom	: 5,
					right	: 20,
					height	: 'auto',
					color	: '#222'
								
				});				
				row.add(messageLabel);
				
				//create the imageView of the user of this message
				var imageView  = Titanium.UI.createImageView({
					image	: (recipentsData[0].uid==data[checkLength].author_id)?recipentsData[0].pic_small:recipentsData[1].pic_small,
					left	: 10,
					width	: 50,
					height	: 50
				});			
				row.add(imageView);
				
				//name of the user of this message
				var nameLabel = Titanium.UI.createLabel({
					text	: (recipentsData[0].uid==data[checkLength].author_id)?recipentsData[0].name:recipentsData[1].name,
					font	: {fontSize:16, fontWeight:'bold'},
					left	: 70,
					top		: 5,
					right	: 5,
					height	: 20,
					color	: '#576996',
				});
				row.add(nameLabel);
				
				//convert the unix time into normal time formal
				var time = facebook.thread.convertUnixTime(data[checkLength].created_time);
				
				var timeLabel = Titanium.UI.createLabel({
					text	: time,
					font	: {fontSize:10 },
					left	: 70,
					top		: 30,
					height	: 10,
					color	: '#222',
				});
				row.add(timeLabel);
				
				//append the row
				tv.appendRow(row);
				checkLength++;
			}
			
			if(data.length==30)
			{
				//append an extra row showing Older Messages button
				var row=Titanium.UI.createTableViewRow({
					font	: {fontSize:15}
				});
				olderButton.title= "Older Messages"
				row.add(olderButton);
				
				tv.appendRow(row);
			}
			//automatically scroll two row when news rows have finished apending
			tv.scrollToIndex(currentMessageIndex+2);	
		}
		
		//write the query to fetch user information of the recipients of this message
		var query = "select uid,name,pic_small from user where uid="
		for(i=0;i<recipients.length;i++)
			query+= recipients[i]+" or uid=";
		
		query=query.substr(0,query.length-7);
		
		i=0;
		function findRecipents()
		{
			Titanium.Facebook.request('fql.query', {query:query},  function(r)
			{
				if (!r.success) 
				{	
					if (r.error) 
						alert(r.error);
					else 
						alert("call was unsuccessful");
					return;
				}
				else
				{	
					//parse and save the result from executing the query
					recipentsData = JSON.parse(r.result);
					createMessages();
				}
			});
		}
		
		function getMessages()
		{
			//write and execute the query to find information about  all the messages of current thread
			var query1 = "SELECT author_id, body, created_time, attachment FROM message WHERE thread_id = "+thread_id+" order by created_time desc limit "+currentMessageIndex+","+limit;
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
					
					//if this is the 1st time then find the recipients of this thread
					if(i==0) 
						findRecipents();
					
					//else start adding new messages to the table
					else 
						createMessages();
				}
			});
		}
		
		//initially call this function to get the 1st 30 messages of this thread
		getMessages();
		win.add(tv);
		
		return win;
	}
	
	//convert the unix time and return the converted time
	facebook.thread.convertUnixTime = function(unix)
	{
		 var a = new Date(unix*1000);
		 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		 var year = a.getFullYear();
		 var month = months[a.getMonth()];
	     var date = a.getDate();
	     var hour = a.getHours();
	     var min = a.getMinutes();
	     var sec = a.getSeconds();
	     var time = date+','+month+' '+year+' at '+hour+':'+min+':'+sec ;
	     return time;
  	}
})();
