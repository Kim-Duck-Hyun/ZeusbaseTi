var info = Titanium.API.info;

function niceTime(time)
{
	var s = Math.floor(time / 1000);
	var hs = Math.round((time - (s * 1000)) / 10);
	if (hs < 10)
	{
		hs = "0" + hs;
	}
	return "0" + s + ":" + hs;
}
function gV(str)
{
	return Titanium.App.Properties.getString(str, null);	
}
function sV(str, val)
{
	Titanium.App.Properties.setString(str, val);	
}
function showNotification(text, duration, position)
{
    var messageWin = null;
    var messageView = null;
    var messageLabel = null;
    if (position == 'middle')
    {
        messageWin = Titanium.UI.createWindow({
            height: 150,
            width: 220,
            top: 140,
            borderRadius: 10,
            touchEnabled: false
        });
        messageView = Titanium.UI.createView({
            height: 150,
            width: 220,
            borderRadius: 10,
            backgroundColor: '#000',
            opacity: 0.85,
            touchEnabled: false
        });
        messageLabel = Titanium.UI.createLabel({
            text: text,
            color:'#fff',
            width: 200,
            height:'auto',
            font: {
                fontSize: 16
            },
            textAlign:'center'
        });
    }
    else
    {
        messageWin = Titanium.UI.createWindow({
            height: 30,
            width: 220,
            bottom: 60,
            borderRadius: 10,
            touchEnabled: false
        });
        messageView = Titanium.UI.createView({
            height: 30,
            width: 220,
            borderRadius: 10,
            backgroundColor: '#000',
            opacity: 0.85,
            touchEnabled: false
        });
        messageLabel = Titanium.UI.createLabel({
            text: text,
            color:'#fff',
            width: 200,
            height:'auto',
            font:{
                fontSize: 16
            },
            textAlign:'center'
        });
    }
    messageWin.add(messageView);
    messageWin.add(messageLabel);
    messageWin.open();
    var timeout = setTimeout(function(){ messageWin.close({ opacity: 0, duration: 500 }); }, duration);
    return {handler: timeout, window: messageWin};
}
