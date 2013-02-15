
var icons = require('/ui/icons');

// IconView Component Constructor
function AllIconView(bgclr, fgclr) {

	// Container
	var self = Ti.UI.createView({
		backgroundColor: bgclr,
		layout:'vertical',
	});

	// Header
	var hdrView = Ti.UI.createView({
		backgroundColor: bgclr,
		width:'100%',
		height:'50dp'
	});
	self.add(hdrView);

	var hdr = Ti.UI.createLabel( {
		text: 'All Icons',
		color: fgclr,
		font: {fontFamily:'Helvetica', fontSize:'20pt'},
		center: {x: '50%', y: '50%'}
	});
	hdrView.add(hdr);

	// Divisor
	var hd = Ti.UI.createView({
		backgroundColor: fgclr,
		width:'100%',
		height:'1dp',
		top: '2dp'
	});
	self.add(hd);

	// Icons
	var icnView = Ti.UI.createTextArea ({
		font: {fontFamily: 'AppIcons', fontSize:'20pt' },
		color: fgclr,
		backgroundColor: bgclr,
		editable: false,
		top:'4dp',
		value: ''
	});
	self.add(icnView);

	for (var i in icons) {
		if (icons[i].length===1) {		// To filter non icon class attributes for iOS
			icnView.value += icons[i] + ' ';
		}
	}

	return self;	
}

module.exports = AllIconView;
