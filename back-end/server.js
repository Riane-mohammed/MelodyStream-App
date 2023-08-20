const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const uploadImage = multer({ dest: 'uploads/images/Profiles/' });
const uploadAudio = multer({ dest: 'uploads/Audios/' });

app.use('/uploads', express.static('uploads'));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'melodystream'
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        if (data && data.length > 0) {
            const user = data[0];
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ error: "Invalid email or password." });
        }
    });
});


app.get('/userid', (req, res) => {
    const sql = "SELECT content FROM userid WHERE id = ?";
    const userId = 1; 
    
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error("Error fetching content from userid table:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Content not found' });
        }
        return res.json({ content: data[0].content });
    });
});

app.put('/userid', (req, res) => {
    const newContent = req.body.content;

    const updateSql = "UPDATE userid SET content = ? WHERE id = ?";
    const userId = 1;

    db.query(updateSql, [newContent, userId], (err, result) => {
        if (err) {
            console.error("Error updating content in userid table:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json({ message: "Content updated successfully" });
    });
});



app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(data[0]);
    });
});

app.put('/users/:id', uploadImage.single('profileImage'), (req, res) => {
    const userId = req.params.id;
    const { email, password, username } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    const sql = `
        UPDATE users
        SET email = ?, password = ?, username = ?, profileImage = ?
        WHERE id = ?;
    `;

    const values = [email, password, username, profileImage, userId];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: 'User information updated successfully' });
    });
});



app.post('/add-song', uploadAudio.single('file'), (req, res) => {
    const { title, artist, album, genre } = req.body;
    const file = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO songs (title, artist, album, genre, file)
        VALUES (?, ?, ?, ?, ?);
    `;

    const values = [title, artist, album, genre, file];

    db.query(sql, values, (err, result) => {
        if (err) {
        return res.json(err);
        }
        return res.json({ message: 'Song added successfully' });
    });
});

app.get('/songs/:id', (req, res) => {
    const songId = req.params.id;
    const sql = "SELECT * FROM songs WHERE song_id = ?";

    db.query(sql, [songId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        return res.json(data[0]);
    });
});

app.listen(8081, () => {
    console.log("Listening");
});
