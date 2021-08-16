//Main js script for index
//max card display of 255 cards
//


//needs refactoring
//filter out bad cards during random: "Skill Card" DONE!
	//might just make my own random function to reduce display time
	//and prevent potential block out by server

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
		return this.data[num]; //deprecated, remove later
	}
}

let cardlist = new CardList();
const board = document.getElementById('cardboard');
let deck = new CardList();

var x = 0; //feels dirty, fix later, card count for cardboard, make reset function later
var y = 0; //value for current displayed card
var z = 0; //card count for cardboard
var zz = 0;//value for current displayed card in Deck


function clearBoard(){
	document.getElementById('cardboard').innerHTML = ''; //lmao no way this actually worked
}

function URLgen() {
	var URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
	var stringArray = [];


	var archetype = 	document.getElementById('archetype').value;
	var fname = 		document.getElementById('fname').value;
	var cardtype =		document.getElementById('Card-Type').value;
	var typemonster = 	document.getElementById('type-monster').value;
	var lvl =			document.getElementById('level-form').value;
	var atk = 			document.getElementById('attack-form').value;
	var def = 			document.getElementById('defense-form').value;
	var atkmod = 		document.getElementById('atk-mod').value;
	var defmod = 		document.getElementById('def-mod').value;
	var levelmod =		document.getElementById('level-mod-form').value;
	var sort =			document.getElementById('sort-form').value;

	console.log(fname);
	if(archetype){
		archetype = 'archetype=' + archetype;
		stringArray.push(archetype);
	}
	if(fname){
		fname = 'fname=' + fname;
		stringArray.push(fname);
	}
	if(cardtype){
		cardtype = 'type=' + cardtype;
		stringArray.push(cardtype);
	}
	if(typemonster){
		typemonster = 'race=' + typemonster;
		stringArray.push(typemonster);
	}
	if(lvl){
		lvl = 'level=' + levelmod + lvl;
		stringArray.push(lvl);
	}
	if(atk){
		atk = 'atk=' + atkmod + atk;
		stringArray.push(atk);
	}
	if(def){
		def = 'def=' + defmod + def;
		stringArray.push(def);
	}
	if(sort){
		sort = 'sort=' + sort;
		stringArray.push(sort);
	}

	const args = stringArray.join('&');
	console.log(args);

	URL = URL + args + '&num=255&offset=0';
	console.log(URL);
	readData(URL);

}
function createCard(obj, bool){
	cardlist.addCard(obj);
	const cardimg = document.createElement('img');
	cardimg.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + obj.id + '.jpg';
	cardimg.alt = obj.name;
	cardimg.classList.add('card');
	if(bool){
	cardimg.id = z;
	cardimg.setAttribute("onclick","displayCard(" + z + ");");
	z++;
	}else {
	cardimg.id = x;
	cardimg.setAttribute("onclick","displayCard(" + x + ");");
	x++;
	}
	//cardimg.onclick = function() { displayCard(x, cardlist); };
	board.appendChild(cardimg);
	//x++;
}

function resolveSearch(){
	clearBoard();
	URLgen();
}

