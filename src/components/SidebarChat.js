import { Avatar } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import "../styles/SidebarChat.css"
import db from '../firebase'
import {Link} from 'react-router-dom'


function SidebarChat({addNewChat ,id,name}) {

    const[messages,setMessages]=useState([]);
    const[seed, setSeed]=useState('');
    useEffect(()=> {
        setSeed(Math.floor(Math.random()*500))
    },[])

    useEffect(()=>{
        if(id){
        db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
        })
    }},[id])

    const createChat=()=>{
        const roomName=prompt("Please entert the name for chat room");
        if(roomName){
            db.collection("rooms").add({
                name:roomName
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="siderbarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p className="last__message">{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="siderbarChat">
            <h2> Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
