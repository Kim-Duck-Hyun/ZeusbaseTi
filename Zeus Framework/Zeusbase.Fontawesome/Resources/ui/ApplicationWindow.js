//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var AllIconView  = require('/ui/AllIconView'),
		IconButtonView = require('/ui/IconButtonView'),
		IconListView = require('/ui/IconListView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#fff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI

	self.add (
		Ti.UI.createScrollableView({
			views: [
					new AllIconView ('#fff', '#000'),
					new AllIconView ('#eee', '#800'),
					new IconListView('#fff', '#333'),
					new IconButtonView('#fff', '#333')
					],
			pagingControlColor: '#333',
			scrollingEnabled: true,
			showPagingControl: true,
			top:4,
			bottom:0
		})
	);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
