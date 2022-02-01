const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const { mongourl } = require('./config')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
var cors = require('cors')

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log("Error in Connecting to Database")
})


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "connection error"));
// db.on("open", () => {
//     console.log("Database Connected")
// });
app.use(cors())
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "POST, PUT, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', noteRoutes);


app.listen(PORT, () =>
    console.log(`Serving on port ${PORT}`)
)