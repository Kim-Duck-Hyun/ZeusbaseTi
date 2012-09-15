// This is a test harness for your module
// You should do something interesting in this harness
// to test out the module and to provide instructions
// to users on how to use it by example.

// open a single window
var tabGroup = Titanium.UI.createTabGroup();
var rootwin = Ti.UI.createWindow({
	title : "Sample Report",
	backgroundColor : 'gray',
	tabBarHidden : true,
	barColor : "#000"
});

var tab1 = Titanium.UI.createTab({
	icon : '',
	title : '',
	window : rootwin
});

// TODO: write your module tests here
var createpdf = require('inic.createPDF');

//Name of pdf file to be generated.
var pdfname = "IndiaNIC.pdf";

/******
 Background image of the pdf file to be generated. Preferable Dimension are 320X480 and 640X960 for iPhone, 768X1024 for iPad 
 For ex.
 Case 1 :	Local Image (Note: Need to be put in Resource Directory in your Ti Project)
 				var pdfbgimg = "pdfbg.png";
				
 Case 2 :	Remote Image
 				var pdfbgimg = "http://www.domainname.com/bgimage.jpg";
 *******/

var pdfbgimg = "pdfbg.png";


//PDF dimensions such as width, height it's default margin.
var pdfbgsize="{\"width\":768,\"height\":1024, \"topmargin\":80,\"bottommargin\":80,\"leftmargin\":0,\"rightmargin\":0}";

Ti.API.info("module is => " + createpdf);

