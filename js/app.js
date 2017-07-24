(function() {
	/**
	 * Back key event handler
	 */
	window.addEventListener('tizenhwkey', function(ev) {
		if (ev.keyName === "back") {
			var activePopup = document.querySelector('.ui-popup-active'),
				page = document.getElementsByClassName('ui-page-active')[0],
				pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());

(function(tau) {
	/**
	 * elPage - Grid view page element
	 * elGrid - Grid view element
	 * modeBtn - Mode toggle button element
	 * gridList - TAU grid view instance
	 */
	var elPage = document.getElementById("grid-page"),
		elGrid = document.getElementById("gridview"),
		modeBtn = document.getElementById("modeBtn"),
		gridList, meme_list;

	/**
	 * Toggles reorder/edit mode
	 */
	function modeHandler() {
		if (gridList.options.reorder === true) {
			gridList.option("reorder", false);
			modeBtn.textContent = "Edit";
		} else {
			gridList.option("reorder", true);
			modeBtn.textContent = "Done";
		}
	}
	
	function show_meme(){
		$.getJSON("https://api.imgflip.com/get_memes", function(response) { 
	    	meme_list = response.data.memes;
	    	console.log(meme_list)
	    	
	    	var str_grid="";
	    	
	    	for(var i=0;i<meme_list.length;++i){
	    		str_grid+="<li class='ui-gridview-item'>"
					+ "<img class='ui-gridview-image' src='"+meme_list[i].url+"'>"
					+ "<p class='ui-gridview-label'>Outer Label</p>"
					+ "<div class='ui-gridview-handler'></div></li>";
	    	}
	    	
	    	elGrid.innerHTML=str_grid;
	    });
	}

	/**
	 * pageshow event handler
	 * Do preparatory works and adds event listeners
	 */
	elPage.addEventListener("pageshow", function() {
		gridList = tau.widget.GridView(elGrid);
		
		show_meme();
//		modeBtn.addEventListener("click", modeHandler);
	});

	/**
	 * pagebeforehide event handler
	 * Destroys and removes event listeners
	 */
	elPage.addEventListener("pagebeforehide", function() {
		modeBtn.removeEventListener("click", modeHandler);
	});
}(window.tau));