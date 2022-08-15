# Entertainment and Sports Recreational Fantasy (ESRF)

_For a live version of ESRF, click here: [ESRF](https://esrf.herokuapp.com/)._

ESRF is a full stack Fantasy Basketball app that allows users fully customaize the fantasy basketball experience. Logged in users can make fantasy leagues for recreational leagues, tournaments, pick-up games, and more. They can track their stats and compete against one another. The user also has the ability to create their own unique players either deriving from real games or any player they can imagine. This adds another layer of fun and interactivity during basketball games for both the players and spectators to enjoy.

_For a link to the ESRF wiki, click here: [Wiki](https://github.com/KimJonathan426/ESRF/wiki)._


## Previews

<h3 align="center">
  Login Page
</h3>

![Splash Page](https://user-images.githubusercontent.com/100963461/184638716-8afd9c62-1d92-4410-b2a8-b34a319df53b.png)


<h3 align="center">
  Home Page
</h3>

![Home Page](https://user-images.githubusercontent.com/100963461/184639166-b44f5780-d79d-4c60-a7fe-2e3e1491b5f9.png)


<h3 align="center">
  Create League Page
</h3>

![Create League Page](https://user-images.githubusercontent.com/100963461/184639483-3276e028-301a-444c-8ff7-46120b6501a1.png)

<h3 align="center">
  Player List
</h3>

![Player List](https://user-images.githubusercontent.com/100963461/184639855-8de546da-7f58-431e-a3cb-09dc9f29b35c.png)


## Frontend Overview
### React
ESRF's frontend is built off is open source javascript library.

### Redux
ESRF utilizes redux and its state management with constants, thunk actions, thunks, and reducers which allow for backend-frontend communication.

### Javascript
ESRF's frontend was written in javascript.


## Backend Overview
### Flask-SQLAlchemy
ESRF utilized this web-application framework for its functionality primarily in creating web forms and managing ESRF's backend routes via blueprints and other rich functionality.

### Python
ESRF's backend was written in python.

### AWS
Amazon Web Services S3 allowed for convenient upload and storage for league and player photos.

### PostgreSQL
ESRF's database.


## Key Functionality
- Users are able to create, edit, update, and delete leagues.
- Users are able to create, edit, update, and delete their own players in a league.
- Users can update a player stats on the stat sheet to keep track of their performance.
    - These will update the players stats based on the leagues weight of each categories.


## Future Implementations
- Include a team feature
- Include a countdown timer that limits actions once started
- Live Draft
- Different Scoring Systems
- Include additional sports

