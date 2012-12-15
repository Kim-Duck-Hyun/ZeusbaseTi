(function(){
	
	facebook.profile = {};
	
	//this function creates a window containing profile of a specified user
	facebook.profile.createWindow = function(data){
		
		var win = Titanium.UI.createWindow({
			title			: "Profile",
			backgroundColor	: '#fff',
			navBarHidden	: false,
			backButtonTitle	: 'Back',
			barColor		: '#444'
	
		});
		
		//create a tableView
		var tableView = Titanium.UI.createTableView({minRowHieght:120});
		var row = [];
		var i=0;
		
		function showProfile()
		{
			//create and execute a query to get the basic information of a user
			var query = "SELECT name, uid,pic,about_me,current_location,birthday_date,sex FROM user ";
			query +=  "where uid ="+data;
			Titanium.Facebook.request('fql.query', {query: query},  function(r)
			{
				if (!r.success) {
					if (r.error) {
						alert(r.error);
					} else {
						alert("call was unsuccessful");
					}
					return;
				}
				var result = JSON.parse(r.result);
				
				row[0] = Titanium.UI.createTableViewRow({layout:'horizontal',height:'auto'});

				//create rows for name & image,current location,sex,birthdate,about me labels 
				//and add them to table rows
				var nameLabel = Titanium.UI.createLabel({
					text	: result[0].name,
					top		: 30,
					left	: 5,
					height	: 'auto',
					width	: 'auto',
					color	: '#576996',
					font	: { fontSize: 18, fontWeight: 'bold' }
					
				});
				var imageView = Titanium.UI.createImageView({
					image	: result[0].pic,
					top		: 5,
					left	: 5,
					height	: 120,
					width	: 100
				});
				row[0].add(imageView);
				row[0].add(nameLabel);
				tableView.appendRow(row[0]);
				
				var locationLabel = Titanium.UI.createLabel({
					text	: (result[0].current_location==null)?null:"Location: "+result[0].current_location.name,
					left	: 5,
					height	: 'auto',
					width	: 'auto',
					color	: '#000',
					font	: { fontSize: 15}
					
				});
				if(result[0].current_location != null){
					i++;
					row[i] = Titanium.UI.createTableViewRow();
					row[i].add(locationLabel);
					tableView.appendRow(row[i]);
				}
				
				var sexLabel = Titanium.UI.createLabel({
					text	:(result[0].sex=="male")?"Sex: Male":"Sex: Female",
					left	: 5,
					height	: 'auto',
					width	: 'auto',
					color	: '#000',
					font	: { fontSize: 15 }
				});
				i++;
				row[i] = Titanium.UI.createTableViewRow();
				row[i].add(sexLabel);
				tableView.appendRow(row[i]);
				
				var birthdayLabel = Titanium.UI.createLabel({
					text	: (result[0].birthday_date!=null)?"Birthday: "+result[0].birthday_date:null,
					left	: 5,
					height	: 'auto',
					width	: 'auto',
					color	: '#000',
					font	: { fontSize: 15}
				});
				
				//if birthday date is not available
				if(result[0].birthday_date!=null)
				{
					i++;
					row[i] = Titanium.UI.createTableViewRow();
					row[i].add(birthdayLabel);
					tableView.appendRow(row[i]);
				}
					
				var aboutmeLabel = Titanium.UI.createLabel({
					text	: (result[0].about_me==null)?null:"About Me: "+result[0].about_me,
					top		: 10,
					bottom	: 10,
					left	: 5,
					height	: 'auto',
					color	: '#000',
					font	: { fontSize: 15 }
				});
				
				//if about me text is not avaiable
				if(result[0].about_me!=null)
				{
					i++;
					row[i] = Titanium.UI.createTableViewRow({height:"auto"});
					row[i].add(aboutmeLabel);
					tableView.appendRow(row[i]);
				}
				
				//create a label named photo and add it to table
				var photoLabel = Titanium.UI.createLabel({
					text	: "View Photos",
					top		: 10,
					height	: 'auto',
					width	: 'auto',
					color	: '#385292',
					font	: { fontSize: 15, fontWeight: 'bold' }
				});
				i++;
				row[i] = Titanium.UI.createTableViewRow({backgroundColor:"#ccc"});
				row[i].add(photoLabel);
				row[i].label="photo"
				tableView.appendRow(row[i]);
				
				//create a label named wall and add it to table
				var wallLabel = Titanium.UI.createLabel({
					text	: "View Wall",
					height	: 'auto',
					width	: 'auto',
					color	: '#385292',
					font	: { fontSize: 15, fontWeight: 'bold' }
				});
				i++;
				row[i] = Titanium.UI.createTableViewRow({backgroundColor:"ccc"});
				row[i].add(wallLabel);
				row[i].label="wall";
				tableView.appendRow(row[i]);
				
				//add click listener to the table
				tableView.addEventListener('click',function(e)
				{
					//open the wall of the user in a new window
					if(e.rowData.label=="wall")
						facebook.ui.tabGroup.activeTab.open(facebook.newsFeed.createWindow(result[0]));
					
					//show all the albums of that user in a new window
					else if(e.rowData.label=="photo")
						facebook.ui.tabGroup.activeTab.open(facebook.album.createWindow(data));
				});
				
				//add the tableview to window
				win.add(tableView);
			});
		}
		
		//call the show profile function to show the user profile
		showProfile();
		return win;
	}
})();
