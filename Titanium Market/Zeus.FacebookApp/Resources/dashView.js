(function(){
	
	facebook.dashView ={};
	
	//this function creates the starting window
	facebook.dashView.createWindow = function(){
		
		//set the application id
		Titanium.Facebook.appid = facebook.appId;
	
		//name the facebook permissions you will require for this application
		Titanium.Facebook.permissions = facebook.permissions;
		
		//create a window with tabBar Hidden
		var win = Titanium.UI.createWindow({
			title			:"Facebook Application",
			backgroundColor	:'#333',
			tabBarHidden	:true,
			navBarHidden	:true,
			backgroundImage	:"images/bg.jpg"
		});
		
		var view;
		
		//create login Button
		var login = Titanium.Facebook.createLoginButton({
			top		: 320, 
			left	: 85,
			style	: 'wide',
			visible	: false
		});
		win.add(login);
		
		var titleLabel =Titanium.UI.createLabel({
			text	: "Facebook App",
			font	: {fontSize:35, fontWeight:'bold'},
			top		: 20,
			height	: 80,
			width   : 'auto',
			Color	: '#fff'
		});
		win.add(titleLabel);
		
		//if user is not logged into facebook then create the login button and show
		if(Titanium.Facebook.loggedIn==false)
			login.visible = "true";
		
		//function to load the startingView with functionalities
		function loadView()
		{
			//query to find the photo of the user
			var query = "SELECT pic_square FROM user ";
			query +=  "where uid =" + Titanium.Facebook.uid ;
			
			//send the request to fetch photo of the user
			Titanium.Facebook.request('fql.query', {query: query}, function(r)
			{
				var result = JSON.parse(r.result);
				facebook.userPhoto= result[0].pic_square;
			});
			
			//label of the different functionalities of this application
			var label = ["status", "newsfeed","friends","myprofile","inbox","album"];
			var iconLabel=["    Status","News Feed","My Friends","My Profile","    Inbox","My Albums"];
			var data =[];
			var len = label.length;
			var j=0;
			var topValue=25;
			var leftValue=10;
			view = Titanium.UI.createView({top:120});
			
			for(i=0;i<len;i++)
			{
				//change the login button to logout button
				login.visible=false;
				login.top =5;
				login.left=195;
				login.visible=true;
				
				//create  Item view for each functionality
				var itemView = Titanium.UI.createView({
					top				: topValue,
					height			: 80,
					width		    : 80,
					left			: leftValue,
					backgroundColor	: '#2e427a',
					borderRadius	: 15
				});
				
				//create the icon image
				var icon=Titanium.UI.createImageView({
					image	:"images/"+label[i]+".png",
					label	: label[i],
					top		: 8,
					height	: 50,
					width	: 50
				});
				itemView.add(icon);
				
				//name of this item's functionality
				var itemName = Titanium.UI.createLabel({
					font	: {fontSize:12, fontWeight:'bold'},
					top		: 60,
					left	: 10,
					right	: 5,
					color	: '#fff',	
					text	: iconLabel[i]
				});
				itemView.add(itemName);
				
				itemView.addEventListener('click',function(e)
				{
					//if status was clicked then open the window to post a status
					if(e.source.label=="status")
						facebook.ui.tabGroup.activeTab.open(facebook.status.createWindow());
					
					//if friends was clicked then open the window showing all friend
					else if(e.source.label=="friends")
						facebook.ui.tabGroup.activeTab.open(facebook.friends.createWindow());
				
					//if the NewsFeed was clicked then open the window Showing NewsFeed
					else if(e.source.label=="newsfeed")
						facebook.ui.tabGroup.activeTab.open(facebook.newsFeed.createWindow("News Feed"));
				
					//if album was clicked then show all the albums of the user
					else if(e.source.label=="album")
						facebook.ui.tabGroup.activeTab.open(facebook.album.createWindow(Titanium.Facebook.uid));
					
					//if myprofile was clicked then open the window showing user profile
					else if(e.source.label=="myprofile")
						facebook.ui.tabGroup.activeTab.open(facebook.profile.createWindow(Titanium.Facebook.uid));
					
					//if inbox was clicked then open the inbox of the user
					else if(e.source.label=="inbox")
						facebook.ui.tabGroup.activeTab.open(facebook.inbox.createWindow());	
				});
				leftValue+=100;
				
				//if this is the 3rd item then go to the next row by changing top value and leftvalue
				if(i==2)
				{
					topValue =180;
					leftValue=10; 
				}
				view.add(itemView);
			}
			win.add(view);
		}
		
		//if the user is already logged in then call the loadView() function
		if(Titanium.Facebook.loggedIn==true)
			loadView();
			
		//add a login listener to check whether the user is loggedIn 
		Titanium.Facebook.addEventListener('login',function()
		{
			//if the user has logged in for the first time call the loadView()
			if(Titanium.Facebook.loggedIn==true)
			{
				loadView();
				login.top =5;
				login.left=195;
				view.setVisible(true);
			}
		});
		
		//add a logout listener to check whether the user got loggedOut 
		Titanium.Facebook.addEventListener('logout',function()
		{
			//if the user has logged out then hide the itemsView and show the login button
			login.top=320;
			login.left=85;
			view.setVisible(false);
		});
		
		return win;
	}
})();
