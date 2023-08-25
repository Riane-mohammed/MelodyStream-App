const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const uploadImage = multer({ dest: 'uploads/images/Profiles/' });
const uploadMusicCover = multer({ dest: 'uploads/images/MusicCover/' });
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



app.get('/Allusers', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users ORDER BY created_at DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/delete-user/:id', (req, res) => {
    const userId = req.params.id;

    const deleteSql = "DELETE FROM users WHERE id = ?";

    db.query(deleteSql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'An error occurred while deleting the user.' });
        }
        return res.json({ message: 'User deleted successfully' });
    });
});

app.put('/update-user/:id', (req, res) => {
    const userId = req.params.id;
    const { email, password, username, role } = req.body; // Add role

    const updateSql = `
        UPDATE users
        SET email = ?, password = ?, username = ?, Role = ?
        WHERE id = ?;
    `;

    const values = [email, password, username, role, userId]; // Include role in values

    db.query(updateSql, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'An error occurred while updating the user.' });
        }
        return res.json({ message: 'User information updated successfully' });
    });
});

app.get('/usersNumber', (req, res) => {
    const sql = "SELECT COUNT(*) FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/ArtistsNumber', (req, res) => {
    const sql = "SELECT COUNT(*) FROM users WHERE Role=3";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/PlaylistsNumber', (req, res) => {
    const sql = "SELECT COUNT(*) FROM playlists;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/SongsNumber', (req, res) => {
    const sql = "SELECT COUNT(*) FROM songs";
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

app.get('/songs', (req, res) => {
    const sql = `
    SELECT songs.*, users.username AS username FROM songs 
    JOIN users ON songs.artist = users.id;
    `

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/songs/:id', (req, res) => {
    const songId = req.params.id;
    const sql = 'DELETE FROM songs WHERE song_id = ?';

    db.query(sql, [songId], (err, result) => {
        if (err) {
            console.error('Error deleting song:', err);
            return res.status(500).json({ message: 'An error occurred while deleting the song.' });
        }
        return res.json({ message: 'Song deleted successfully' });
    });
});



app.post('/add-songs', uploadAudio.single('file'), uploadMusicCover.single('image'), (req, res) => {
    const { title, artist, album, genre } = req.body;
    const audioFile = req.file ? req.file.filename : null;
    const imageFile = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO songs (title, artist, album, genre, file, image)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const values = [title, artist, album, genre, audioFile, imageFile];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding song to database:', err);
            return res.status(500).json({ message: 'An error occurred while adding the song.' });
        }
        return res.json({ message: 'Song added successfully' });
    });
});




app.get('/songs/:id', (req, res) => {
    const songId = req.params.id;
    const sql = `
        SELECT songs.*, users.username AS username
        FROM songs
        JOIN users ON songs.artist = users.id
        WHERE songs.song_id = ?;
    `

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
