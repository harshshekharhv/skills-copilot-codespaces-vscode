// Create web server
// 1. Import express
// 2. Create an express app
// 3. Create a GET route for the comments
// 4. Create a POST route for the comments
// 5. Create a PUT route for the comments
// 6. Create a DELETE route for the comments
// 7. Start the server

// 1. Import express
const express = require('express');
const fs = require('fs');

// 2. Create an express app
const app = express();
app.use(express.json());

// 3. Create a GET route for the comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json(JSON.parse(data));
    });
});

// 4. Create a POST route for the comments
app.post('/comments', (req, res) => {
    const newComment = req.body;

    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            res.json({ message: 'Comment added' });
        });
    });
});

// 5. Create a PUT route for the comments
app.put('/comments/:id', (req, res) => {
    const updatedComment = req.body;

    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        const comments = JSON.parse(data);
        const updatedComments = comments.map(comment => {
            if (comment.id === updatedComment.id) {
                return updatedComment;
            }

            return comment;
        });

        fs.writeFile('./comments.json', JSON.stringify(updatedComments, null, 2), (err) => {
            if (err) {
                res.status
                (500).json({ message: 'Internal server error' });
                return;
            }
        });
    });
});