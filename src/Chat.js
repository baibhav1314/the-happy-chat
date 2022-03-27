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
import { doc, onSnapshot } from "firebase/firestore";
import db from "./firebase";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
                setRoomName(snapshot.data().name);
            });
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("chat");
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
                    <p className="chat-room-last-seen">Last seen </p>
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
                <p className={`chat_message chat_receiver`}>
                    <span className="chat_name">jncka</span>
                    ndjdsnckjs
                    <span className="chat_timestemp">
                        {new Date().toLocaleString()}
                    </span>
                </p>
                <p className={`chat_message `}>
                    <span className="chat_name">jncka</span>
                    snckjs
                    <span className="chat_timestemp">
                        {new Date().toLocaleString()}
                    </span>
                </p>
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
                        {" "}
                        Send a Message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;
