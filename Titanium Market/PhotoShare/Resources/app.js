// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Ti.include('birdhouse.js');

//this variable will hold our image data blob from the device's gallery
var selectedImage = null;

var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundImage: 'images/background.jpg'
});

var label = Titanium.UI.createLabel({
    width:  280,
    height: 'auto',
    top: 20,
    left: 20,
    color: '#fff',
    font: {fontSize: 18, fontFamily: 'Helvetica', fontWeight: 'bold'},
    text: 'Photo Share: \nEmail, Facebook & Twitter'
});
win1.add(label);

var imageThumbnail = Titanium.UI.createImageView({
    width: 100,
    height: 120,
    left: 20,
    top: 90,
    backgroundColor: '#000',
    borderSize: 10,
    borderColor: '#fff'
});
win1.add(imageThumbnail);

var buttonSelectImage = Titanium.UI.createButton({
    width:  100,
    height:  30,
    top: 220,
    left: 20,
    title: 'Choose'
});
buttonSelectImage.addEventListener('click',function(e){
    //obtain an image from the gallery
     Titanium.Media.openPhotoGallery({

        success:function(event)
        {
            selectedImage = event.media;
                    
            // set image view
            Ti.API.debug('Our type was: '+event.mediaType);
            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
            {
               imageThumbnail.image = selectedImage;
            }		
        },
        cancel:function()
        {
            //user cancelled the action fron within
            //the photo gallery
        }
    });
});
win1.add(buttonSelectImage);

var txtTitle = Titanium.UI.createTextField({
    width: 160,
    height: 35,
    left: 140,
    top: 90,
    value: 'Message title...',
    borderStyle: 2,
    backgroundColor: '#fff'
});
win1.add(txtTitle);

var txtMessage = Titanium.UI.createTextArea({
    width: 160,
    height: 120,
    left: 140,
    top: 130,
    value: 'Message text...',
    font: {fontSize: 15},
    borderStyle: 2,
    backgroundColor: '#fff'
});
win1.add(txtMessage);


//create your email
function postToEmail() {
    var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'attachments');
    if (!newDir.exists()) {
        newDir.createDirectory();
    }
    
    //write out the image file to the attachments directory with the same name every time
    writeFile = Titanium.Filesystem.getFile(newDir.nativePath, 'temp-image.png');
    writeFile.write(selectedImage);        
    Ti.API.info(writeFile.nativePath);

    var emailDialog = Titanium.UI.createEmailDialog();
    emailDialog.subject = txtTitle.value;
    emailDialog.toRecipients = ['info@packtpub.com'];
    emailDialog.messageBody = txtMessage.value;
    
    //add an image via attaching the image blob
    emailDialog.addAttachment(writeFile);
    
    emailDialog.open();
}

var buttonEmail = Titanium.UI.createButton({
    width:  280,
    height:  35,
    top: 280,
    left: 20,
    title: 'Send Via Email'
});
buttonEmail.addEventListener('click', function(e){
 if(selectedImage != null) {
    postToEmail();
 } else {
    alert('You must select an image first!');
 }
});
win1.add(buttonEmail);




//create your facebook session and post to fb 
function postToFacebook() {   
	//if the user is not logged in, do so, else post to wall 
	if(Titanium.Facebook.loggedIn == false) {
		Titanium.Facebook.appid = '252235321506456';
		Titanium.Facebook.permissions = ['publish_stream'];
		
		// Permissions your app needs
		Titanium.Facebook.addEventListener('login', function(e) {
			if(e.success) {
				alert('You are now logged in!');
			} else if(e.error) {
				alert('Error: ' + e.error);
			} else if(e.cancelled) {
				alert('You cancelled the login');
			}
		});
		
		//call the facebook authorize method to login
		Titanium.Facebook.authorize();
	} 
	else {
		// Now post the photo after you've confirmed that we have an access token
		var data = {
			caption : 'I am posting a photo to my facebook page!',
			picture : selectedImage
		};
		
		Titanium.Facebook.requestWithGraphPath('me/photos', data, "POST", function(e) {
			 if (e.success) {
				 alert( "Success! Your image has been posted to your Facebook wall.");
				 Ti.API.info("Success! The image you posted has the new ID: " + e.result);				    	
			 } 
			 else {
				 alert('Your image could not be posted to Facebook at this time. Try again later.');
				 Ti.API.error(e.error);
			 }
		});
	} //end if else loggedIn
}

var buttonFacebook = Titanium.UI.createButton({
    width:  280,
    height:  35,
    top: 330,
    left: 20,
    title: 'Send Via Facebook'
});
buttonFacebook.addEventListener('click', function(e){
 if(selectedImage != null) {
    postToFacebook();
 } else {
    alert('You must select an image first!');
 }
});
win1.add(buttonFacebook);

function randomString(length,current){
 current = current ? current : '';
 return length ? randomString( --length , "abcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}

//create your twitter session and post a tweet
function postToTwitter()
{
   var BH = new BirdHouse({
    consumer_key: "yxtRWc0nleEhK6LEjKeA",
    consumer_secret: "TexiTVRzgH5orMrOzjQD51IL2TWLI2f04nKKe1QM"
   });
   
   if(!BH.authorized){
      BH.authorize();
   }
   else
   {
      //create the httpRequest
      var xhr = Titanium.Network.createHTTPClient();
      
      //open the httpRequest
      xhr.open('POST','http://boydlee.com/upload.php');
 
      xhr.onload = function(response) {
          //the image upload method has finished
          if(this.responseText != '0')
          { 
            var imageURL = this.responseText;
            //alert('Your image was uploaded to ' + imageURL);
            
            //now we have an imageURL we can post a tweet
            //using birdhouse!
            Ti.API.info('Posting: ' + txtMessage.value + ' ' + this.responseText);
            BH.tweet(txtMessage.value + ' ' + this.responseText, 
            function(){
		          alertDialog = Ti.UI.createAlertDialog({
	                 message:'Tweet posted!'
	              });
                  
	 	          alertDialog.show();
            });
          } 
          else 
          {
            alert('The upload did not work! Check your PHP server settings.');
          }
      };
      
      // send the data
      var r = randomString(5) + '.jpg';
      xhr.send({'media': selectedImage, 'randomFilename': r});
   }
}

var buttonTwitter = Titanium.UI.createButton({
    width:  280,
    height:  35,
    top: 375,
    left: 20,
    title: 'Send Via Twitter'
});
buttonTwitter.addEventListener('click', function(e){
 if(selectedImage != null) {
    postToTwitter();
 } else {
    alert('You must select an image first!');
 }
});
win1.add(buttonTwitter);




win1.open();