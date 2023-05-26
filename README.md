# Node.js Voting App
A web application where users can log in, create polls, and vote on polls other users have created. Includes social logins using Twitter and Facebook.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

* MongoDB
* NPM/Node.js


### Installing & Running

#### Install dependencies 
`npm install`

#### Run the application
`npm start` starts the node server, then open the localhost site specified in the output in a web browser.

## Running the tests

`npm test`

## Deployment

This project is currently set up to deploy with Heroku.

Deployment to Heroku requires a Heroku account and the heroku command line tools installed.

The steps are as follows:

  1) `heroku create`
  2) `heroku addons:create mongolab`
  3) `git push heroku master`
  4) `heroku open`





## Built With

* [generator-angular-fullstack](https://github.com/angular-fullstack/generator-angular-fullstack) (An old version) - Used to scaffold the app
* [MongoDB](https://www.mongodb.com/) - The database
* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [AngularJS](https://angularjs.org/) - The front end framework
* [Node.js](https://nodejs.org/en/) - The back end run-time
