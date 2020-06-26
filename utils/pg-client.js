import {Client} from "pg";

export const client = new Client({
    connectionString: process.env.PG_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
