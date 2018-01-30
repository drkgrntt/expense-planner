# MERRN-Simple-Starter

MERRN-Simple-Starter is my own simple spin on Create-React-App. MERRN stands for "Mongo Express React Redux Node." I created it as a shortcut for myself because this is a stack I often use. It is very easy to get started with it.

## Getting Started
### Prerequisites
#### MongoDB
MERRN-Simple-Starter uses MongoDB as its database. That being said, it uses a local Mongo shell for development. Be sure to download Mongo and run the local database before running your application.

#### Fire It Up
After you clone the repository, simply run `npm install` in the command line to install the dependencies from the `package.json` file into the `node_modules` folder. Next, change into the `client` directory and run `npm install` to install those separate dependencies. Once all the dependencies are installed, move back to the main server directory and run `npm run dev` to start the server and client sides (be sure nodemon is installed globally for the script to run properly). There is not much to the initial application (an h1 and a couple of paragraphs), so that's where you come in.

## Included with MERRN-Simple-Starter
### Redux
MERRN-Simple-Starter comes equipped with Redux, along with `actions` and `reducers` directories, and `index.js` files in each of them. `/actions/index.js` is equipped with Axios to communicate with the back end and Redux-Thunk to handle asynchronous actions. `/reducers/index.js` is equipped with Redux-Form.

### React-Router-DOM
MERRN-Simple-Starter uses React-Router-DOM to handle the virtual DOM. Within the `components` directory, `App.js` is set up to handle routes. 

### Heroku Setup
MERRN-Simple-Starter comes equipped to deploy to Heroku. Before deployment, be sure to set up your database with [MLab](https://mlab.com) and set your environment variables in your Heroku settings.