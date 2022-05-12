# react-post-auth-app-fullstack
Fullstack Post App with simple authentication. The backend is implemented with PHP communicating with a MySQL database. The backend serves a JSON API with posts and users. The frontend is a React Single Page App fetching JSON from the backend JSON API.  

## Setup Fullstack Post App

### Backend
1. Create a new MySQL database and select the newly created database. 
2. Run the `backend/structure-and-data-dump.sql` file.
3. Customise `$server`, `$username`, `$password` and `$database` in `backend/classes/MySQL.php` with your own credentials.
4. Test the JSON API in the browser, ex. http://localhost:3000/backend, http://localhost:3000/backend/posts and http://localhost:3000/backend/users. The port might differ. 

### Frontend
1. cd into the frontend React project: `cd frontend/`.
2. Run `npm i` to install dependencies.
3. Make sure all fetch calls are using the right `URL` to your backend services. Check all page components in `frontend/src/pages`. 
4. Run `npm start` to run and test your frontend React SPA. 
5. Sign Up or use the following test user: race@eaaa.dk / test01

> Happy Hacking 🎉

