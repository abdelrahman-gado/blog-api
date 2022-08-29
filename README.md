# blog-api

This is a Simple REST API for Blog website using Expressjs, Passportjs and JWT.

This API is consist of two main parts:
 1. for the clients of blog to display all published posts (for people that want to read and comment on your posts)
 2. for the user of blog to build the posts (for author to write, edit and publish your posts)

The endpoints of API
 * for people that want to read and comment on your posts 
    1. GET   /display/posts
    2. GET   /display/posts/:postId
    3. GET   /display/posts/:postId/comments
    4. POST  /display/posts/:postId/comments           --> to create a new comment on a specific post
    5. GET   /display/posts/:postId/comments/:commentId
 
 * for author to write, edit and publish your posts
    1. GET    /create/posts
    2. POST   /create/posts            --> create new post
    3. GET    /create/posts/:postsId
    4. PUT    /create/posts/:postId    --> update specific post
    5. DELETE /create/posts/:postId    --> delete specific post
    
    
 ### To install the project
* clone it
* install dependencies using ``` npm install ```
* run the project ``` npm run devstart ```

### Database Models
![blog-api DB model digram](https://user-images.githubusercontent.com/88284519/187178942-599e4494-c4ad-49ba-b720-954734a31b6d.png)

### In this project, i used:
* node
* express
* passportjs
* passport-local
* passport-jwt
* cors
* express-validator package
* mongoDB
* mongoose ODM
* date-fns
* nodemon
* dotenv
* jsonwebtoken
* bcrypt
    
