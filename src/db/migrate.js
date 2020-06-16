import { pool } from './connect'

const updatedAtFunction = `
-- This is necessary to auto-update the updated-at timestamp
CREATE OR REPLACE FUNCTION update_changetimestamp_column()
	RETURNS TRIGGER AS
$$
BEGIN
	NEW.updated_at = now();
	RETURN NEW;
END;
$$ language 'plpgsql';
`;

const notesTable = `
CREATE TABLE IF NOT EXISTS notes
(
  google_user_id  TEXT        not null,
	id				      UUID		    not null,
	title    		    TEXT		    not null,
	body      		  TEXT		    not null,
	created_at		  timestamp 	not null 	default current_timestamp,
	updated_at  	  timestamp 	not null 	default current_timestamp,
	primary key (id)
);
-- This is necessary to auto-update the updated_at timestamp
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE
  ON notes
  FOR EACH ROW
EXECUTE PROCEDURE
  update_changetimestamp_column()
`;

const creationQueries = [
  updatedAtFunction,
  notesTable
];

;(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect();

  try {
    await client.query('BEGIN')
    for (const q of creationQueries) {
      await client.query(q);
    }
    await client.query('COMMIT');
  } catch(e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
    pool.end();
  }
})().catch((e) => {
  console.error(e.stack);
});
