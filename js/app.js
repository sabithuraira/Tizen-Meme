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
	var  elPage = document.getElementById("list-styles-page"),
		list_view = document.getElementById("list-id"), 
		meme_list;
	
	function show_meme(){
		$.getJSON("https://api.imgflip.com/get_memes", function(response) {
	    	meme_list = response.data.memes;
	    	
	    	var str_list="";
	    	for(var i=0;i<meme_list.length;++i){
	    		str_list+='<li class="ui-li-static li-has-thumb"><img src="'+meme_list[i].url+'" class="li-thumb" />'+meme_list[i].name+'</li>';
//			</li>meme_list[i].url+"'><div class='ui-gridview-handler'></div></li>";
//	    		var item = document.createElement('li');
//	            item.setAttribute('class','ui-li-static li-has-thumb"');
//	            item.innerHTML = '<img src="'+ meme_list[i].url +'" alt="icon" class="li-thumb">'+meme_list[i].name;
//	    		list_view.addItem(item, 1);
	    	}
	    	
	    	list_view.innerHTML=str_list;
	    });
	}
	
	elPage.addEventListener("pageshow", function() {
		show_meme();
	});

	/**
	 * pagebeforehide event handler
	 * Destroys and removes event listeners
	 */
	elPage.addEventListener("pagebeforehide", function() {
//		modeBtn.removeEventListener("click", modeHandler);
	});
}(window.tau));