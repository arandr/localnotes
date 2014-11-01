function Snippet(text){
   this.update(text);
   this.id = Math.random()*Number.MAX_VALUE;
}

Snippet.prototype.shortContent = function (text){
    var first_line = this.content.split('\n')[0];
    return first_line.length > 25 ? first_line.slice(0,25)+"..." : first_line;
};

Snippet.prototype.update = function (text){
    this.content = text;
	this.created = new Date();
    this.lastEdited = new Date();
};

Snippet.prototype.data = function(){
   var obj = {
	    content: this.content,
		created: this.created,
		lastEdited:this.lastEdited,
		id: this.id
	};
	return obj;
};

Snippet.prototype.save = function(){
    this.lastEdited = new Date();
	var snipList = window.localStorage.getItem("snippets");
    if(snipList){
		snipList = JSON.parse(snipList);		
		snipList[this.id]=this.data();
		window.localStorage.setItem("snippets", JSON.stringify(snipList));
	}
	else{
	    var obj = {};
	    obj[this.id] = this.data();
	    window.localStorage.setItem("snippets", JSON.stringify(obj));
	}
};

Snippet.prototype.load = function (str){
     var data = str;
	 for(var key in data){
	    if(this.hasOwnProperty(key)) this[key] = data[key];
	 }
};

Snippet.prototype.remove = function(){
	var snipList = window.localStorage.getItem("snippets");
    if(snipList){
		snipList = JSON.parse(snipList);
		if(this.id in snipList){
		delete snipList[this.id];
		window.localStorage.setItem("snippets", JSON.stringify(snipList));
		}
	}
};