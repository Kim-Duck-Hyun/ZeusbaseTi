var etc = {

	/*
	 * Check of string is a url
	 * 
	 * @param {String} str: the url string to validate
	 */
	"isURL" : function(str){
		if(typeof str!=="string"){ return false; }
		return (/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/).test(str);
	},

	/*
	 * Handle error messaging. Defaults to developer error messages if type isn't specified
	 * 
	 * @param {String} msg: the message description to display
	 * @param {String} type: the type of error. determines how to display message
	 */
	"error" : function (msg, type){
		$.error(msg);
		if(type && type==="user"){
			alert(msg);
		}
		return false;
	},

	/*
	 * Fetch data from the interwebs using HTTP Get
	 * 
	 * @param {String} url: the url to fetch data from
	 * @param {Function} callback: the callback function used when data is returned
	 * @event 
	 */
	"fetch" : function (url, callback){
		var httpc     = $.createHTTP(),
			sendCount = 0,
			defaults  = {
				timeout  : 5000,
				type     : "GET",
				attempts : 3
			};

		etc.fetch.events = {
			"FETCH_FAILED"  : "NETWORK:FETCH_FAILED",
			"FETCH_SUCCESS" : "NETWORK:FETCH_SUCCESS"
		};

		httpc.setTimeout(defaults.timeout);

		httpc.onerror = function(e){
			if(sendCount>defaults.attempts){
				$.fireEvent(
					fetch.events.FETCH_FAILED,
					{
						"id"    : url,
						"event" : e
					}
				);
			}
		};

		httpc.onload  = function(evt){
			var json;

			try{ json = JSON.parse(httpc.responseText); }
			catch(e){ return $.error("etc.fetch: Invalid JSON from server"); }

			$.fireEvent(
				etc.fetch.events.FETCH_SUCCESS,
				{
					"event" : evt,
					"id"    : url,
					"json"  : json
				}
			);
			callback(json);
		};

        function send(){
        	sendCount++;
            var poll = function(e){
                	if(e.online){
						httpc.readyState=0;
						httpc.open(defaults.type, url);
						httpc.outgoing = true;
						httpc.send();            
                	}
            	},
            	giveup = function(){
					Ti.Network.removeEventListener("change", poll);
                	if(!httpc.outgoing){
						httpc.abort();
						httpc.onerror();                        
                	}
            	};

            setTimeout(giveup,1000);
			Ti.Network.addEventListener( "change", poll );
			httpc.readyState=0;
			httpc.open(defaults.type, url);
			httpc.outgoing = true;
			httpc.send();
        };

		send();
	}
};
