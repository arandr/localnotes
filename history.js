function History(){
    this.entries = []; //list of snippets in recent history
	this.window = {min:0, max:10};
	this.totalCount = null;
}

History.prototype.getOrderedSnips = function(){
    var snipList = JSON.parse(window.localStorage.getItem("snippets"));
	var snipArray = sort(snipList, function(item1, item2){
	    return new Date(item1.lastEdited).getTime() < new Date(item2.lastEdited).getTime();
	});
	return snipArray;
};

History.prototype.load = function(clear){
	if(clear) this.entries = [];
    var snipArray = this.getOrderedSnips();
	this.totalCount = snipArray.length;
	for(var i=0; i < Math.min(snipArray.length,10); i++){
	    var snip = new Snippet("");
		snip.load(snipArray[i]);
		this.entries.push(snip);
	}
	this.window.max = this.entries.length;
};

History.prototype.previous = function(){
    if(this.window.min == 0) return;
	if(this.entries.length == 10) this.entries.splice(9,1);
    var snipArray = this.getOrderedSnips();
	var snip = new Snippet("");
	snip.load(snipArray[this.window.min]);
	this.entries.splice(0,0,snip);
	this.window.max--;
	this.window.min--;
};

History.prototype.next = function(){
    if(this.window.max == this.totalCount) return;
	this.entries.splice(0,1);
    var snipArray = this.getOrderedSnips();
	var snip = new Snippet("");
	snip.load(snipArray[this.window.max]);
	this.entries.splice(9,0,snip);
	this.window.max++;
	this.window.min++;
};