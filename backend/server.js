const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js"); // Ensure this path is correct
const connectDB = require("./config/db.js");
const UserRoutes = require("./routes/UserRoute.js");
const ChatRoutes = require("./routes/chatRoute.js");
const MessageRoutes = require("./routes/messageRoutes.js");
const { notfound, errorHandler } = require("./middlewares/errorMiddleware.js");
dotenv.config();
const app = express();
connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/chat", ChatRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/message", MessageRoutes);

const PORT = process.env.PORT || 5000;

app.use(notfound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port   http://localhost:${PORT}`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");

  socket.on("setup", (userData) => {
    if (!userData) return;
    socket.join(userData._id);
    console.log("user joined", userData._id);
    socket.emit("connected");
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("joined room", room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessage) => {
    // console.log("new message", newMessage);
    let chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) {
        console.log("same user");
        return;
      }
      console.log("emitting");
      socket.in(user._id).emit("message received", newMessage);
    });
  });
socket.off("setup",()=>{
  console.log("setup off")
  socket.leave(userData._id)
})

});
