import { Pool } from "pg";


const conn = new Pool({
    user: "postgres",
    host: "localhost",
    database: "api",
    password: "190518af",
    port: 5432,
});

export default conn;
