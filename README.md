# Note Server

This express app has the following features:

- OAuth signin with Google
- Create, read, update, and delete your notes
- Optional query parameters to sort and filter notes


# Routes
### Notes
`GET /:userId`
- Returns all notes for a given `userId`
- Accepts optional query parameters:
  - `start=<number>` returns notes starting from `number`
  - `limit=<number>` returns first `number` notes from query
  - `order=asc` or `$order=desc` returns notes in ascending or descending order by time created (defaults to `desc`)

`GET /:userId/note/:id`
- Returns note for `userId` where note id is `id`

`POST /:userId/note`
- Created note for `userId`
- Requires request body in format `{ title: 'Title', body: 'Body'  }`

`PUT /:userId/note/:id`
- Update note for `userId` where note id is `id`
- Requires request body in format `{ title: 'Title', body: 'Body'  }`

`DELETE /:userId/note/:id`
- Delete note for `userId` where note id is `id`


# Setting up the dev environment
## Download and install Postgres (Mac)
`brew install postgresql` https://formulae.brew.sh/formula/postgresql

## Create the database for development
Once postgres is installed and running, get into the shell by running `psql postgres`
Create the database by running
```sql
CREATE DATABASE note_service;
CREATE USER note_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE note_service TO note_user;
```

## Generate Google Client Id and Client Secret
https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials
- When creating your credentials, make sure to add `http://localhost:3030/auth/google/callback` as an Authorized redirect URI

## Create environment variables
This app uses dotenv to configure its environment
https://www.npmjs.com/package/dotenv

Create a new `.env` at the root of the project based off `example.env` (provided)

## Install dependencies
`yarn install`

## Create postgres tables
`yarn migrate`

## Start development server with hot reload
`yarn start`

## Build for production
`yarn build`
