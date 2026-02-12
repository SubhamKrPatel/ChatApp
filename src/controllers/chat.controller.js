const Chat = require("../models/chat.model");
const Thread = require("../models/thread.model");
const asyncHadler = require("../utils/asyncHandler");
const { getIO, onlineUsers } = require("../socket/socket");


//send message
exports.sendMessage = asyncHadler(async (req, res) => {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message) {
        return res.status(400).json({ message: "Missing fields" });
    }

    let thread = await Thread.findOne({
        participants: { $all: [sender, receiver] }
    });

    if (!thread) {
        thread = new Thread({ participants: [sender, receiver], messages: [] });
    }

    const chat = new Chat({
        sender,
        receiver,
        message,
        thread: thread._id
    });

    thread.lastMessage = message;
    thread.lastMessageTime = new Date();

    await Promise.all([thread.save(), chat.save()]);

    const receiverSocketId = onlineUsers.get(receiver);
    if (receiverSocketId) {
        getIO().to(receiverSocketId).emit("new_message", chat);
    }

    res.status(201).json(chat);
});

//Get messages by thread
exports.getMessages = asyncHadler(async (req, res) => {
    const { threadId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const messages = await Chat.find({ thread: threadId })
        .sort({ createdAt: 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    res.status(200).json(messages);
});