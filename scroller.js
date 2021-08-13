class CardList {
	constructor(){
	this.data = [];
	}

	addCard(object){
		this.data.push(object);
	}
	clearData(){
		this.data = [];
	}
	getCard(num) {
		return this.data[num];
	}
}

let cardlist = new CardList();

function clearBoard(){
	document.getElementById('cardboard').innerHTML = ''; //lmao no way this actually worked

}

function URLgen() {
	var URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
	var stringArray = [];


	var archetype = 	document.getElementById('archetype').value;
	var fname = 		document.getElementById('fname').value;
	//var lvl =		document.getElementById('lvl').value;
	//var cardtype =		document.getElementById('cardtype').value;
	//var monstertype = 	document.getElementById('monstertype').value;

	console.log(fname);
	if(archetype){
		archetype = 'archetype=' + archetype;
		stringArray.push(archetype);
	}
	if(fname){
		fname = 'fname=' + fname;
		stringArray.push(fname);
	}

	const args = stringArray.join('&');
	console.log(args);

	URL = URL + args;
	console.log(URL);
	readData(URL);

}

function resetBoard(){
	clearBoard();
	URLgen();
}

function displayCard(num) {
	//console.log(num);
	let temp = cardlist.data[num];
	//console.log(temp);
	let display = document.getElementById('display-card');
	display.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + temp.id + '.jpg';
	if(temp.level){
		document.getElementById('level').style.visibility = 'visible';
		document.getElementById('level').innerHTML = 'Lv:' + temp.level;
	}
	else{
		document.getElementById('level').style.visibility = 'hidden';
	}
	if(temp.atk >= 0){ //clean up this code. Switch statements? refactor with variables later
		document.getElementById('atk').style.visibility = 'visible';
		document.getElementById('atk').innerHTML = ' ATK: ' + temp.atk;
	}
	else{
		document.getElementById('atk').style.visibility = 'hidden';

	}
	if(temp.def >= 0){ //js interprets 0 as null, lmao
		document.getElementById('def').style.visibility = 'visible';
		document.getElementById('def').innerHTML = ' DEF: ' + temp.def;
	}
	else{
		document.getElementById('def').style.visibility = 'hidden';
	}
	//document.getElementById('atk').innerHTML = 'ATK: ' + temp.atk;
	//document.getElementById('def').innerHTML = 'DEF: ' + temp.def;
	if(temp.type === 'Normal Monster'){
		document.getElementById('desc').innerHTML = '<i>' + temp.desc + '</i>';
	}
	else{
		document.getElementById('desc').innerHTML = temp.desc;
	}
	document.getElementById('name').innerHTML = temp.name;
	if(temp.archetype){
		document.getElementById('arch').style.visibility = 'visible';
		document.getElementById('arch').innerHTML = temp.archetype;
	}else{
		document.getElementById('arch').style.visibility = 'hidden';
	}
	if(temp.attribute){
		document.getElementById('attr').style.visibility = 'visible';
		document.getElementById('attr').innerHTML = temp.attribute;
	}else{
		document.getElementById('attr').style.visibility = 'hidden';
	}
	if(temp.race){
		document.getElementById('race').style.visibility = 'visible';
		document.getElementById('race').innerHTML = temp.race;
	}else{
		document.getElementById('race').style.visibility = 'hidden';
	}


	}

var x = 0; //feels dirty, fix later

async function randomBoard(){ //reduce this func and readData with other func
				// doesn't feel effecient, will look at async
	const board = document.getElementById('cardboard');
	for( var i = 0; i < 10; i++){ //change to 20 later
		var data = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
		//console.log(data);
		var obj = await data.json();
		//console.log(obj);
		cardlist.addCard(obj);
		const cardimg = document.createElement('img');
		//console.log(obj.id);
		cardimg.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + obj.id + '.jpg';
		cardimg.alt = obj.name;
		cardimg.id = x;
		cardimg.classList.add('card');
		cardimg.setAttribute("onclick","displayCard(" + x + ");");
		board.appendChild(cardimg);
		x++;
	}
}
async function readData(URL){
	let data = await fetch(URL);
	let card = await data.json();
	//let cardlist = new CardList();
	//console.log(card);
	//console.log(cardlist);
	//console.log(typeof(card));
	//console.log(card.data[4]);
	const board = document.getElementById('cardboard');
	//var x = 0;
	card.data.forEach( obj => {
		cardlist.addCard(obj);
		//console.log(obj.name);
		//console.log(typeof(obj));
		//console.log(obj);
		const cardimg = document.createElement('img');
		cardimg.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + obj.id + '.jpg';
		cardimg.alt = obj.name;
		cardimg.id = x;
		cardimg.classList.add('card');
		//cardimg.onclick = function() { displayCard(x, cardlist); };
		cardimg.setAttribute("onclick","displayCard(" + x + ");");
		board.appendChild(cardimg);

		x+=1;
	});
	console.log(cardlist);
	console.log(cardlist.data[2]);
	return cardlist;

}
//let cardlist = new CardList();
//let uselessVariable = readData('https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=frog');
//console.log(cardlist);
randomBoard();

document.getElementById('atk').style.visibility = 'hidden';
document.getElementById('def').style.visibility = 'hidden';
document.getElementById('desc').style.visibility = 'hidden';
