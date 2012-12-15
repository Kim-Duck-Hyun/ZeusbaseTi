(function(){
	
	facebook.status = {};
	
	//this function creates a window to allow user to post a status
	facebook.status.createWindow = function(){
		
		var win = Titanium.UI.createWindow({
			title			: "Give Status",
			backgroundColor	: '#eee',
			navBarHidden	: false,
			layout			: 'vertical',
			barColor		: '#444'
		});
		
		//create an image view 
		var imageView = Ti.UI.createImageView({
			image		: facebook.userPhoto,
			top			: 5,
			left		: 10,
			width		: 80,
			height		: 80,
			top			: 0 ,
			borderWidth	: 4,
			borderColor	: '#888'
		});
				
		//add the imageView to window	
		win.add(imageView);
		
		function showRequestResult(e)
		{
			var s = '';
			//show a message if succesfully published 
			if (e.success) 
			{
				s = "SUCCESS";
				if (e.result) {
					s = "Status Successfully Posted on Your Wall";
				}
				if (e.data) {
					s += "; " + e.data;
				}
				if (!e.result && !e.data) {
					s = '"success", but no data from FB.  I am guessing you cancelled the dialog.';
				}
			} 
			
			//show a message if cancelled
			else if (e.cancelled)
			 {
				s = "CANCELLED";
			}
			
			//show a error if failed 
			else 
			{
				s = "FAIL";
				if (e.error) {
					s += "; " + e.error;
				}
			}
			//show the message
			alert(s);
		}
		
		//create a text field
		var statusText = Ti.UI.createTextArea({
			top				: 10, 
			left			: 5,  
			right			: 5,
			height			: 100,
			font			: {fontSize:14},
			value			: "What's on your mind...",
			backgroundColor	: "#fff",
			borderColor		: "999"
		});
		
		
		statusText.addEventListener('focus',function(e)
		{
			if(statusText.value=="What's on your mind...")
				statusText.value="";
		});
		
		//add the text field to the window
		win.add(statusText);
		
		//create a status button
		var statusBtn = Ti.UI.createButton({
			title	: 'Share',
			top		: 10, 
			left	: 5,
			right	: 5, 
			height	: 30
		});
		
		//add click event listener to the button to post the status
		statusBtn.addEventListener('click', function() 
		{
			Titanium.Facebook.requestWithGraphPath('me/feed', {message: statusText.value}, "POST", showRequestResult);
			statusText.value="What's on your mind...";
		});
		
		//add the button to the window
		win.add(statusBtn);
		
		return win;
	}
	
})();
