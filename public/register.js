auth = firebase.auth()
console.log("Connected to register.js")

// Sign out
const logout = document.querySelector("#logout")
var register = document.getElementById("registerHome")
register.addEventListener("click", function(event) {
    event.preventDefault
    auth.signOut().then(function() {
        console.log("User signed out")
    }).catch(function(error) {
        console.log(error.message)
    })
    document.getElementById("signin-email").value = "";
    document.getElementById("signin-pass").value = "";
})


// Sign up
if (document.querySelector("#signupForm")) {
    const signupForm = document.querySelector("#signupForm")
    var register = document.getElementById("registerHome")
    console.log(register)
	register.addEventListener("click", function(event) {
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