var winCateg = (function() {
    var Window = Ti.UI.createWindow({
            navBarHidden: false,
            titleid: 'categ_categories',
            barColor: skin.CATEG_BAR_COLOR,
            barImage: skin.CATEG_BAR_IMAGE,
            backgroundColor: skin.CATEG_DASHBOARD_BGCOLOR
        });

    var categ = categ_list.categs;
    var data = [];

    for (var i = 0; i < categ.length; i++) {
        var item = Titanium.UI.createDashboardItem({
            image: categ[i].icon_off,
            selectedImage: categ[i].icon_on,
            label: categ[i].label,
            slug: categ[i].slug,
            json_url: config.BLOG_URL + "?json=get_category_posts&count=" + config.JSON_POST_COUNT + "&apikey=" + config.JSON_API_KEY + "&slug=" + categ[i].slug
        });

        data.push(item);
    }

    var dashboard = Titanium.UI.createDashboardView({
        data: data,
        top: 0,
        height: 350,
        canDelete: false
    });

    Window.add(dashboard);
    dashboard.stopEditing();

    var cancel = Titanium.UI.createButton({
        backgroundColor: skin.CATEG_BAR_COLOR,
        systemButton: Titanium.UI.iPhone.SystemButton.DONE
    });

    cancel.addEventListener('click', function() {
        dashboard.stopEditing();
    });

    dashboard.addEventListener('edit', function() {
        Window.rightNavButton = cancel;
    });

    dashboard.addEventListener('commit', function() {
        Window.rightNavButton = null;
    });

    dashboard.addEventListener('dragStart', function(e) {
        Window.rightNavButton = null;
    });

    dashboard.addEventListener('dragEnd', function(e) {
        Window.rightNavButton = cancel;
    });

    dashboard.addEventListener('click', function(e) {
        winCategBlogList = createBlogPostList(e.item.json_url, e.item.label, e.item.slug);
        Window.tabGroup.activeTab.open(winCategBlogList, { animated: true });
    });

    var ad;

    ad = Admob.createView({
        top: 320,
        left: 0,
        width: 320,
        height: 50,
        publisherId: config.ADMOB_PUBLISHER_ID,
        adBackgroundColor: config.ADMOB_BGCOLOR,
        testing: config.ADMOB_TESTING,
        dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
        gender: config.ADMOB_GENDER,
        keywords: config.ADMOB_KEYWORD
    });

    Window.add(ad);

    return Window;
})();