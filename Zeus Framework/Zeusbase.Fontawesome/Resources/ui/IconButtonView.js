
var icons = require('/ui/icons');

// IconView Component Constructor
function IconButtonView(bgclr, fgclr) {

	// Container
	var self = Ti.UI.createView({
		color: fgclr,
		backgroundColor: bgclr	
	});

	
	(function(){
		self.add(
			Ti.UI.createButton( {
				title: icons.apple_logo,
				font: {fontFamily: 'AppIcons', fontSize:'24pt' },
				color: 'purple',
				width: '50%',
				center: {x:'50%', y:'20%'},
				backgroundColor: 'transparent'
			})	
		);
	})();
	
	// Button with Icon
	(function(){
		self.add(
			Ti.UI.createButton( {
				title: icons.envelope + ' Contact',
				font: {fontFamily: 'AppIcons', fontSize:'14pt' },
				color: 'black',
				width: '50%',
				center: {x:'50%', y:'40%'}
			})	
		);
	})();

	// Button is Icon
	(function(){
		self.add(
			Ti.UI.createLabel( {
				text: icons.rss,
				font: {fontFamily: 'AppIcons', fontSize:'72pt' },
				color: '#eee',
				center: {x:'50%', y:'70%'}
			})
		);
	})();
	
	// Button is Icon
	(function(){
		self.add(
			Ti.UI.createLabel( {
				text: icons.twitter,
				font: {fontFamily: 'AppIcons', fontSize:'36pt' },
				color: '#004080',
				center: {x:'50%', y:'85%'}
			})
		);
	})();
	
	return self;	
}

module.exports = IconButtonView;
