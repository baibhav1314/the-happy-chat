import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firebase";
function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => {
            unsub();
        };
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon sx={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
