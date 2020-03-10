/* 
  Author(s): Jacy Yu,
             Justin Yin,
             Yi Yang,
             Cameron Fritz
  
  Date Created: 3/3/2020
  Last Updated: 3/10/2020
  
  File: dressme.js
  Purpose: Event listeners and scripts to communicate with the dressme server
*/

// Makes sure that event listeners are added after the web page is loaded
window.onload = function() {
	document.getElementById("add").addEventListener("click", addClothes);
    document.getElementById("all").addEventListener("click", allButton);
    document.getElementById("shirts").addEventListener("click", shirts);
    document.getElementById("pants").addEventListener("click", pants);
    document.getElementById("outerwear").addEventListener("click", outerwear);
    document.getElementById("accessories").addEventListener("click", accessories);
    document.getElementById("footwear").addEventListener("click", footwear);
    document.getElementById("hats").addEventListener("click", hats)
    document.getElementById("others").addEventListener("click", others)
    document.getElementById("loginForm").addEventListener("click", login);
	
	document.getElementById("upload").style.display = "None";
}

function addClothes() {
	document.getElementById("upload").style.display = "inline";
	document.getElementById("show").style.display = "None";
	document.getElementById("pictureSection").style.display = "None";
}

// Event listeners that call a request chain for getting the proper clothing
function allButton() {
    var allPictures = document.querySelector(".pictures");
    allPictures.innerHTML = "";
    sendGet("all");
    retrieve("all").then(function(result) {
        for (i=0; i<result.length; i++) {
            image = result[i];
            var picture = document.createElement("img");
            picture.src = image;
            allPictures.appendChild(picture);
        }
    }).catch(function(error) {
        console.log(error)
    })
}

function shirts() {
    sendGet("shirts");
}

function pants() {
    sendGet("pants");
}

function outerwear() {
    sendGet("outerwear");
}

function accessories() {
    sendGet("accessories");
}

function footwear() {
    sendGet("footwear");
}

function hats() {
    sendGet("hats");
}

function others() {
    sendGet("others");
}

// Send request to server to login
function login() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", updateShow);
    xhr.open("POST", "http://localhost:8080/login");
    xhr.send();
}

// Sends the request to the server
function sendGet(clothType) {
	document.getElementById("upload").style.display = "None";
	document.getElementById("show").style.display = "inline";
	document.querySelector(".pictures").style.display = "inline";
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", updateShow);
    xhr.open("GET", "http://localhost:8080/test?clothType=" + clothType);
    xhr.send();
}

// Updates the show with the response
// TODO: Update with pictures
function updateShow() {
    let display = document.getElementById("show");
    display.innerHTML = this.response;
}

function upload() {
    var selected = document.getElementById("type");
    var selectedVal = selected.options[selected.selectedIndex].value
    var image = document.getElementById("image").files[0];
    var imageName = image.name;
    var rawImageName = imageName.replace(/\..+$/, '')
    var storageRef = firebase.storage().ref("images/" + selectedVal + "/" + imageName);

    // Checks if image already exists
    if (imageName in firebase.storage().ref("images/all/")) {
        var uploadTask = storageRef.put(image);
    } else {
        var uploadTask = storageRef.put(image);
        var storageRef = firebase.storage().ref("images/all/" + imageName);
        var uploadTask = storageRef.put(image);
    }

    // Option to add later: fixing unintended overwrite when using 2 of the same image names

    uploadTask.on("state_changed", function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function(error) {
        console.log(error.message);
    }, function() {
        storageRef.getDownloadURL().then(function(downloadURL) {
            var postKey = firebase.database().ref(selectedVal + "/" + rawImageName).key;
            var updates = {};
            var postData = {
                url: downloadURL,
                name: imageName
            };

            // Check if image already exists in all folder
            var ref = firebase.database().ref()
            ref.child("all").once("value", gotUserData);

            function gotUserData(snapshot) {
                if (!snapshot.exists()) {
                    updates["/" + selectedVal + "/" + postKey] = postData;
                    firebase.database().ref().update(updates)
                }
                snapshot.forEach(userSnapshot => {
                    console.log("goes here")
                    if (rawImageName === userSnapshot.key) {
                        console.log("goes here")
                        updates["/" + selectedVal + "/" + postKey] = postData;
                        firebase.database().ref().update(updates)
                    } else {
                        console.log("goes here")
                        updates["/all/" + postKey] = postData;
                        firebase.database().ref().update(updates)
                        updates["/" + selectedVal + "/" + postKey] = postData;
                        firebase.database().ref().update(updates)
                    }
                })
            }
        });
    });
}

function retrieve(clothing) {
    return new Promise(function(resolve, reject) {
        try {
            var db = firebase.database().ref().child(clothing);
            db.once("value", pics => {
                if (!pics.exists()) {
                    resolve([])
                } else {
                    var picHtml = []
                    pics.forEach(pic => {
                        picHtml.push(pic.val().url)
                    })
                    resolve(picHtml)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
