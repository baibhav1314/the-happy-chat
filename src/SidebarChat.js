import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import db from "./firebase";
import {
    collection,
    addDoc,
    query,
    doc,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            const q = query(
                collection(doc(db, "rooms", id), "messages"),
                orderBy("timestamp", "desc")
            );
            onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");

        if (roomName) {
            addDoc(collection(db, "rooms"), {
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    );
}

export default SidebarChat;
