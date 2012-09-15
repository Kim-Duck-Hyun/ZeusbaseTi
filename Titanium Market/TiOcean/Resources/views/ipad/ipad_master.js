var win = Ti.UI.currentWindow;

win.title = 'Master';

var tableWorkLog = Ti.UI.createTableView({
	style:Ti.UI.iPhone.TableViewStyle.PLAIN,
	separatorStyle:Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
	backgroundImage:''
});

tableWorkLog.addEventListener('click', function(evt) {
	Ti.API.log('Your implementation :)');
});

var data = [];

for(var idx=0; idx < 4; idx++) {
	var row = Ti.UI.createTableViewRow({
		height:80,
		hasChild:true,
		rightImage:'../../images/ipad-arrow.png',
		backgroundImage:'../../images/list-item-bg.png'
	});
	
	var imgFrame = Ti.UI.createImageView({
		left:10, top:10, width:60, height:60,
		image:'../../images/list-frame.png'		
	});
	row.add(imgFrame);
	
	var imgAvatar = Ti.UI.createImageView({
		left:15, top:15, width:50, height:50,
		image:'../../images/avatar1.png'		
	});
	row.add(imgAvatar);
	
	var lblTitle = Ti.UI.createLabel({
		left: 78, top:10, width:214, height:21,
		font:{fontSize:16, fontWeight:'bold'},
		text:'Lance Maeyer',
		textAlign:'left', color:'#094B7B',
		shadowColor:'white',shadowOffset:{x:0,y:1}
	});
	row.add(lblTitle);
	var lblDescription = Ti.UI.createLabel({
		left: 78, top:33, width:214, height:36,
		font:{fontSize:13},
		text:'Lolem ipsum dolor sit amet, sed do consetetur',
		textAlign:'left', color:'gray',
		shadowColor:'white',shadowOffset:{x:0,y:1}
	});
	row.add(lblDescription);
	
	data.push(row);
}
tableWorkLog.data = data;

win.add(tableWorkLog);