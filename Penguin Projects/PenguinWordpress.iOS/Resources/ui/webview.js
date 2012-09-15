var createWebView = function(url, title) {
    var tb_height;

    if (Titanium.Platform.displayCaps.platformHeight==xscreen.iphoneh) {
      tb_height = Titanium.Platform.displayCaps.platformHeight-110-config.ADMOB_IPHONE_HEIGHT;
    }
    else {
      tb_height = Titanium.Platform.displayCaps.platformHeight-110-config.ADMOB_IPAD_HEIGHT;
    }

    var Window = Ti.UI.createWindow({
            navBarHidden: false,
            barColor: skin.WEBVIEW_BAR_COLOR,
            barImage: skin.WEBVIEW_BAR_IMAGE,
            title: title
        }),
        web = Ti.UI.createWebView({
            visible: false,
            top:0,
            height: tb_height,
            width: Titanium.Platform.displayCaps.platformWidth,
            url: url
        });

    Window.add(web);
    web.show();

    create_admob(Window);

    return Window;
};