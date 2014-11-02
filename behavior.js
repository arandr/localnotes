
function removeClass(element, name){
	var classes = element.className.split(" ");
	if(classes.indexOf(name) != -1)
	{
    	classes.splice(classes.indexOf(name),1);
	    element.className = classes.join(" ");
	}
}

function addClass(element, name){
	var classes = element.className.split(" ");
	if(classes.indexOf(name) != -1) return;
	classes.push(name);
	element.className = classes.join(" ");
}

function sort(obj, sortFunction){
    sorted = [];
    for(key in obj){
		sorted.push(obj[key]);
	}
	sorted.sort(sortFunction);
	return sorted;
};

function autosave (area){
    if (area.hasDefault == true || area.domElement.value == "") return;
	var count = area.wordCount();
	document.getElementById("message").textContent = count + " word" +(count > 1? 's':'');
	document.getElementById("autosave").textContent = "Autosaved at "+new Date().toTimeString();
   area.makeSnippet().save();
}

function refreshHistory (history, area){
	var next = document.getElementById("history-next");
	document.getElementById("past").removeChild(next);
	var collection = document.getElementById("past").getElementsByTagName("p");
    for(var i = 0; i < collection.length;){
	    collection[i].parentNode.removeChild(collection[i]);
	}
	history.entries.forEach(function(snippet){
	    var text = document.createElement("p");
		text.textContent = snippet.shortContent();
		text.snippet = snippet;
		text.addEventListener("click",function(){
		    area.loadSnippet(this.snippet);
			var count = area.wordCount();
			document.getElementById("message").textContent = count + " word" +(count > 1? 's':'');
		});
		var text_delete = document.createElement("img");
		text_delete.src = "img/del.png";
		addClass(text_delete, "icon");
		text_delete.addEventListener("click", function(e){
			this.parentNode.snippet.remove();
			history.load(true);
			setTimeout(function(){refreshHistory(history,area);},0);
			e.stopPropagation();
		});
		text.appendChild(text_delete);
		document.getElementById("past").appendChild(text);
	});
	document.getElementById("past").appendChild(next);
}


window.onload = function(){
	document.getElementById("today").textContent = new Date().toLocaleDateString();
    var area = new WritingArea(document.getElementById('maintext'));
	area.domElement.addEventListener("keypress", function(e){
		if(area.hasDefault){
			area.hasDefault = false;
			area.clear();
			area.setPlaceholder(false);
		}
	});
	
	area.domElement.addEventListener("change", function(e){
			var count = area.wordCount();
			document.getElementById("message").textContent = count + " word" +(count > 1? 's':'')
	});
	
	document.getElementById('donewriting').addEventListener("click", function(){
	    var snip = area.makeSnippet();
		snip.save();
		area.clear();
		area.currentSnippet = null;
	    history.load(true);
		refreshHistory(history,area);
	});
	var history = new History();
	history.load();
	refreshHistory(history,area);
	
	if(history.entries.length == 10){
	    addClass(document.getElementById("history-next"),"button-visible");
		document.getElementById("history-next").addEventListener("click", function(){
		    history.next();
			if(history.entries.length < 10 || history.window.max >= history.totalCount)  removeClass(document.getElementById("history-next"),"button-visible");
			addClass(document.getElementById("history-previous"),"button-visible");
			refreshHistory(history,area);
		});
		document.getElementById("history-previous").addEventListener("click", function(){
		    history.previous();
			if(history.window.min == 0)  removeClass(document.getElementById("history-previous"),"button-visible");
			addClass(document.getElementById("history-next"),"button-visible");
			refreshHistory(history,area);
		});
	}
	
	document.getElementById("createNew").addEventListener("click", function(){
		area.clear();
		area.currentSnippet = null;
		document.getElementById("message").innerHTML = "&nbsp;";
	});
	
	setInterval(function(){
	    return autosave(area);
	}, 50000);
}