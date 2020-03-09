/* 
  Author(s): Jacy Yu,
             Justin Yin,
             Yi Yang,
             Cameron Fritz
  
  Date Created: 3/3/2020
  Last Updated: 3/9/2020
  
  File: dressme.js
  Purpose: Event listeners and scripts to communicate with the dressme server
*/

// Makes sure that event listeners are added after the web page is loaded
window.onload = function(){
	document.getElementById("all").addEventListener("click", allButton);
	document.getElementById("shirts").addEventListener("click", shirts);
	document.getElementById("pants").addEventListener("click", pants);
	document.getElementById("outerwear").addEventListener("click", outerwear);
	document.getElementById("accessories").addEventListener("click", accessories);
	document.getElementById("footwear").addEventListener("click", footwear);
	document.getElementById("hats").addEventListener("click", hats)
	document.getElementById("others").addEventListener("click", others)
	document.getElementById("loginForm").addEventListener("click", login);
}

// Event listeners that call a request chain for getting the proper clothing
function allButton(){
	sendGet("all");
}

function shirts(){
	sendGet("shirts");
}

function pants(){
	sendGet("pants");
}

function outerwear(){
	sendGet("outerwear");
}

function accessories(){
	sendGet("accessories");
}

function footwear(){
	sendGet("footwear");
}

function hats(){
	sendGet("hats");
}

function others(){
	sendGet("others");
}

// Send request to server to login
function login(){
	let xhr = new XMLHttpRequest();
	xhr.addEventListener("load", updateShow);
	xhr.open("POST", "http://localhost:8080/login");
	xhr.send();
}

// Sends the request to the server
function sendGet(clothType){
	let xhr = new XMLHttpRequest();
	xhr.addEventListener("load", updateShow);
	xhr.open("GET", "http://localhost:8080/test?clothType=" + clothType);
	xhr.send();
}

// Updates the show with the response
// TODO: Update with pictures
function updateShow(){
	let display = document.getElementById("show");
	display.innerHTML = this.response;
}
