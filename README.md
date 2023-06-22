# FaceRec

FaceRec is a web application using the Clarifai API to identify faces on any image link. It implements profile creation/authentication where users can track how many images they have submitted. 

This particular repository is FaceRec's backend which uses a node server to connect with a SQL database and verify and store user information. The backend and database are both hosted on OnRender. The frontend can be found at [face-rec-app](https://github.com/ben-sikora/face-recognition-app). 

User information is stored with best security practices and encrypted using the bcrpyt package.

This project was created along an Udemy Course, which can be found [here](https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/)

## To Run The App on Your Machine

Download the repository on your computer. 

### `npm install`
Downloads the necessary npm packages to run the project. 

### `node server.js`
Starts the server. 