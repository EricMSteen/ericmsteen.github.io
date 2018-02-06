var x = 0;
var birb = document.createElement("birb.gif").style.position="absolute";
function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

draw = function(){
	show_image(birb,100,100,birb);
	//birb.style.position(x,100);
var y = 5;
x = x + y;
if(x == 0){
	y = 5;
	}
if(x == 1000){
	y = -5;
	}
}