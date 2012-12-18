function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId2 = A$(Ti.UI.createWindow({
        backgroundColor: "#ccc",
        title: "Alarm",
        id: "__alloyId2"
    }), "Window", null);
    $.__views.__alloyId3 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 50,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Alarm",
        id: "__alloyId3"
    }), "Label", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId1 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Alarm",
        icon: "alarm@2x.png",
        id: "__alloyId1"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId1);
    $.__views.__alloyId5 = A$(Ti.UI.createWindow({
        backgroundColor: "#ccc",
        title: "Settings",
        id: "__alloyId5"
    }), "Window", null);
    $.__views.__alloyId6 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 50,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Settings View",
        id: "__alloyId6"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId4 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Settings",
        icon: "cog_01@2x.png",
        id: "__alloyId4"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.__alloyId8 = A$(Ti.UI.createWindow({
        backgroundColor: "#ccc",
        title: "Web",
        id: "__alloyId8"
    }), "Window", null);
    $.__views.__alloyId9 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 50,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Web View",
        id: "__alloyId9"
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId7 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Web",
        icon: "globe@2x.png",
        id: "__alloyId7"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId7);
    $.__views.__alloyId11 = A$(Ti.UI.createWindow({
        backgroundColor: "#ccc",
        title: "Home",
        id: "__alloyId11"
    }), "Window", null);
    $.__views.__alloyId12 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 50,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Home Screen View",
        id: "__alloyId12"
    }), "Label", $.__views.__alloyId11);
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId10 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Home",
        icon: "house@2x.png",
        id: "__alloyId10"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId10);
    $.__views.__alloyId14 = A$(Ti.UI.createWindow({
        backgroundColor: "#ccc",
        title: "Desktop",
        id: "__alloyId14"
    }), "Window", null);
    $.__views.__alloyId15 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 50,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Desktop",
        id: "__alloyId15"
    }), "Label", $.__views.__alloyId14);
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId13 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId14,
        title: "Desktop",
        icon: "monitor@2x.png",
        id: "__alloyId13"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId13);
    $.addTopLevelView($.__views.index);
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;