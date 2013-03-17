var createWebView = function(url, title) {
    var Window = Ti.UI.createWindow({
            navBarHidden: false,
            barColor: skin.WEBVIEW_BAR_COLOR,
            barImage: skin.WEBVIEW_BAR_IMAGE,
            layout: "vertical",
            title: title
        }),
        web = Ti.UI.createWebView({
            visible: false,
            height: 370,
            width: 320,
            url: url
        });

    Window.add(web);
    web.show();

    return Window;
};