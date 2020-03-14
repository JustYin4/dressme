value = localStorage["user"]
console.log(value) 

function createOutfit(value){
    let selected = []
    let pictures = document.querySelector(".pictures").childNodes;
	for (let i = 0; i < pictures.length; i++){
        let pic = pictures[i];
		if (pic.style.backgroundColor == "red") {
            selected.push(pic.src)
		}
    }
	if (selected.length == 0){
		alert("You did not select any clothes. Please try again.");
		return
	}
    let outfitName = prompt("What would you like to call this outfit?", "Outfit");
    upload(value, selected, outfitName)
}

function selectImage() {
    if (this.style.backgroundColor == 'white') {
        this.style.backgroundColor = 'red'
    } else {
        this.style.backgroundColor = 'white'
    }
}

function allButton(user) {
    var allPictures = document.querySelector(".pictures");
    allPictures.innerHTML = "";

    removeDomain = user.substring(0, user.lastIndexOf("@"));
    removeSpecialChar = removeDomain.replace(/@[^@]+$/, '');
    user = removeSpecialChar;


    retrieve(user, "all").then(function(result) {
        for (i=0; i<result.length; i++) {
            image = result[i];
            var picture = document.createElement("img");
            picture.src = image;
            picture.className = "img"
            picture.addEventListener("click", selectImage)
            allPictures.appendChild(picture);
        }
    }).catch(function(error) {
        console.log(error)
    })
}


allButton(value)

create = document.getElementById("createOutfit")
create.addEventListener("click", function() { createOutfit(value) })

function upload(user, imageList, outfitName) {
    // Strip email
    removeDomain = user.substring(0, user.lastIndexOf("@"));
    removeSpecialChar = removeDomain.replace(/@[^@]+$/, '')
    user = removeSpecialChar

    console.log(imageList)

    // Format parameters
    for (i=0; i<imageList.length; i++) {

        removeExtra = imageList[i].substring(imageList[i].length - 10, imageList[i].length)

        let postKey = firebase.database().ref(user + "/outfits/" + outfitName + "/" + removeExtra).key;
        let updates = {};
        let postData = {
            url: imageList[i],
            name: i
        };
        // console.log(imageList[i], i)

        var ref = firebase.database().ref()
        ref.child(user).once("value", gotUserData);
        function gotUserData() {
            updates["/" + user + "/outfits/" + outfitName + "/" + postKey] = postData;
            firebase.database().ref().update(updates)
        }
    }
}
