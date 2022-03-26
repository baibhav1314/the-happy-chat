import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, []);

    const createChat = () => {
        console.log("hiii");
    };

    return !addNewChat ? (
        <Link to={`/`}>
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
