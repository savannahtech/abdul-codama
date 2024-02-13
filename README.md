# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Goal of project

The goal is to cerate react app which will allow users to login with phone number and create/update profile.

# Feature

1. Login/Authentication
2. Confirmation of code sent to phone number
3. View profile
4. Create/update Profile
5. Logout

# Technologies

1. React, javascript/Typescript
2. Firebase
3. Zustand
4. Tailwind, radix-ui
5. Yup , react-hook-form

Hosted on Heroku [react-web](https://savannah-react-test-app-b066dca511da.herokuapp.com/).

**Note: please setup .env , for testing purpose the .env may be included in the project folder !**

REACT_APP_API_KEY=

REACT_APP_AUTH_DOMAIN=

REACT_APP_PROJECT_ID=

REACT_APP_STORAGE_BUCKET=

REACT_APP_MESSAGING_SENDER_ID=

REACT_APP_APP_ID=

REACT_APP_MEASUREMENT_ID=

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## `Test phone numbers and verification codes, Note: each number can be used one time `

**Note: Test phone numbers and verification codes, Note: each number can be used one time !**

**Note: to use your personal number check the format. eg +233123454444 !**

+233123454444 - code: 123456

+233123455555 - code: 123456

+233123457777 - code: 123456

+233123458888 - code: 123456

+233123459999 - code: 123456

## `Firstore Security rules`

rules_version = '2';

service cloud.firestore {

    match /databases/{database}/documents {

        function isOwner(id){
            return request.auth!=null && request.auth.token.phone_number == id;
        }

        //restrict all access
        match /{document=**} {
            allow read, create, update, delete: if false;
        }

        match /users/{userId} {
            allow get, create, update: if isOwner(userId);
        }

    }

}

# `firebase firestore db screenshoot inside public/firestore.jpg `

Remote firestore jpg image [firestore](https://drive.google.com/file/d/16JBd3FdyysUAut1_bTEyDmOsyuAjZrXG/view?usp=sharing)

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
