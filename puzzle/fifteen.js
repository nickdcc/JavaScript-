/* Nick DeChant
 * 
 * old skool skills
 * 
 * This is a javascript program that is in charge of the behavior for a 
 * Fifteen Puzzle game. 
 * 
 * */

"use strict";

(function(){
//coordinates for the empty lower-right square
var whiteLeft = 300;
var whiteTop = 300;
//counters for it we have won or made a move yet
var move = 0;
window.onload = function() {
	document.getElementById("background").onchange = changeBack;
	document.getElementById("shuffle").onclick = shuffle;
	buildGrid();
};
//function shuffles all squares
function shuffle(){	
	for (var i = 0; i < 1000; i++) {
		var neighbors = [];
		var squares = document.querySelectorAll(".square");
		for (var j = 0; j < 15; j++) {
			//if the whiteSquare is around a tile that can be moved,
			//add it to the array
			if (isPossibleMove(squares[j].style.left, squares[j].style.top)) {
				neighbors.push(squares[j]); 
			}
		}
		//randomly get a one of the squares in the array and
		//mmove the whiteSquare to the location of the random square
		var randIndex = parseInt(Math.random() * neighbors.length);
		var xNew = neighbors[randIndex].style.left;
		var yNew = neighbors[randIndex].style.top;
		neighbors[randIndex].style.left = whiteLeft + "px";
		neighbors[randIndex].style.top = whiteTop + "px";
		whiteLeft = parseInt(xNew);
		whiteTop = parseInt(yNew);
		neighbors.pop();
		
	}
		document.getElementById("grats").innerHTML=""; //clear the congrats msg
}

//this function adds fifteen squares to the puzzle area and
//remembers the current pic / # of wins
function buildGrid(){
	var area = document.getElementById("puzzlearea"); //this is where we add shit
	for (var i = 0; i <= 14; i++){
		var x = parseInt((i % 4)) * 100; //display rows in terms of 0,1,2,3 each time we add to the puzzle
		var y = parseInt(Math.floor(i / 4)) * 100;  //display columns in terms of 0,1,2,3 each time we add to the puzzle
		var square = document.createElement("div"); //create a square
		square.className = "square"; //using the square class
		square.style.left = x + "px";
		square.style.top  = y  + "px";
		square.style.backgroundPosition = -x + "px" + " " + -y + "px"; //display correct part of a background img
		square.innerHTML = (i+1); //assign square a number
		square.style.backgroundImage = "url('background1.jpg')";  
		square.onclick = moveSquare;
		square.onmouseover = highLight;
		area.appendChild(square);
	}
	if (localStorage["numOfWins"]){
		document.getElementById("winner").innerHTML="Total wins: " + localStorage["numOfWins"];
		}else{
			document.getElementById("winner").innerHTML="Total wins: 0"; //here is a good place to display the Total wins msg
			}
	if (localStorage["squarePic"]){ 
		var sqpic = localStorage["squarePic"];
		document.getElementById("background").value = sqpic;
		var squares = document.querySelectorAll(".square");
		for (var i = 0; i <= 14; i++) {
			squares[i].style.backgroundImage = "url("+sqpic+")";
			}
		}
}
//function moves the white square relative to the square that is
//being clicked, and vice versa
function moveSquare() { //was event
	//if we are allowed to make a move
	if (isPossibleMove(this.style.left, this.style.top)) {
		//get current coordinates of clicked square
		var x = this.style.left;
		var y = this.style.top;
		//move white square to the clicked square
		this.style.left = whiteLeft + "px";
		this.style.top = whiteTop + "px";
		//move clicked square to white squares old location
		whiteLeft = parseInt(x);
		whiteTop = parseInt(y);
		move++;
		if (win() && move > 0){
				//if we won the game, increment
			if (localStorage["numOfWins"]){ //if we have already played a Game
				var CurrentWins = parseInt(localStorage["numOfWins"]);
				localStorage["numOfWins"] = CurrentWins + 1; //increment the # of wins and store it
				}else{
					localStorage["numOfWins"] = 1;
					}
			
			document.getElementById("winner").innerHTML="Total wins: " + localStorage["numOfWins"];
			document.getElementById("grats").innerHTML="YOU WIN!! Congratulations!! >;]";
			} 
	}
}
//function returns true if we have won a game yet and
//false if we have not
 function win(){
		var count=0;
		var squares = document.querySelectorAll(".square"); //get all squares
		if (squares.length == 15){ // /if board is loaded with 15 squares
			for (var i = 0; i <= 14; i++){ 
				
				//if we have made a few moves && the puzzle is in its
				//1,2,3,4,5.. solved state, then we have won a game
				if ((squares[i].style.left == (parseInt((i % 4)) * 100)+ "px") &&   
																				
					(squares[i].style.top == (parseInt(Math.floor(i / 4))) * 100+ "px") )
					
					{
						count++;
					}
					
					
				if (count==15) {    return true;    }	
					
									
			} 
			//if not, then we didn't win a Game
			return false;					
			}
}
//function does some mathy calculations to see whether or not
//the user can make a move, is so then return true.
function isPossibleMove(left, top) {	 
	var dx = (whiteLeft - parseInt(left));
	var dy = (whiteTop - parseInt(top));
	 //if the vertical change in distance from the white square to the "clicked" square is 100
	 //AND there is NO change in horizontal distance, //OR if the horizontal change in distance from the white 
	 //square to the "clicked" square is 100
		//AND there is NO change in vertical distance
	if (Math.abs(dy) == 100 && (Math.abs(dx) == 0)  || (Math.abs(dx) == 100 && (Math.abs(dy) == 0))
		) {
			return true;
	//else we are hovering over a non-moveable square, no possible move
	}else{
			return false;
	}
}

//function uses the onmouseover event to possibly change the
//state of the square that is being seleceted
function highLight(){
	if (isPossibleMove(this.style.left, this.style.top)){
			this.classList.add("hover"); //temp highlight square
		}else{
			this.classList.remove("hover"); 
		}
}

//function uses the onchange event to change the 
//background image on the puzzle
function changeBack(){
	var pic = document.getElementById("background").value; //get w/e pic was selected
	var squares = document.querySelectorAll(".square");
	for (var i = 0; i <= 14; i++) {
		squares[i].style.backgroundImage = "url("+pic+")";
	}
	localStorage["squarePic"] = pic;
}	

})();
