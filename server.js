const express = require("express");
const app = express();
const port = 3008
const postsRoute = require('./routers/postsRoutes');
const serverError = require('./middleware/serverError')
const notFound = require('./middleware/error_404')
const cors = require("cors");

// middleware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// body-parrser
app.use(express.json())
// middlewere
app.use('/api/v1/posts', postsRoute);


// middleware errors
app.use(serverError);
app.use(notFound)


//server stars listening
app.listen(port, () => {
    console.log(`You're running the server on http://localhost:${port}`)
})
