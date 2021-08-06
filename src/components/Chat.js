import { Avatar , IconButton} from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import '../styles/Chat.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import db from '../firebase'
import { useStateValue } from '../StateProvider';
import firebase from 'firebase'

function Chat() {
    const [{user},dispatch]=useStateValue();
    const[seed, setSeed]=useState('');
    const [room,setRoom]=useState("");
    const[input,setInput]=useState("");
    const {roomId}=useParams();
    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot=>(setRoom(snapshot.data().name)));
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshoot=>(setMessages(snapshoot.docs.map(doc=> doc.data())
                )))
        }
    },[roomId])

    useEffect(()=> {
        setSeed(Math.floor(Math.random()*5000))
    },[roomId])
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{room}</h3>
                    <p>
                        last seen{" "}
                        {
                        new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchIcon/>
                    </IconButton>
                    <IconButton>
                    <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                <p className={`chat__message ${message.name===user.displayName && 'chat__receiver'}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                <span className="chat__time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>

                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e=>setInput(e.target.value)}></input>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon/>


            </div>
        </div>
    )
}

export default Chat
