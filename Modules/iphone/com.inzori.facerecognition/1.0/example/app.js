var faceRecognition = require('com.inzori.facerecognition');
Ti.API.info("module is => " + faceRecognition);

var isRetina = Ti.Platform.displayCaps.density=="high" ? true: false;

// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'black'
});

// Default image size
var pic_w = 320;
var pic_h = 480;

// slower but more effective
var highAccuracy = true;

// place imageView
var iv = Ti.UI.createImageView({top:0,left:0,height:pic_h,width:pic_w,image:'group.png'});
win.add(iv);
var lastPicture = 0;

var imageOriginalBlob = iv.toImage(); 
iv.setImage(imageOriginalBlob);

// view to place above iv
var detectionView = Ti.UI.createView({top:0,left:0,height:pic_h,width:pic_w});
iv.add(detectionView);

/////////////////////////////////////////////////////////////////////////////////////
var btnChangePic = Ti.UI.createButton({
	bottom: 5,
	right:5,
	height: 30,
	width: 60,
	title: 'Change'
});
btnChangePic.addEventListener('click',function(){
	// Remove squares	
	iv.remove(detectionView);
	detectionView = Ti.UI.createView({top:0,left:0,height:pic_h,width:pic_w});
	iv.add(detectionView);
	
	var picName = 'group.png';
	if (lastPicture==0){
		picName = 'oneface.png';
		lastPicture = 1;
	}else if(lastPicture==1){
		picName = 'sample.png';
		lastPicture = 2;
	}else{
		picName = 'group.png';
		lastPicture = 0;
	}
	iv.setImage(picName);
	imageOriginalBlob = iv.toImage(); 
});	
win.add(btnChangePic);

var switchLabel = Ti.UI.createLabel({
	bottom:40,
	textAlign:'center',
	color:'#fff',
	height:12,
	font:{fontSize:12},
	text: 'High Accuracy'
});
var sw_highAccuracy = Ti.UI.createSwitch({bottom:5,value:highAccuracy});

	
sw_highAccuracy.addEventListener('change', function(e)
{
	highAccuracy = e.value;

});		
win.add(switchLabel);
win.add(sw_highAccuracy);

/////////////////////////////////////////////////////////////////////////////////////
var btnRecognize = Ti.UI.createButton({
	bottom: 5,
	left:5,
	height: 30,
	width: 60,
	title: 'Go!'
});
btnRecognize.addEventListener('click',function(){
	activityIndicator.show();
	
	// Remove squares	
	iv.remove(detectionView);
	detectionView = Ti.UI.createView({top:0,left:0,height:pic_h,width:pic_w});
	iv.add(detectionView);
	
	// blob, bool
	var faces = faceRecognition.faceRecognize(imageOriginalBlob, highAccuracy);	
	
	if (faces.length==0)
		alert('No faces detected');
		
		
		
	for (var i in faces){
		
		var fh = isRetina ? faces[i].faceHeight/2 : faces[i].faceHeight;
		var fw = isRetina ?	faces[i].faceWidth/2 : faces[i].faceWidth;
		var lx = isRetina ? faces[i].leftEyePositionX/2 : faces[i].leftEyePositionX;
		var ly = isRetina ? faces[i].leftEyePositionY/2 : faces[i].leftEyePositionY;
		var rx = isRetina ? faces[i].rightEyePositionX/2 : faces[i].rightEyePositionX;
		var ry = isRetina ? faces[i].rightEyePositionY/2 : faces[i].rightEyePositionY;
		var mx = isRetina ? faces[i].mouthPositionX/2 : faces[i].mouthPositionX;
		var my = isRetina ? faces[i].mouthPositionY/2 : faces[i].mouthPositionY;
		
		
		var f = {
			h: fh,
			w: fw,
			
			hasLeftEye: faces[i].hasLeftEyePosition,
			leftEye_x: lx,
			leftEye_y: ly,	// mac coord system differs from iOS, so invert y-axis
			
			hasRightEye: faces[i].hasRightEyePosition,
			rightEye_x: rx,
			rightEye_y: ry ,	// mac coord system differs from iOS, so invert y-axis
			
			hasMouth: faces[i].hasMouthPosition,
			mouth_x: mx,
			mouth_y: my 	// mac coord system differs from iOS, so invert y-axis
		}
		
		Ti.API.info('__ FACE # '+i+' ____________________________________________________')
		Ti.API.info('Face height-width: ' + f.h + ' - ' +f.w);
		
		if (f.hasLeftEye=='YES'){
			Ti.API.info('Left eye x-y: ' +f.leftEye_x + ' - ' + f.leftEye_y);
			place_square(f.leftEye_x,f.leftEye_y,'red');
		}
		if (f.hasRightEye=='YES'){
			Ti.API.info('Right eye x-y: ' +f.rightEye_x + ' - ' + f.rightEye_y );
			place_square(f.rightEye_x,f.rightEye_y,'green');
		}
		if (f.hasMouth=='YES'){
			Ti.API.info('Mouth x-y: ' +f.mouth_x + ' - ' + f.mouth_y);
			place_square(f.mouth_x,f.mouth_y,'yellow');
		}			
		
		place_square_face(f.leftEye_x,f.leftEye_y,f.h,f.w,'white');
		
		activityIndicator.hide();
		
	}


});
win.add(btnRecognize);
/////////////////////////////////////////////////////////////////////////////////////

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:18, fontWeight:'bold'},
  message: 'Please wait ...',
  style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,

  height:'auto',
  width:'auto'
});
win.add(activityIndicator);

win.open();


function place_square(x,y,color){
	
	var square = Ti.UI.createView({height:2,width:2,left:x,bottom:y,backgroundColor:color});
	detectionView.add(square);
}

function place_square_face(x,y,h,w,color){
	var newW = w*0.35;			//0.35 seems to be an empiric ratio
	newW = newW.toFixed(2);

	var newH = h*0.35;
	newH = newH.toFixed(2);
		
	var squareX = x*1 - newW*1;
	squareX = squareX.toFixed(2);
	
	var squareY = y*1 + newH*1 - h*1;
	squareY = squareY.toFixed(2);
	
	var square = Ti.UI.createView({height:h,width:w,left:squareX,bottom:squareY,borderColor:color,borderWidth:2});
	detectionView.add(square);	
}
