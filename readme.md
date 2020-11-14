# smatch.gg

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
* GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1) -- DONE
* PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1) -- DONE
* DELETE /matches/:id - destroy (delete) - deletes the match with the specified id (i.e. /matches/1) -- DONE

#### To-Do

* Update ERD, wireframe, and readme
* Deploy site

#### Issues to fix
* N/A

#### Stretch Goals
* Look into the double criteria for findOrCreate in order to view other people's profiles by username -- if it does not work, just have it by userId
* Figure out the date formatting -- if have time