var pdfdataobj = [{"tableheader": [{"cell": [{"type": "text","title": "Company Name:","style": {"left": 10,"width": 150,"height": 30,"font": {"fontSize": 18,"fontWeight": "bold","color":"#2d2d2d"}}},{"type": "text","title": "IndiaNIC Infotech PVT. LTD","style": {"left": 165,"width": 300,"height": 30,"font": {"fontSize": 18,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "text","title": "Address:","style": {"left": 10,"width": 150,"height": 30,"font": {"fontSize": 18,"fontWeight": "bold","color":"#2d2d2d"}}},{"type": "text","title": "701, B-wing, Gopal Palace,Opp Ocean Park,Nehru Nagar,Ahmedabad","style": {"left": 165,"width": 593,"height": 30,"font": {"fontSize": 18,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "text","title": "Total Employee:","style": {"left": 10,"width": 150,"height": 30,"font": {"fontSize": 18,"fontWeight": "bold","color":"#2d2d2d"}}},{"type": "text","title": "350","style": {"left": 165,"width": 300,"height": 30,"font": {"fontSize": 18,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "text","title": "Employee Details :","style": {"left": 10,"width": 300,"height": 30,"font": {"fontSize": 18,"fontWeight": "bold","color":"#2d2d2d"}}}]}],"title": "Table","value": "","headerrow": {"cell": [{"type":"text","title": "Profile PIC","style": {"left": 10,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "bold","color":"#2d2d2d"}}},{"type":"text","title": "Name","style": {"left": 195,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "bold","color":"#2d2d2d"}}},{"type":"text","title": "Designation","style": {"left": 355,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "bold","color":"#2d2d2d"}}},{"type":"text","title": "Department","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "bold","color":"#2d2d2d"}}}]},"row": [{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "John Duglas\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Project Manager\n(PMO)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "think-mobile-light-bulb-lg.png","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Mike Vasselss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Resource Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "abc.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "James Morris\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "http://animal.discovery.com/invertebrates/butterfly/pictures/butterfly-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Carla Denniss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Lead\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Cris Birrels\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Developer\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "http://animal.discovery.com/mammals/cheetah/pictures/cheetah-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "John Duglas\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Project Manager\n(PMO)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "http://ra-re.org/wp-content/uploads/2012/04/tiger-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Mike Vasselss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Resource Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "James Morris\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Carla Denniss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Lead\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Cris Birrels\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Developer\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "John Duglas\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Project Manager\n(PMO)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Mike Vasselss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Resource Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "James Morris\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Carla Denniss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Lead\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Cris Birrels\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Developer\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "John Duglas\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Project Manager\n(PMO)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Mike Vasselss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Resource Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "James Morris\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Carla Denniss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Lead\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Cris Birrels\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Developer\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "John Duglas\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Project Manager\n(PMO)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Mike Vasselss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Resource Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "James Morris\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Manager\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Carla Denniss\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Tech Lead\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]},{"cell": [{"type": "image","image": "peacock-picture.jpg","style": {"width": 80,"height": 102,"left": 10}},{"type": "text","title": "Cris Birrels\nUnited States","style": {"left": 195,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "Developer\n(RMG)","style": {"left": 355,"width": 160,"height": 60,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}},{"type": "text","title": "iPhone Development","style": {"left": 515,"width": 160,"height": 30,"font": {"fontSize": 16,"fontWeight": "normal","color":"#4b4b4b"}}}]}]}];

var pdfdata = JSON.stringify(pdfdataobj);

var view = createpdf.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	backgroundColor : 'transparent'
});
var container_scroll = Ti.UI.createScrollView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	contentWidth : "auto",
	contentHeight : "auto"
});
var page1 = Ti.UI.createImageView({
	image : ((Titanium.Platform.osname=="iphone")?"page1.png":"page1_ipad.png"),
	width : ((Titanium.Platform.osname=="iphone")?320:768),
	height : ((Titanium.Platform.osname=="iphone")?427:1024),
	borderColor:"gray",
	top : 0
});
container_scroll.add(page1);

var page2 = Ti.UI.createImageView({
	image : ((Titanium.Platform.osname=="iphone")?"page2.png":"page2_ipad.png"),
	width : ((Titanium.Platform.osname=="iphone")?320:768),
	height : ((Titanium.Platform.osname=="iphone")?427:1024),
	borderColor:"gray",
	top : ((Titanium.Platform.osname=="iphone")?430:1027),
});
container_scroll.add(page2);
var page3 = Ti.UI.createImageView({
	image : ((Titanium.Platform.osname=="iphone")?"page3.png":"page3_ipad.png"),
	width : ((Titanium.Platform.osname=="iphone")?320:768),
	height : ((Titanium.Platform.osname=="iphone")?427:1024),
	borderColor:"gray",
	top : ((Titanium.Platform.osname=="iphone")?860:2054),
});
container_scroll.add(page3);
view.add(container_scroll);
var pdf = Ti.UI.createButton({
	title : "Create PDF",
	width : 80,
	height : 32
});
pdf.addEventListener("click", function(e) {
	var dfobj = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, pdfname);
	if(dfobj.exists()) {
		dfobj.deleteFile();
	}

	view.createPDF(pdfname, pdfbgimg, pdfdata,pdfbgsize);
	var fobj = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pdfname);

	while(!fobj.exists()) {

	}
	var successalert = Ti.UI.createAlertDialog({
		title : "PDF",
		message : "PDF created successfully and saved at application data directory.",
		buttonNames : ["View", "Cancel"],
		cancel : 1
	});
	successalert.addEventListener("click", function(e) {
		if(e.index == 0) {
			var webwindow = Ti.UI.createWindow({
				title : "Preview PDF",
				modal : true,
				barColor : "#000"
			});
			var close = Ti.UI.createButton({
				title : "Close",
				width : 50,
				height : 30
			});
			close.addEventListener("click", function(e) {
				webwindow.close();
			});
			webwindow.rightNavButton = close;

			var webview = Ti.UI.createWebView({
				url : fobj.nativePath,
				left : 0,
				right : 0,
				top : 0,
				bottom : 0
			});
			webwindow.add(webview);
			webwindow.open();
		}
	});
	successalert.show();
});
rootwin.rightNavButton = pdf;


rootwin.add(view);
tabGroup.addTab(tab1);
tabGroup.open();