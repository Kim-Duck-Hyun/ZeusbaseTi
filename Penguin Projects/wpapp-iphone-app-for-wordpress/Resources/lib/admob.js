function create_admob(win) {
  var ad;

  ad = Admob.createView({
      top: 0, left: 0,
      width: 320, height: 50,
      publisherId: config.ADMOB_PUBLISHER_ID, // You can get your own at http: //www.admob.com/
      adBackgroundColor: config.ADMOB_BGCOLOR,
      testing: config.ADMOB_TESTING,
      dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
      gender: 'male',
      keywords: ''
  });

  win.add(ad);  
}
