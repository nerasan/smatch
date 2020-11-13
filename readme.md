# SSBUstats

## Routes

https://ssbustats.com

#### Users

* POST /user - create (create) - creates a user with the POST payload (form) data -- DONE
* GET /user/edit/:id - edit (read) - shows a form for editing your user profile
* PUT /user/:id - update (update) - updates the data for your user profile
* GET /user/:id - show (read) - list information about a specific user (i.e. /user/tsm_leffen) -- *not sure this is possible since findOrCreate cannot handle restricting both email and username*

#### Characters

* GET /characters - index (read) - lists all characters -- DONE
* GET /characters/:id - show (read) - list information about a specific character (i.e. /characters/link) -- DONE

#### Matches

* GET /matches - index (read) - lists all matches -- DONE
* GET /matches/new - new (read) - shows form to make a new match result -- DONE
* POST /matches - create (create) - creates a match with the POST payload (form) data -- DONE
* GET /matches/:id - show (read) - list information about a specific match (i.e. /matches/1) -- is this needed?
* GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)
* PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)
* DELETE /matches/:id - destroy (delete) - deletes the match with the specified id (i.e. /matches/1)

#### To-Do

* Create a user.js controllers to edit the user data and show profiles (if this is possible -- has to be by userId)
* Create a match.js controllers to show all matches for that user, create and/or edit matches, delete matches.

#### Issues to fix

* Look into the double criteria for findOrCreate in order to view other people's profiles by username -- if it does not work, just have it by userId
* the a href tags in character show page do not work even though it is correct?
* Figure out the date formatting
* Edit route works but now the matches index page showing all matches shows based on database updates so the most updated match is at the bottom
