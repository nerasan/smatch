module.exports = (req, res, next) => {
    if(!req.user){ // if no one is logged in
        // this blocks you from viewing any page that we add this middleware to unless you are logged in
        req.flash('error', 'you must be logged in to access that page.')
        res.redirect('/auth/login')
    } else { // someone is logged in currently
        next() // tell express to keep going
    }
}