var InfoWindow = (function(){
	var InfoWindow = Ti.UI.createWindow({ 
			title           : "Info",
			navBarHidden    : false,
			backgroundColor : "#cbd2d8",
			layout          : "vertical"
		}),
		infoTable,
		versionLabel;

	InfoWindow.addEventListener(
		"focus",
		function(e){
			infoTable = buildInfoTable();
			versionLabel = getVersionLabel();

			infoTable.addEventListener( "click", function(e){ launchInfoWebView(e.index) } );

			InfoWindow.add(infoTable);
			InfoWindow.add(versionLabel);
		}
	);

	InfoWindow.addEventListener(
		"blur",
		function(e){
			// release info table for garbage collection
			// delay 500ms to allow window transition
			setTimeout(
				function(){
					InfoWindow.remove(infoTable);
					InfoWindow.remove(versionLabel);
					infoTable = null;
					versionLabel = null;
				},
				300
			);
			
		}
	);

	/*
	 * Create an info table
	 * 
	 * @return {Object} returns a Ti table object
	 */
	function getTable(){
		return Ti.UI.createTableView({
			top             : 20,
			borderRadius    : 6,
			borderWidth     : 1,
			borderColor     : "#ababab",
			scrollable      : false,
			width           : 300,
			backgroundColor : "#fff"
		});
	}

	/*
	 * Create an info table row
	 * 
	 * @param {String} text: the text label for the row
	 * @return {Object} returns a Ti table row object
	 */
	function getRow(text){
		return Ti.UI.createTableViewRow({
			height   : 44,
			hasChild : true,
			width    : 300,
			title    : text
		});
	}

	/*
	 * Create info table
	 * 
	 * @return {Object} returns info table object
	 */
	function buildInfoTable(){
		var arrLength   = config.INFO_SCREENS.length,
			table       = getTable(),
			rows        = [],
			tableHeight = arrLength * 44;

		for(var i=0; i<arrLength; i++){
			rows.push( getRow(config.INFO_SCREENS[i].TITLE) );
		}
		
		table.height = tableHeight;
		table.setData(rows);

		return table;
	}

	/*
	 * Create version label
	 */
	function getVersionLabel(){
		return Ti.UI.createLabel({
			text         : "Version " + Ti.App.version,
			top          : 20,
			height       : 20,
			width        : 320,
			color        : "#666",
			textAlign    : "center",
			shadowColor  : "#fff",
			shadowOffset : { x : 1, y : 1 },
			font         : { fontSize : 16 }
		});
	}

	/*
	 * Launch info screen webview
	 *
	 * @param {Number} index: the table row index
	 */
	function launchInfoWebView(index){
		Store.activeTab.open(
			createWebViewWindow(
				config.INFO_SCREENS[index].TITLE,
				config.INFO_SCREENS[index].URL
			)
		);
	}

	return InfoWindow;
})();