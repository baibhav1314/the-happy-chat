import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
    AttachFile,
    MoreVert,
    SearchOutlined,
    Mic,
    InsertEmoticon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
                setRoomName(snapshot.data().name);
            });
            const q = query(
                collection(doc(db, "rooms", roomId), "messages"),
                orderBy("timestamp", "asc")
            );
            onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const q = query(collection(doc(db, "rooms", roomId), "messages"));
        addDoc(q, {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                />
                <div className="chat_headerInfo">
                    <h3 className="chat-room-name">{roomName}</h3>
                    <p className="chat-room-last-seen">
                        Last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toLocaleString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p
                        className={`chat_message ${
                            message.name === user.displayName && `chat_receiver`
                        }`}
                    >
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestemp">
                            {new Date(
                                message.timestamp?.toDate()
                            ).toLocaleString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send a Message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;
