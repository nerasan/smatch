## Express Auth App

* created a node app
* .gitignore
* install express
* created home route to test app
* install ejs and express-ejs-layouts
* stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* configured auth controller
* change the res.send routes to res.render
* set up the signup and login forms, tested post routes


#### Notes

**to amend a git commit message in case of typoes**
```
git commit --amend
```

## Sequelize Validations
* What are different types of validations?

* Which ones could be useful?
* How do we use validations in sequelize?
* Try it! Implement a validation on BlogPulse to require submitted comments to be between 20 and 200 characters. Test that it works. Use .catch() to send a message to the user. It can just use res.send() for now if you want. If you have extra time, try to make the message render on the page.
