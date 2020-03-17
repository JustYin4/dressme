/*
  Author(s): Yi Yang,
             Justin Yin,
             Jacy Yu,
             Cameron Fritz
  
  Date Created: 3/15/2020
  Last Updated: 3/17/2020
  
  File: register.js
  Purpose: Script for allowing users to create profiles for dressme
*/
auth = firebase.auth()
console.log("Connected to register.js")


// Sign up
if (document.querySelector("#signupForm")) {
    const signupForm = document.querySelector("#signupForm")
    var register = document.getElementById("registerHome")
    console.log(register)
	register.addEventListener("click", function(event) {
		console.log(register)
		// Prevent page refresh
		event.preventDefault();

		// Get user info
		const email = signupForm["signup-email"].value;
		const pass = signupForm["signup-pass"].value;

		// Initialize and create user
		auth.createUserWithEmailAndPassword(email, pass).then(function(credential) {
			console.log("User created an account");
			console.log(credential.user);
		}).catch(function(error) {
			console.log(error.message);
		})
	})
}