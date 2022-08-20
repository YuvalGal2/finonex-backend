const express = require('express');
const axios = require("axios");
const app = express();
const cors = require('cors');

const options = {
    origin: ['http://localhost:4200','http://localhost:8080'],
}
app.use(cors(options))

const photos = require('./photos')(app,axios);
const posts = require('./posts')(app,axios);
app.listen(8080, () => {
    console.log("Basic backend is running on port 8080");
})
