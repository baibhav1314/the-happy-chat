import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");

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
                    <p>mkmcxkzmc</p>
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
