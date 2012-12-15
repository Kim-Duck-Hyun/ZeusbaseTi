//Wrap all code in a self-calling function to protect the global namespace
(function(){
	
	//Create sub-namespace
	facebook.ui = {};
	
	//this function creates the tabgroup necessary for this application
	facebook.ui.createTabGroup = function(){
		
		facebook.ui.tabGroup = Titanium.UI.createTabGroup();
		
		//call the facebook.dashView.createWindow() function to get the starting window
		var dashViewWindow = facebook.dashView.createWindow();
		
		//create the only tab needed for this application
		facebook.ui.onlyTab = Titanium.UI.createTab({
			title:"",
			window:dashViewWindow
		});
		
		//add the tab to tabgroup
		facebook.ui.tabGroup.addTab(facebook.ui.onlyTab);
		
		//return the tab group
		return facebook.ui.tabGroup;
	}
})();
