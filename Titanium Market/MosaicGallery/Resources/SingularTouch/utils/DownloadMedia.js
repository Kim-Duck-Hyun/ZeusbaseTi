
SingularTouch.Utils.mediaCachePath = 'st-media-cache';		// Local media cache path
SingularTouch.Utils.mediaCacheTime = 7 * 24 * 60 * 60;		// Cache time in seconds (7 days by default)

SingularTouch.Utils.urlInfo = function (_url)
{
    var e = /((http|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+\.[^#?\s]+)(#[\w\-]+)?/;

	if (_url.match(e))
	{
		return  {
			url: RegExp['$&'],
			protocol: RegExp.$2,
			host:RegExp.$3,
			path:RegExp.$4,
			file:RegExp.$6,
			hash:RegExp.$7
		};
    }
    else
    {
		return  {url:"", protocol:"", host:"", path:"", file:"", hash:""};
    }
};

SingularTouch.Utils.clearMediaCache = function (_clear_all)
{
	// Cache directory
	var dir = Ti.Filesystem.getFile('file:///sdcard/').exists()
	        ? Ti.Filesystem.getFile('file:///sdcard/', SingularTouch.Utils.mediaCachePath)
	        : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, SingularTouch.Utils.mediaCachePath);
	
	if (!dir.exists() && !dir.createDirectory())
	{
		Ti.API.error('SingularTouch.Utils.downloadMedia: error creating the media cache directory "' + dir.nativePath + '"');
		return false;
	}
	
	if (_clear_all)
	{
		dir.deleteDirectory(true);
		dir.createDirectory();
	}
	else
	{
		var unix_timestamp = Math.round(+new Date() / 1000);
		var files = dir.getDirectoryListing();
		
		for (var i = 0, len = files.length; i < len; i++)
		{
			var file = Ti.Filesystem.getFile(dir.nativePath, files[i]);
			
			if (file.exists())
			{		
				var file_timestamp = Math.round(+new Date(file.createTimestamp()) / 1000);
				
				if (file_timestamp + SingularTouch.Utils.mediaCacheTime < unix_timestamp)
				{
					file.deleteFile();
				}
			}
		}
	}
};

SingularTouch.Utils.downloadMedia = function (_args, _callback)
{
	if (!_args)
	{
		_args = {
			url: '',
			forceDownload: false
		};
	}
	
	// Cache directory
	var dir = Ti.Filesystem.getFile('file:///sdcard/').exists()
	        ? Ti.Filesystem.getFile('file:///sdcard/', SingularTouch.Utils.mediaCachePath)
	        : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, SingularTouch.Utils.mediaCachePath);
	
	if (!dir.exists() && !dir.createDirectory())
	{
		Ti.API.error('SingularTouch.Utils.downloadMedia: error creating the media cache directory "' + dir.nativePath + '"');
		return false;
	}
	
	if (!dir.spaceAvailable)
	{
		Ti.API.error('SingularTouch.Utils.downloadMedia: enough space not available at "' + dir.nativePath + '"');
		return false;
	}
	
	// File to download and cache
	var url_info = SingularTouch.Utils.urlInfo(_args.url);
	var extension = Ti.Filesystem.getFile(url_info.file).extension();

	var fileName = Ti.Utils.md5HexDigest(_args.url) + '.' + extension;

	var file = Ti.Filesystem.getFile('file:///sdcard/').exists()
	        ? Ti.Filesystem.getFile('file:///sdcard/', SingularTouch.Utils.mediaCachePath, fileName)
	        : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, SingularTouch.Utils.mediaCachePath, fileName);

	if (file.exists())
	{
		if (!_args.forceDownload)
		{
			var unix_timestamp = Math.round(+new Date() / 1000);
			var file_timestamp = Math.round(+new Date(file.createTimestamp()) / 1000);
			
			if (file_timestamp + SingularTouch.Utils.mediaCacheTime < unix_timestamp)
			{
				_args.forceDownload = true;
			}
		}
		
		// Local cache
		if (!_args.forceDownload)
		{
			_callback(file.nativePath);
			return true;
		}
		
		file.deleteFile();
	}
   
    // Check if is a valid URL if it need to be downloaded
	if (!Ti.Platform.canOpenURL(_args.url))
    {
    	_callback('');
    	return false;
    }
    
    var xmlHttpObj = Ti.Network.createHTTPClient({
        ondatastream: function(e) {},
        onreadystatechange: function()
        {
            if (xmlHttpObj.readyState == 4)
            {
                var buffer = Ti.createBuffer({ length: 4096 });
                var outstream = file.open(Titanium.Filesystem.MODE_WRITE);
                var instream = Ti.Stream.createStream({
                    mode: Ti.Stream.MODE_READ,
                    source: xmlHttpObj.responseData // a Blob
                });
                
                while (instream.read(buffer) > -1) {
                    outstream.write(buffer);
                }
                
                instream.close();
                outstream.close();

                _callback(file.nativePath);
            }
        }
    });
    
    xmlHttpObj.open('GET', _args.url);
    xmlHttpObj.setTimeout(20000);
    xmlHttpObj.send();
};