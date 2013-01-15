
var icons = require('/ui/icons');

// IconView Component Constructor
function IconListView(bgclr, fgclr) {

	// Container
	var self = Ti.UI.createTableView({
		color: fgclr,
		backgroundColor: bgclr,
		minRowHeight:'18pt'
	});

	// Search Bar
	var search = Titanium.UI.createSearchBar({
	    barColor:bgclr, 
	    showCancel:false,
	    top:0,
	    height:'50dp'
	});
	self.search = search;

	// Table Rows
	var rows=[];
	rows.push(Ti.UI.createTableViewRow({}));		// Create a blank row for spacing
	for (var i in icons) {
		if (icons[i].length===1) {		// To filter non icon class attributes for iOS
			var row = Ti.UI.createTableViewRow({
				font: {fontFamily: 'AppIcons', fontSize:'14pt' },
				color: fgclr,
				backgroundColor: bgclr,
				className: 'row',
				left: 12,
				title: icons[i] + ' ' + i
			});
			rows.push (row);
		}
	}
	self.setData(rows);

	return self;	
}

module.exports = IconListView;
