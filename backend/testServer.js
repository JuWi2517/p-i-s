const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send('Minimal server is working');
});

const PORT = 3001;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
