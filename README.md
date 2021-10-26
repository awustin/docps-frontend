# DOCPS

This project was bootstrapped with Create React App and Craco to overwrite some default configurations. 

## Requirements

You need these packages installed globally:
- Craco (npm install -g craco)
- Firebase CLI (npm install -g firebase-tools)
- An HTTP server (npm install -g serve)

## Development

- Run command yarn start, and make changes to the project. 

## Build and Manual deployment

- In the root folder, run the command yarn build.
- Once finished, run firebase deploy
That's all! :)

## GitHub Actions for CI

Still working to support this.



### Available Scripts

#### `yarn start`

Using craco start

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.