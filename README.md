# Note Server

## Download and install Postgres
`brew install postgresql` https://formulae.brew.sh/formula/postgresql

## Create the database
Once postgres is isntalled and running, get into the shell by runnin psql postgres
Create the database by running
```sql
CREATE DATABASE note_service;
CREATE USER note_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABSE note_service TO note_user;
```

## Install dependencies
`yarn install`

## Create postgres tables
`yarn migrate`

## Start development server with hot reload
`yarn start`

## Build for production
`yarn build`
