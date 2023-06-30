# caption-contest Codecademy Project

Simple Node/Express API to retrieve and caption photos. Users can view a list of photos, then create an account to leave captions on photos and add photos. Users can also delete their own captions and photos, and update their account information. If registered as a superUser, users can also delete other users' captions, profiles and photos.

## Dependencies
- NPM
- NodeJS/Express.js
- PostgreSQL Server
- Sequelize

## Info on env and config files

At present, the .env file and config/config.json files are included in the repo for ease of use. In a production environment, these files would be excluded from the repo and the environment variables would be set on the server.

## Running the app locally

Install project dependencies using `npm install`

Before you can run the project locally, you will need to setup the database:
```
Create a database named "photo_caption" in PostgreSQL

Create a user named "postgres" with password "postgres" and grant it access to the "photo_caption" database

```

Run the Sequelize migration scripts using `npm run up`

To add the seeds to the database, run `npm run seed`

You can then run the project with `npm dev start`

Once the app is running locally, you can access the API at `http://localhost:3000/`

## Testing with Swagger
Swagger documentation and testing available at `https://editor.swagger.io/`

Simply upload the `swagger.yaml` file to the Swagger editor to view the documentation and test the API.

For logging in:

If you have seeded the database, you can login with the following credentials:
```
username: test
password: passpass
```

To test with Swagger:
 - Authorize Swagger requests for a logged in user:
   - Copy the auth token saved in the cookie from the response of a `POST /users/login` request
   - Click the Authorize button at the top
   - Paste in the auth token
   - Click Login. You should now be able to make requests as a logged in user.
