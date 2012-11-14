function create_admob(win) {
  var ad;
	var ad_top, ad_left, ad_height, ad_width;
	
	if (Titanium.Platform.displayCaps.platformHeight==xscreen.iphoneh) {
		ad_top = Titanium.Platform.displayCaps.platformHeight-110-config.ADMOB_IPHONE_HEIGHT;
		ad_left = 0;
		ad_height = config.ADMOB_IPHONE_HEIGHT;
		ad_width = config.ADMOB_IPHONE_WIDTH;
	}
	else {
		ad_top = Titanium.Platform.displayCaps.platformHeight-110-config.ADMOB_IPAD_HEIGHT; 
		ad_left = (Titanium.Platform.displayCaps.platformWidth-config.ADMOB_IPAD_WIDTH)/2;
    ad_height = config.ADMOB_IPAD_HEIGHT;
    ad_width = config.ADMOB_IPAD_WIDTH;
	}
	
  ad = Admob.createView({
      top: ad_top, left: ad_left,
      width: ad_width, height: ad_height,
      publisherId: config.ADMOB_PUBLISHER_ID, // You can get your own at http: //www.admob.com/
      adBackgroundColor: config.ADMOB_BGCOLOR,
      testing: config.ADMOB_TESTING,
      dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
      gender: 'male',
      keywords: ''
  });

  win.add(ad);  
}
