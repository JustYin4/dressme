const signupForm = document.querySelector("#signupForm")
auth = firebase.auth()

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User logged in")
        allButton(user.email)
        document.getElementById("test").innerHTML = user.email
    } else {
        console.log("User logged out")
    }
})
signupForm.addEventListener("submit", function(event) {
    // Prevent page refresh
    event.preventDefault()
    
    // Get user info
    const email = signupForm["signup-email"].value
    const pass = signupForm["signup-pass"].value

    // Initialize and create user
    auth.createUserWithEmailAndPassword(email, pass).then(function(credential) {
        console.log("User created an account")
        console.log(credential.user)
    }).catch(function(error) {
        console.log(error.message)
    })
})

const logout = document.querySelector("#logout")
logout.addEventListener("click", function(event) {
    event.preventDefault
    auth.signOut().then(function() {
        console.log("User signed out")
    }).catch(function(error) {
        console.log(error.message)
    })
})

const loginForm = document.querySelector("#loginForm")
loginForm.addEventListener("submit", function(event){
    event.preventDefault()

    const email = loginForm["signin-email"].value;
    const pass = loginForm["signin-pass"].value;

    auth.signInWithEmailAndPassword(email, pass).then(function(credential){
        console.log("User has logged in")
        console.log(credential.user)  
    }).catch(error => {
        console.log(error.message)
    })
})