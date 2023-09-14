const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data.js'); // Ensure this path is correct
const connectDB = require('./config/db.js');
const UserRoutes=require('./routes/UserRoute.js');
const ChatRoutes=require('./routes/chatRoute.js');
const {notfound,errorHandler}=require('./middlewares/errorMiddleware.js');
dotenv.config();
const app = express();
connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json());
app.use('/api/chat',ChatRoutes)
app.use('/api/user',UserRoutes)


const PORT = process.env.PORT || 5000;

app.use(notfound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port   http://localhost:${PORT}`);
});
