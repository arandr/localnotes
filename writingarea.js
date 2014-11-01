function WritingArea (element){
    this.domElement = element;
	element.model = this;
	this.hasDefault = true;
	this.currentSnippet = null;
}

WritingArea.prototype.setPlaceholder = function(toggle){
	if(toggle) addClass(this.domElement, "placeholder");
	else removeClass(this.domElement, "placeholder");
};

WritingArea.prototype.clear = function(){
	this.domElement.value = "";
};

WritingArea.prototype.makeSnippet = function(){
    if(!this.currentSnippet) this.currentSnippet = new Snippet(this.domElement.value);
	else this.currentSnippet.update(this.domElement.value);
	return this.currentSnippet;
};

WritingArea.prototype.loadSnippet = function(snippet){
    this.currentSnippet = snippet;
	this.domElement.value = snippet.content;
	this.hasDefault = false;
	this.setPlaceholder(false);
};

WritingArea.prototype.wordCount = function(){
    return this.domElement.value.trim().replace(/\s+/g, ' ').split([" "]).length;
};

