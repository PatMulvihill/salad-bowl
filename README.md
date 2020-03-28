Salad Bowl
=======

React + Firebase implementation for the three round team guessing game Salad Bowl


### Running the project (Client-side only, using dev firebase server)

- Install [node.js](https://nodejs.org/)
- Clone this project, enter the cloned folder and install dependencies with `npm install`
- Run the project with `npm run start` and access it at `http://localhost:4000`

### Running the project (Using your own firebase project)

- Install [node.js](https://nodejs.org/)
- Install [firebase-tools](https://firebase.google.com/docs/cli)
- Clone this project, enter the cloned folder and install dependencies with `npm install`
- Setup a new firebase project with the `firebase init` command and follow the instructions (select only the feature `database`. Use the default values for everything and don't overwrite anything)
- Create a new web app with the command `firebase apps:create WEB`. The command will output the created `App Id`
- Execute the command `firebase apps:sdkconfig WEB <created app id>` to get the complete app configuration
- Copy the configuration to the file `env/dev.js`. You don't need to fill all fields.
- Access your firebase project in the [firebase console](https://console.firebase.google.com/) and enable anonymous authentication (Authentication → Sign-in method → Anonymous)
- Deploy firebase database security rules `firebase deploy --only database`
- Run the project with `npm run start` and access it at `http://localhost:4000`
