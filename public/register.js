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