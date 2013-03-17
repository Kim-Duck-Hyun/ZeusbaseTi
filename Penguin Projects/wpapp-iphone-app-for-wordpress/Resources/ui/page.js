var winPages = (function() {
    var l_pages_available = L('pages_available');

    var Window = Ti.UI.createWindow({
        navBarHidden: false,
        titleid: 'pages',
        barColor: skin.PAGES_BAR_COLOR,
        barImage: skin.PAGES_BAR_IMAGE
    });

    var tableview = Titanium.UI.createTableView({
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: 0,
        height: 320
    });

    var events = {
        "SHOW_PAGE": "winPages : SHOW_PAGE"
    };

    var pages = pages_list.pages;
    var data = [];
    
    data[0] = Ti.UI.createTableViewSection({
        headerTitle: l_pages_available
    });

    for (var i = 0; i < pages.length; i++) {
        if (pages[i].image == null) {
            pages[i].image = config.DEFAULT_PAGES_IMAGE;
        }

        if (i % 2) {
            bgcolor = skin.PAGES_TV_BGCOLOR;
        }
        else {
            bgcolor = skin.PAGES_TV_BGCOLOR_ALT;
        }

        var title = pages[i].label;
        var slug = pages[i].slug;

        data[0].add(createPageRow(title, pages[i].image, slug));
    }

    tableview.setData(data);

    Window.add(tableview);

    Window.addEventListener(
    events.SHOW_PAGE, function(e) {
        Window.tabGroup.activeTab.open(createPageDetail(e.title, e.slug), {
            animated: true
        });
    });

    function createPageRow(title, image, slug) {
        var row = Ti.UI.createTableViewRow({
                title: title,
                leftImage: pages[i].image,
                backgroundColor: bgcolor,
                color: skin.PAGES_TV_TITLE_COLOR
            });

        row.addEventListener("click", function(e) {
            Window.fireEvent(
            Window.events.SHOW_PAGE, {
                "title": title,
                "slug": slug
            });
        });

        return row;
    }

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

    Window.events = events;

    return Window;
})();