function displayDeck(){
	clearBoard();
	document.getElementById('addButton').style.visibility = 'hidden';
	document.getElementById('removeButton').style.visibility = 'visible';
	console.log(deck);
	console.log(deck.data);
	console.log(typeof(deck));
	deck.data.forEach( card => {
		createCard(card);
	});
}
function addCardToDeck(){
	let card = cardlist.data[y];
	console.log(card);
	console.log(y);
	deck.addCard(card, 1);
}
function removeCardFromDeck(){


	//displayDeck();
}
function displayCard(num) {
	//console.log(num);
	let temp = cardlist.data[num];
	y = num;
	//console.log(temp);
	let display = document.getElementById('display-card');
	display.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + temp.id + '.jpg';

	console.log(temp.type)

	if(temp.type == 'Effect Monster' || temp.type == 'Flip Effect Monster' || temp.type == 'Tuner Monster' || temp.type == 'Flip Effect Tuner Monster' || temp.type == 'Gemini Monster' || temp.type == 'Toon Monster' || temp.type == 'Union Effect Monster'){
		colorChanger('effect');
	}
	else if(temp.type == 'Ritual Monster' || temp.type == 'Ritual Effect Monster'){
		colorChanger('ritual');
	}
	else if(temp.type == 'Synchro Monster' || temp.type == 'Synchro Tuner Monster'){
		colorChanger('synchro');
	}
	else if(temp.type == 'XYZ Monster'){
		colorChanger('xyz');
	}
	else if(temp.type == 'Spell Card'){
		colorChanger('magic');
	}
	else if(temp.type == 'Trap Card'){
		colorChanger('trap');
	}
	else{
		colorChanger('normal');
	}



	if(temp.level){ //dont think i can use switch case, maybe clever functioning
		document.getElementById('level').style.visibility = 'visible';
		document.getElementById('level').innerHTML = 'Lvl:' + temp.level;
	}
	else if(temp.linkval){
		document.getElementById('level').style.visibility = 'visible';
		document.getElementById('level').innerHTML = 'Lnk:' + temp.linkval;
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
	document.getElementById('name').style.visibility = 'visibile';
	if(temp.archetype){
		document.getElementById('arch').style.visibility = 'visible';
		document.getElementById('arch').innerHTML = 'Archetype: ' + temp.archetype;
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

	console.log(num);
}

function colorChanger(color){
	switch (color) {
		case 'normal':
			document.getElementById('sidebar').style.background ='rgb(255,206,51)';
			document.getElementById('sidebar').style.background ='-moz-linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.background ='-webkit-linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.background ='linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.filter 	='progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffce33",endColorstr="#c4bb13",GradientType=1)';
			break;
		case 'effect':
			document.getElementById('sidebar').style.background = 'rgb(184,186,20)';
			document.getElementById('sidebar').style.background = '-moz-linear-gradient(156deg, rgba(184,186,20,1) 0%, rgba(186,124,20,1) 35%, rgba(196,80,19,1) 100%)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(156deg, rgba(184,186,20,1) 0%, rgba(186,124,20,1) 35%, rgba(196,80,19,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(184,186,20,1) 0%, rgba(186,124,20,1) 35%, rgba(196,80,19,1) 100%)';
			document.getElementById('sidebar').style.filter = 	  'progid:DXImageTransform.Microsoft.gradient(startColorstr="#b8ba14",endColorstr="#c45013",GradientType=1)';
			break;
		case 'ritual':
			document.getElementById('sidebar').style.background ='rgb(52,34,150)';
			document.getElementById('sidebar').style.background ='-moz-linear-gradient(156deg, rgba(52,34,150,1) 0%, rgba(34,57,150,1) 50%, rgba(34,141,150,1) 100%)';
			document.getElementById('sidebar').style.background ='-webkit-linear-gradient(156deg, rgba(52,34,150,1) 0%, rgba(34,57,150,1) 50%, rgba(34,141,150,1) 100%)';
			document.getElementById('sidebar').style.background ='linear-gradient(156deg, rgba(52,34,150,1) 0%, rgba(34,57,150,1) 50%, rgba(34,141,150,1) 100%)';
			document.getElementById('sidebar').style.filter = 	 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#342296",endColorstr="#228d96",GradientType=1)';
			break;
		case 'fusion':
			document.getElementById('sidebar').style.background = 'rgb(160,19,196)';
			document.getElementById('sidebar').style.background = '-moz-linear-gradient(156deg, rgba(160,19,196,1) 0%, rgba(99,19,196,1) 52%, rgba(178,19,196,1) 100%)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(156deg, rgba(160,19,196,1) 0%, rgba(99,19,196,1) 52%, rgba(178,19,196,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(160,19,196,1) 0%, rgba(99,19,196,1) 52%, rgba(178,19,196,1) 100%)';
			document.getElementById('sidebar').style.filter  	= 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#a013c4",endColorstr="#b213c4",GradientType=1)';
			break;
		case 'synchro':
			document.getElementById('sidebar').style.background = 'background: rgb(255,255,255)';
			document.getElementById('sidebar').style.background = '-moz-linear-gradient(156deg, rgba(255,255,255,1) 0%, rgba(130,130,130,1) 60%, rgba(255,255,255,1) 100%)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(156deg, rgba(255,255,255,1) 0%, rgba(130,130,130,1) 60%, rgba(255,255,255,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(255,255,255,1) 0%, rgba(130,130,130,1) 60%, rgba(255,255,255,1) 100%)';
			document.getElementById('sidebar').style.filter = 	  'progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1)';
			break;
		case 'xyz':
			document.getElementById('sidebar').style.background = 'rgb(66,63,63)';
			document.getElementById('sidebar').style.background = '-moz-linear-gradient(156deg, rgba(66,63,63,1) 0%, rgba(184,183,183,1) 52%, rgba(15,15,15,1) 100%)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(156deg, rgba(66,63,63,1) 0%, rgba(184,183,183,1) 52%, rgba(15,15,15,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(66,63,63,1) 0%, rgba(184,183,183,1) 52%, rgba(15,15,15,1) 100%)';
			document.getElementById('sidebar').style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#423f3f",endColorstr="#0f0f0f",GradientType=1)';
			break;
		case 'link':
			document.getElementById('sidebar').style.background = 'rgb(2,0,36)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(66deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
			document.getElementById('sidebar').style.background = '-o-linear-gradient(66deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
			break;
		case 'magic':
			document.getElementById('sidebar').style.background = 'rgb(23,56,168)';
			document.getElementById('sidebar').style.background = '-moz-linear-gradient(156deg, rgba(23,56,168,1) 0%, rgba(23,137,168,1) 52%, rgba(56,23,168,1) 100%)';
			document.getElementById('sidebar').style.background = '-webkit-linear-gradient(156deg, rgba(23,56,168,1) 0%, rgba(23,137,168,1) 52%, rgba(56,23,168,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(23,56,168,1) 0%, rgba(23,137,168,1) 52%, rgba(56,23,168,1) 100%)';
			document.getElementById('sidebar').style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#1738a8",endColorstr="#3817a8",GradientType=1)';
			break;
		case 'trap':
			document.getElementById('sidebar').style.background = 'rgb(181,21,125)';
			document.getElementById('sidebar').style.background ='-moz-linear-gradient(156deg, rgba(181,21,125,1) 0%, rgba(181,21,77,1) 61%, rgba(181,21,163,1) 100%)';
			document.getElementById('sidebar').style.background ='-webkit-linear-gradient(156deg, rgba(181,21,125,1) 0%, rgba(181,21,77,1) 61%, rgba(181,21,163,1) 100%)';
			document.getElementById('sidebar').style.background = 'linear-gradient(156deg, rgba(181,21,125,1) 0%, rgba(181,21,77,1) 61%, rgba(181,21,163,1) 100%)';
			document.getElementById('sidebar').style.filter		='progid:DXImageTransform.Microsoft.gradient(startColorstr="#b5157d",endColorstr="#b515a3",GradientType=1)';
			break;
		default:
			document.getElementById('sidebar').style.background ='rgb(255,206,51)';
			document.getElementById('sidebar').style.background ='-moz-linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.background ='-webkit-linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.background ='linear-gradient(156deg, rgba(255,206,51,1) 0%, rgba(255,152,51,1) 64%, rgba(196,187,19,1) 100%)';
			document.getElementById('sidebar').style.filter 	='progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffce33",endColorstr="#c4bb13",GradientType=1)';
			break;

	}
}

function displayForms(){
	var display = document.getElementById('Card-Type').value;

	switch(display){
		case 'monster':
			document.getElementById('type-monster').style.visibility = 'visible';
			document.getElementById('type-magic').style.visibility = 'hidden';
			document.getElementById('type-trap').style.visibility = 'hidden';
			break;
		case 'magic':
			document.getElementById('type-magic').style.visibility = 'visible';
			document.getElementById('type-monster').style.visibility = 'hidden';
			document.getElementById('type-trap').style.visibility = 'hidden';
			break;
		case 'trap':
			document.getElementById('type-trap').style.visibility = 'visible';
			document.getElementById('type-monster').style.visibility = 'hidden';
			document.getElementById('type-magic').style.visibility = 'hidden';
			break;
		default:
			document.getElementById('type-monster').style.visibility = 'hidden';
			document.getElementById('type-magic').style.visibility = 'hidden';
			document.getElementById('type-trap').style.visibility = 'hidden';
			break;
	}
}

async function randomBoard(){ //reduce this func and readData with other func
				// doesn't feel effecient, will look at async
	//const board = document.getElementById('cardboard');
	for( var i = 0; i < 10; i++){ //DO NOT EXCEED 20 OR YOU WILL BE BLOCKED FOR 1 HOUR
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
async function readData(URL){ //add error check for when nothing is returned
	let data = await fetch(URL);
	let card = await data.json();
	console.log(card);
	if(card.error){
		document.getElementById('cardboard').innerHTML = 'No cards Found';
		return;
	}
	//let cardlist = new CardList();
	//const board = document.getElementById('cardboard');
	//var x = 0;
	card.data.forEach( obj => {
		if(obj.type != "Skill Card"){
		createCard(obj);
		}
		/*cardlist.addCard(obj);
		const cardimg = document.createElement('img');
		cardimg.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + obj.id + '.jpg';
		cardimg.alt = obj.name;
		cardimg.id = x;
		cardimg.classList.add('card');
		//cardimg.onclick = function() { displayCard(x, cardlist); };
		cardimg.setAttribute("onclick","displayCard(" + x + ");");
		board.appendChild(cardimg);

		x+=1;*/
	});
	console.log(x);

	return cardlist;
}

//let cardlist = new CardList();
//let uselessVariable = readData('https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes');
//console.log(cardlist);
randomBoard();
