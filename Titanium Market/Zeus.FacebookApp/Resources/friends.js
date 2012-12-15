(function(){
	
	facebook.friends = {};
	
	//this function create a window containing all of your friends
	facebook.friends.createWindow = function(){
		
		var win = Titanium.UI.createWindow({
			title			: "My Friends",
			navBarHidden	: false,
			backgroundColor	: "#fff",
			backButtonTitle	: 'Back',
			barColor		: '#444'
		});
		
		//create a search bar
		var search = Titanium.UI.createSearchBar({
			barColor:'#385292',
			showCancel:false,
			height:43,
			top:0
		});
		
		search.addEventListener('change', function(e)
		{
			e.value; // search string as user types
		});
		search.addEventListener('return', function(e)
		{
			search.blur();
		});
		search.addEventListener('cancel', function(e)
		{
			search.blur();
		});
		
		var result=[];
		var tableView = Ti.UI.createTableView({minRowHeight:60,search:search});

		//add a click listener to tableview 
		tableView.addEventListener('click',function(e)
		{
			//open the profile of the clicked user
			facebook.ui.tabGroup.activeTab.open(facebook.profile.createWindow(e.rowData.uid));
		});
		
		//add the tableView to window
		win.add(tableView);
			
		function friends()
		{
			//query to view all friends with their statuses and ordering by status time
			var query = "SELECT uid, name, pic_square FROM user ";
			query +=  "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Titanium.Facebook.uid + ")";
			query += "order by name asc";
				
			//send the request to fetch information about friends	
			Titanium.Facebook.request('fql.query', {query: query},  function(r)
			{
				if (!r.success) 
				{
					if (r.error) {
						alert(r.error);
					} else {
						alert("call was unsuccessful");
					}
				}
				
				//parse the result from request and save it
				result = JSON.parse(r.result);
				
				//call the showFriends function to show friends
				showFriends();
			});
		}
		
		
		//this function shows all the friends found by calling friends() function
		function showFriends()
		{
			//create and append all the rows containing friends' profile image & name
			for (var c=0;c<result.length;c++)
			{
				//save the current friend info in row variable
				var row = result[c];
				
				var tvRow = Ti.UI.createTableViewRow({
					hasChild				: true,
					height					: 'auto',
					selectedBackgroundColor	: '#fff',
					title					: row.name,
					backgroundColor			: (c%2==0)?'#ddd':'#eee',
					color					: (c%2==0)?'#ddd':'#eee'
				});
				
				//craete the imageView of the current friend
				var imageView = Ti.UI.createImageView({
					image	: row.pic_square,
					top		: 5,
					left	: 10,
					width	: 50,
					height	: 50
				});
				tvRow.add(imageView);
		
				//create the name label
				var userLabel = Ti.UI.createLabel({
					
					font	: {fontSize:16, fontWeight:'bold'},
					left	: 70,
					top		: 20,
					right	: 5,
					height	: 20,
					color	: '#576996',
					text	: row.name
				});
				tvRow.add(userLabel);
				
				//save the id of the current user in the current row
				tvRow.uid = row.uid;
				tableView.appendRow(tvRow);
			}
		}
		//call friends() function to find all the friends
		friends();
		
		return win;	
	}
})();
