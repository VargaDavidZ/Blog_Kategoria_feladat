import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bejegyzesek'
}).promise();

app.get('/bejegyzesek', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM bejegyzesek');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving posts ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/bejegyzesek/:bejegyzesId', async (req, res) => {
    try {
        let bejegyzesId = parseInt(req.params.bejegyzesId);
        const [rows, fields] = await db.query('SELECT id, title, content, create_at FROM bejegyzesek WHERE id =?', [bejegyzesId]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no phone with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving posts ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/bejegyzesek', async (req, res) => {


    try {
        let postData = [req.body.title, req.body.content, "2004-04-12"];//placeholder date

        if (postData[0].length < 1) {
            return res.status(400).json({ error: "A post must have a title" });
        }
        if (postData[1].length < 1) {
            return res.status(400).json({ error: "A post must have content" });
        }
        

        const [rows, fields] = await db.query('INSERT INTO bejegyzesek (title, content, create_at) VALUES (?,?,?)', postData);
        res.status(200).json({ message: 'Phone successfully added!' });


    } catch (error) {
        console.error(`Error retrieving posts ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/bejegyzesek/:bejegyzesId', async (req, res) => {
    try {
        let bejegyzesId = parseInt(req.params.bejegyzesId);
        const [rows, fields] = await db.query('DELETE FROM bejegyzesek WHERE id =?', [bejegyzesId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Post not found" });
        } else {
            res.status(200).json({ message: "Post successfully removed" });
        }

    } catch (error) {
        console.error(`Error retrieving bejegyzesek ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(3000);
