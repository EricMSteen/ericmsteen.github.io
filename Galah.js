var x = 0;
var birb = document.createElement("birb.gif").style.position="absolute";
draw = function(){
	birb.style.position(x,100);
var y = 5;
x = x + y;
if(x == 0){
	y = 5;
	}
if(x == 1000){
	y = -5;
	}
}