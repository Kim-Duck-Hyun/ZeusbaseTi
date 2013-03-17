var APP_KEY = config.URBAN_AIRSHIP_APP_KEY;
var APP_SECRET = config.URBAN_AIRSHIP_MASTER_SECRET; 
 
Titanium.Network.registerForPushNotifications({
    types:[
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success: successCallback,
    error: errorCallback,
    callback: messageCallback
});

function successCallback(e) {
    var request = Titanium.Network.createHTTPClient({
        onload:function(e) {
            if (request.status != 200 && request.status != 201) {
                request.onerror(e);
                return;
            }
        },
        onerror:function(e) {
            Ti.API.info("Register with Urban Airship Push Service failed. Error: "
                + e.error);
        }
    });
 
    // Register device token with UA
    request.open('PUT', 'https://go.urbanairship.com/api/device_tokens/'
        + e.deviceToken, true);
    request.setRequestHeader('Authorization','Basic '  +
        Titanium.Utils.base64encode(APP_KEY + ':' + APP_SECRET));
    request.send();
}

function errorCallback(e) {
    Ti.API.info("Error during registration: " + e.error);
}

function messageCallback(e) {
     var message;
     if(e['aps'] != undefined) {
          if(e['aps']['alert'] != undefined){
               if(e['aps']['alert']['body'] != undefined){
                    message = e['aps']['alert']['body'];
               } else {
                    message = e['aps']['alert'];
               }
          } else {
               message = 'No Alert content';
          }
     } else {
          message = 'No APS content';
     }
     // alert(message);
}
