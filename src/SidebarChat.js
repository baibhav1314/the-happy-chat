import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const createChat = () => {
        console.log("hiii");
    };

    return !addNewChat ? (
        <Link to={`/`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/01.svg`} />
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
