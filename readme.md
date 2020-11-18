# smatch

## Demo: TBD

## Concept

Smatch is a simple, easy-to-use website for Super Smash Bros Ultimate players to track their matches. Players can access their profile to see their match history, analyze their performance based on statistics, and understand their top characters and where they can improve.

## Installation Instructions

* fork and clone this repo
* cd into the directory and `npm init`
* `npm i` to install all dependencies
* `sequelize init`
* in `config.json`, change the dialect to `"postgres"` and the database to `"ssbu_app_dev"`
* `sequelize db:migrate` (*do NOT use the seed file until you create at least one user through the app*)
* create a `.env` and add a `PORT` and a `SECRET_SESSION`
* run `nodemon` and open your localhost to the port you selected
* create a user
* `sequelize db:seed:all`

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Dependencies:
  * axios
  * bcrypt
  * chart.js
  * connect-flash
  * dotenv
  * ejs
  * express
  * express-ejs-layouts
  * express-session
  * method-override
  * passport
  * passport-local
  * pg
  * sequelize
* Lucidchart
* Procreate
* [Unofficial API for Super Smash Bros](https://smashbros-unofficial-api.vercel.app/)

## ERD

![erd](updated-erd.png)

## Wireframes

### **Home Page**
![wireframe-home](https://i.imgur.com/Vf9lpPD.jpg)

### **Sign Up**
![wireframe-signup](https://i.imgur.com/6RNyUgh.jpg)

### **Login**
![wireframe-login](https://i.imgur.com/SHoj1NN.jpg)

### **Profile**
![wireframe-profile](https://i.imgur.com/1D2pOLX.jpg)

### **Match History**
![wireframe-matches](https://i.imgur.com/Ici1KoS.jpg)

### **Characters**
![wireframe-characters](https://i.imgur.com/JxB5HR2.jpg)

* *Wireframes only show the navigation menu for a user who is not logged in. Logged in users have a different navigation (profile, match history, characters, log out). The above images say "home page (not logged in) for all of them... oops.*
* *Individual character show page wireframe not shown above.*

## Development Plan

* Back-end functional, data able to be stored and called correctly.
* Layout and pages to have working links for the logged in user.
* Front-end, styling, setting a color scheme for site.
* Add chart.js to have chart(s) in a user's profile.
* **To-Do:** Fix the issue of the profile data loaded from the database, regardless of who is logged in.
* **To-Do:** Add 404/error route to redirect all undefined pages to.

## MVP

* Site has a sign up/log in functionality with hashed passwords and authorization flow.
* CRUD functions for the user:
  * User can create a profile, add match results with the character and result.
  * User can view their profile, match history, and profiles of every playable character.
  * User can edit their profile and match entries.
  * User can delete their match entries.
* An overview of the user's match history is shown on their profile in a doughnut chart.

## Stretch Goals

* Design a logo/banner for Smatch.
* Show the Date Added for every match and add a filter (e.x., past 1 month, 6 months, etc.)
* Add more charts to show a user's top 3 characters and the win/lose percentages for their top 3 characters.
* Implement Bootstrap to style the website.
* Add search bar for users to look up other players and view their profile/match overview.
* Allow users to upload a profile picture/icon.
* Add profile fields for users to add ways to reach them (Twitch, Discord, Twitter, etc.)
* Have two views for the match history:
  * Display (current view) - shows character pictures
  * Simplified - only shows character name and the result in a table format
* Mobile friendly to allow users to simply screenshot their profile page and share their Smatch card.

## Challenges

* After editing an added match, the matches were no longer showing up correctly. (For example: match id #1 was showing the character used and the result from match id #2) -  ***FIXED***
* Editing a match would not work if the character remained unchanged (i.e., only the match result is being edited). Very huge shoutout and thank you to Fatima for helping me fix this issue that turned out to be so simple! - ***FIXED***
* Taylor D talked about *scope creep* where you end up spending way more time than you expect on certain goals. Well, this definitely happened. As a result, I had less time to work on styling otherwise I wish I could use a framework or at least made my CSS dryer. - ***LESSON LEARNED***

## Recognitions & Other Notes

* Proud of myself for learning Chart.js and implementing it to the site.
* Inspiration for Smatch drawn from [op.gg](https://na.op.gg/).
  * Example of profile/statistics page: [TSM Bjergsen](https://na.op.gg/summoner/userName=TSM%20Bjergsen)
  * *Side note: Eventually I would want a user's profile to show everything in one page, just like the profile linked above.*

## Created By

Discord: [sal!#0099](https://discord.com/users/267855492242604032)
