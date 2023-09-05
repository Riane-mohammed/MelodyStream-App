const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const uploadImage = multer({ dest: 'uploads/images/Profiles/' });
const uploadMusicCover = multer({ dest: 'uploads/images/MusicCover/' });
const uploadPlaylistCover = multer({ dest: 'uploads/images/PlaylistCover' });
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

app.post('/signup', uploadImage.single('profileImage'), (req, res) => {
    const { name, email, password } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    const insertSql = 'INSERT INTO users (username, email, password, profileImage) VALUES (?, ?, ?, ?)';

    db.query(insertSql, [name, email, password, profileImage], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.json({ error: 'An error occurred while processing your request.' });
        }

        return res.json({ message: 'User registered successfully' });
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

app.get('/Artists/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE Role=3 AND NOT id=?";
    db.query(sql,[userId],(err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/PopularArtists', (req, res) => {
    const userId = req.params.id;
    const sql = `
        SELECT
            u.*,
            SUM(s.views_count) AS total_views
        FROM
            users u
        LEFT JOIN
            songs s ON u.id = s.artist
        WHERE
            u.Role = 3
        GROUP BY
            u.id, u.username, u.Role, u.email, u.password, u.Gender, u.profileImage, u.created_at
        ORDER BY total_views DESC
    `;
    db.query(sql,[userId],(err, data) => {
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

app.get('/PlaylistsSongsNumber', (req, res) => {
    const sql = " SELECT playlist_id, COUNT(*) FROM playlist_songs GROUP BY playlist_id;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/AllPlaylistsLikes', (req, res) => {
    const sql = " SELECT playlistId, COUNT(*) FROM playlist_likes GROUP BY playlistId";
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

app.put('/orders/:id/:state', (req, res) => {
    const state = req.params.state;
    const userId = req.params.id;

    const sql = "UPDATE `orders` SET `state`=? WHERE OrderId = ?";

    db.query(sql, [state , userId], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: 'order information updated successfully' });
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

app.get('/orders', (req, res) => {
    const sql = `
    SELECT orders.*, users.username AS username FROM orders 
    JOIN users ON orders.OrderId = users.id;
    `

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/PopularSongs', (req, res) => {
    const sql = `
    SELECT songs.*, users.username AS username FROM songs 
    JOIN users ON songs.artist = users.id
	ORDER BY views_count DESC
    `

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/allsongs/:artistid', (req, res) => {
    const artistId = req.params.artistid;
    
    const sql = `SELECT * FROM songs WHERE artist = ?`;

    db.query(sql, [artistId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/ViewsNumber/:artistid', (req, res) => {
    const artistId = req.params.artistid;
    
    const sql = `SELECT SUM(views_count) as views FROM songs WHERE artist = ?`;

    db.query(sql, [artistId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/FollowersNumber/:artistid', (req, res) => {
    const artistId = req.params.artistid;
    
    const sql = `SELECT COUNT(*) FROM follows WHERE followingId=?`;

    db.query(sql, [artistId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/allplaylists/:artistid', (req, res) => {
    const artistId = req.params.artistid;
    
    const sql = `SELECT * FROM playlists WHERE created_by=?`;

    db.query(sql, [artistId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/Playlist/:playlistid', (req, res) => {
    const playlistid = req.params.playlistid;
    
    const sql = `SELECT * FROM playlists WHERE playlist_id=?`;

    db.query(sql, [playlistid], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/LikedPlaylist/:userid', (req, res) => {
    const userid = req.params.userid;
    const sql = `
        SELECT playlist_likes.*, playlists.*
        FROM playlist_likes
        JOIN playlists ON playlist_likes.playlistId = playlists.playlist_id
        WHERE playlist_likes.UserId = ?
    `;

    db.query(sql, [userid], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/Songs/:playlistid', (req, res) => {
    const playlistid = req.params.playlistid;
    
    const sql = `
        SELECT
            playlist_songs.*,
            songs.*,
            users.username
        FROM
            playlist_songs
        JOIN
            songs ON playlist_songs.song_id = songs.song_id
        JOIN
            users ON songs.artist = users.id
        WHERE 
            playlist_songs.playlist_id = ?;
    `;

    db.query(sql, [playlistid], (err, data) => {
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

app.delete('/songFromPlay/:songid/:playid', (req, res) => {
    const songId = req.params.songid;
    const playid = req.params.playid;
    const sql = 'DELETE FROM `playlist_songs` WHERE song_id = ? AND playlist_id= ?';

    db.query(sql, [songId,playid], (err, result) => {
        if (err) {
            console.error('Error deleting song:', err);
            return res.status(500).json({ message: 'An error occurred while deleting the song.' });
        }
        return res.json({ message: 'Song deleted successfully' });
    });
});

app.delete('/Playlists/:id', (req, res) => {
    const playlistid = req.params.id;
    const sql = 'DELETE FROM Playlists WHERE playlist_id = ?';

    db.query(sql, [playlistid], (err, result) => {
        if (err) {
            console.error('Error deleting playlist:', err);
            return res.status(500).json({ message: 'An error occurred while deleting the playlist.' });
        }
        return res.json({ message: 'playlist deleted successfully' });
    });
});

app.post('/addSongs', uploadAudio.single('audio'), uploadMusicCover.single('image'), (req, res) => {
    const { title, artist, duration } = req.body;
    const audioFile = req.file ? req.file.filename : null;
    const imageFile = req.file ? req.file.filename : null;

    if (!title || !artist || !duration || !audioFile || !imageFile) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const insertSql = 'INSERT INTO `songs`( `title`, `artist`, `duration`, `file`, `Image`) VALUES (?, ?, ?, ?, ?)';

    db.query(insertSql, [title, artist, duration, audioFile, imageFile], (err, result) => {
        if (err) {
            console.error('Error inserting song:', err);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }

        return res.status(201).json({ message: 'Song added successfully' });
    });
});


app.get('/Song/:id', (req, res) => {
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

app.get('/playlists', (req, res) => {
    const sql = `
        SELECT playlists.*, users.username AS username FROM playlists 
        JOIN users ON playlists.created_by = users.id;
    `

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/PopularPlaylists', (req, res) => {
    const sql = `
        SELECT
            p.*,
            COUNT(pl.UserId) AS num_likes
        FROM
            playlists p
        LEFT JOIN
            playlist_likes pl ON p.playlist_id = pl.playlistId
        GROUP BY
            p.playlist_id, p.title, p.created_by, p.CoverImage, p.created_at
        ORDER BY num_likes DESC
    `

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/checkFollowStatus/:artistId/:userId', (req, res) => {
    const { artistId, userId } = req.params;

    const sql = "SELECT COUNT(*) AS count FROM follows WHERE userId = ? AND followingId = ?";

    db.query(sql, [userId, artistId], (err, result) => {
        if (err) {
            console.error("Error fetching follow status:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        const isFollowing = result[0].count > 0;
        return res.status(200).json({ isFollowing });
    });
});

app.get('/checkOrderStatus/:userId', (req, res) => {
    const {userId } = req.params;

    const sql = "SELECT COUNT(*) AS count FROM Orders WHERE OrderId = 8";

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching Order status:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        const isOrdering = result[0].count > 0;
        return res.status(200).json({ isOrdering });
    });
});

app.get('/checkLikeStatus/:playlistId/:userId', (req, res) => {
    const { playlistId, userId } = req.params;

    const sql = "SELECT COUNT(*) AS count FROM playlist_likes WHERE userId = ? AND playlistId = ?";

    db.query(sql, [userId, playlistId], (err, result) => {
        if (err) {
            console.error("Error fetching Like status:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        const isLiked = result[0].count > 0;
        return res.status(200).json({ isLiked });
    });
});

app.get('/checkLikeStatusSong/:SongId/:userId', (req, res) => {
    const { SongId, userId } = req.params;

    const sql = "SELECT COUNT(*) AS count FROM Song_likes WHERE userId = ? AND SongId = ?";

    db.query(sql, [userId, SongId], (err, result) => {
        if (err) {
            console.error("Error fetching Like status:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        const isLiked = result[0].count > 0;
        return res.status(200).json({ isLiked });
    });
});

app.post('/followUser', (req, res) => {
    const { userId, followerId } = req.body;

    console.log('Received followUser request:', userId, followerId);

    const sql = "INSERT INTO follows (userId, followingId) VALUES (?, ?)";

    db.query(sql, [userId, followerId], (err, result) => {
        if (err) {
            console.error("Error following artist:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        console.log('Follow successful');
        return res.status(200).json({ message: "Follow successful" });
    });
});

app.post('/Settings', (req, res) => {
    const { userId} = req.body;

    const sql = "INSERT INTO `orders`(`OrderId`) VALUES (?)";

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }
        return res.status(200).json({ message: "add successful" });
    });
});

app.post('/LikePlaylist', (req, res) => {
    const { userId, playlistId } = req.body;

    console.log('Received followUser request:', userId, playlistId);

    const sql = "INSERT INTO playlist_likes (UserId,playlistId) VALUES (?,?)";

    db.query(sql, [userId, playlistId], (err, result) => {
        if (err) {
            console.error("Error Liking Playlist:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        console.log('Like successful');
        return res.status(200).json({ message: "Like successful" });
    });
});

app.post('/LikeSong', (req, res) => {
    const { userId, songId } = req.body;

    console.log('Received followUser request:', userId, songId);

    const sql = "INSERT INTO Song_likes (UserId,SongId) VALUES (?,?)";

    db.query(sql, [userId, songId], (err, result) => {
        if (err) {
            console.error("Error Liking Song:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        console.log('Like successful');
        return res.status(200).json({ message: "Like successful" });
    });
});

app.delete('/unfollowUser/:userId/:followingId', (req, res) => {
    const userId = req.params.userId;
    const followingId = req.params.followingId;

    const sql = "DELETE FROM follows WHERE userId = ? AND followingId = ?";

    db.query(sql, [userId, followingId], (err, result) => {
        if (err) {
            console.error("Error unfollowing artist:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ message: "Unfollow successful" });
    });
});

app.delete('/unLikePlaylist/:userId/:playlistId', (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const sql = "DELETE FROM playlist_likes WHERE userId = ? AND playlistId = ?";

    db.query(sql, [userId, playlistId], (err, result) => {
        if (err) {
            console.error("Error unliking playlist:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ message: "Unlike successful" });
    });
});

app.delete('/unLikeSong/:userId/:SongId', (req, res) => {
    const userId = req.params.userId;
    const SongId = req.params.SongId;

    const sql = "DELETE FROM Song_likes WHERE userId = ? AND SongId = ?";

    db.query(sql, [userId, SongId], (err, result) => {
        if (err) {
            console.error("Error unliking Song:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ message: "Unlike successful" });
    });
});


app.get('/getFollowings/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT follows.*, users.*
        FROM follows
        JOIN users ON follows.followingId = users.id
        WHERE follows.userId = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching followings:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ followings: result });
    });
});

app.get('/getLikedSongs/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT song_likes.*, songs.*
        FROM song_likes
        JOIN songs ON song_likes.songId = songs.song_id
        WHERE song_likes.userId = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching Liked Songs:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ LikedSongs : result });
    });
});

app.get('/getLastestPlayedSongs/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT usersong_list.*, songs.*
        FROM usersong_list
        JOIN songs ON usersong_list.songId = songs.song_id
        WHERE usersong_list.userId = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching lastest played Songs:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ LatestPlayed : result });
    });
});

app.post('/AddMyplaylists', uploadPlaylistCover.single('coverImage'), (req, res) => {
    const { title, created_by } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const insertSql = `
        INSERT INTO playlists (title, created_by, CoverImage)
        VALUES (?, ?, ?);
    `;

    const values = [title, created_by, coverImage];

    db.query(insertSql, values, (err, result) => {
        if (err) {
            console.error('Error creating a new playlist:', err);
            return res.status(500).json({ message: 'An error occurred while creating the playlist.' });
        }

        return res.json({ message: 'Playlist created successfully' });
    });
});

app.post('/add-song', uploadMusicCover.single('image'), uploadAudio.single('audio'), async (req, res) => {
    try {
        const { title, duration } = req.body;
        const audioFile = req.file; 
        const coverImage = req.file; 
        const result = await db.query('INSERT INTO songs (title, duration, file, Image) VALUES (?, ?, ?, ?)', [title, duration, audioFile.filename, coverImage.filename]);

        if (result.affectedRows === 1) {
            res.status(201).json({ message: 'Song added successfully' });
        } else {
            res.status(500).json({ error: 'Failed to add the song' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/saveUserSong', (req, res) => {
    const { userId, songId } = req.body;

    const query = 'INSERT INTO usersong_list (UserId, songId) VALUES (?, ?)';
    db.query(query, [userId, songId], (err, result) => {
        if (err) {
        console.error('Error inserting data into database:', err);
        return res.status(500).json({ message: 'Database error' });
        }

        return res.status(200).json({ message: 'Data saved successfully' });
    });
});

app.post('/addSongToPlay', (req, res) => {
    const { playlistId , songId } = req.body;

    const query = 'INSERT INTO `playlist_songs`(`playlist_id`, `song_id`) VALUES (?, ?)';
    db.query(query, [playlistId,songId], (err, result) => {
        if (err) {
        console.error('Error inserting data into database:', err);
        return res.status(500).json({ message: 'Database error' });
        }

        return res.status(200).json({ message: 'Data saved successfully' });
    });
});

app.post('/saveUserSong', (req, res) => {
    const { userId, songId } = req.body;

    const sql = 'INSERT INTO usersong_list (UserId, songId) VALUES (?, ?)';

    db.query(sql, [userId, songId], (err, result) => {
        if (err) {
            console.error("Error add song user:", err);
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }

        return res.status(200).json({ message: "add successful" });
    });
});

app.listen(8081, () => {
    console.log("Listening");
});