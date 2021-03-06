/* 
  Author(s): Jacy Yu,
             Justin Yin,
             Yi Yang,
             Cameron Fritz
  
  Date Created: 3/12/2020
  Last Updated: 3/13/2020
  
  File: auth.js
  Purpose: Commnicates with a firebase database and retrieves images
*/
auth = firebase.auth()
console.log("Connected to auth.js")

// Create promise to retrieve information when function is completed
const promise1 = new Promise(function(resolve, reject) {
    auth.onAuthStateChanged((user) => {
		console.log("Connected to auth.js")
            // If user is logged in, enable uploading and retriving
            if (user) {
				console.log("User logged in")
				localStorage["user"] = user.email
                resolve(user.email)
				if (document.getElementById("closetName")){
					let name = document.getElementById("closetName");
					name.innerHTML = user.email.split("@")[0] + "'s Closet";
                }
				// Update selected, image, and submit buttons when clicked/changed
					setInterval(function() {
                        var selected = document.getElementById("type")
                        selectedValue = selected.options[selected.selectedIndex].value;
                        selected.addEventListener("change", (s) => {
                            return selectedValue = selected.options[selected.selectedIndex].value;
						})}, 1)
					
					setInterval(function() {
						return image = document.getElementById("image").files[0];
					}, 1)

					setInterval(function() {
						document.getElementById("image").onchange = (updateImageValue) => {
							var image = document.getElementById("image").files[0];
                            return imageName = document.getElementById("image").files[0].name;
					}}, 1)

					document.getElementById("addItem").addEventListener("click", (addItem) => {
						upload(user.email, selectedValue, image, imageName);
					})

            // If user isn't logged in disable uploading
            } else {
                console.log("User logged out");
            }})
        // Callback function to return email. Used to access respective database
}).then(function(value) {
	document.getElementById("add").addEventListener("click", function() { addClothes(value) });
	document.getElementById("all").addEventListener("click", function() { allButton(value) });
	document.getElementById("shirts").addEventListener("click", function() { shirts(value) });
	document.getElementById("pants").addEventListener("click", function() { pants(value) });
	document.getElementById("outerwear").addEventListener("click", function() { outerwear(value) });
	document.getElementById("accessories").addEventListener("click", function() { accessories(value) });
	document.getElementById("footwear").addEventListener("click", function() { footwear(value) });
	document.getElementById("hats").addEventListener("click", function() { hats(value) });
	document.getElementById("others").addEventListener("click", function() { others(value) });
	document.getElementById("outfits").addEventListener("click", function() { displayOutfitChoices(value) });
})

// Sign out
const logout = document.querySelector("#logout")
logout.addEventListener("click", function(event) {
    event.preventDefault
    auth.signOut().then(function() {
        console.log("User signed out")
    }).catch(function(error) {
        console.log(error.message)
    })
    document.getElementById("signin-email").value = "";
    document.getElementById("signin-pass").value = "";
})

// Log in
if (document.querySelector("#loginForm")){
	const loginForm = document.querySelector("#loginForm")
	loginForm.addEventListener("submit", function(event) {
		event.preventDefault()
	
		const email = loginForm["signin-email"].value;
		const pass = loginForm["signin-pass"].value;
	
		auth.signInWithEmailAndPassword(email, pass).then(function(credential) {
			console.log("User has logged in")
			console.log(credential.user)
		}).catch(error => {
			console.log(error.message)
		})
	})
}