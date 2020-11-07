// code to include passport data
// import passport into ppConfig
// using passport-local which is using a username, but for this app we will have the email be the username

const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')

passport.serializeUser((user, doneCallback)=>{
    console.log('serializing user...')
    doneCallback(null, user.id) // if error, pass error in null
})

passport.deserializeUser((id, doneCallback)=>{
    db.user.findByPk(id)
    .then(foundUser=>{
        console.log('deserializing user...')
        doneCallback(null, foundUser)
    })
    .catch(err=>{
        console.log('error deserializing user')
    })
})

/*
 This is Passport's strategy to provide local authentication. We provide the following information to the LocalStrategy:
 Configuration: An object of data to identify our authentication fields, the username and password
 Callback function: A function that's called to log the user in. We can pass the email and password to a database query, and return the appropriate information in the callback. Think of "doneCallback" as a function that'll later look like this:

 login(error, user) {
  // do stuff
 }

 We need to provide the error as the first argument, and the user as the second argument. We can provide "null" if there's no error, or "false" if there's no user.

 Think of doneCallback() as a login function.

*/

const findAndLogInUser = (email, password, doneCallback) => { // passing in three parameters to find and login user
    // note if the key is the same for example here email:email, you can actually just shorten it to 'email'
    console.log("passport-local is now trying to authenticate this user:", email)
    db.user.findOne({where: {email: email}}) 
    .then(async foundUser=>{
        let match
        if(foundUser){
            match = await foundUser.validPassword(password)
        }
        if(!foundUser || !match) {
            // validPassword() is bcrypt function that validates password
            // return "false" if the foundUser is not legit or null
            console.log('password was NOT validated i.e. match is false')
            return doneCallback(null, false)
        } else {
            // send the foundUser object if it is valid
            return doneCallback(null, foundUser)
        }
    })
    .catch(err=>doneCallback(err)) // doneCallback takes two params: error, userToBeLoggedIn
}

const fieldsToCheck = {
    usernameField: 'email', // letting passport know we are using an email instead of a username
    passwordField: 'password'
}

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)

// when we run passport, it will take these three parameters in findAndLogInUser and have these be checked through fieldsToCheck
passport.use(strategy)

// configure the strategy

module.exports = passport 