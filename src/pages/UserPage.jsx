import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '../features/messages.js';
import { setUsers } from '../features/users.js';


function UserPage() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    let { username } = useParams();
    let message = useRef();
    const conversations = useSelector(state=>state.conversations.value.conversations);
    const users = useSelector(state=>state.users.value.users);
    const currentUser = useSelector(state=>state.users.value.currentUser);
    const isLoggedIn = useSelector(state=>state.users.value.isLoggedIn);
    const user = users.filter(x=>x.username===username)[0];
    function handleSend(){
        if (currentUser.blackList.includes(user.id)) alert(`you cannot send messages to ${user.username}, because this user is blocked.`)
        else if (message.current.value) sendMessage();
    }
    function sendMessage(){
        let newConversations = [...conversations];
        if (conversations.filter(x=>x.participants.includes(currentUser.id) && x.participants.includes(user.id)).length) {
            newConversations = newConversations.map(conversation => {
                if (conversation.participants.includes(currentUser.id) && conversation.participants.includes(user.id)) {
                return {
                    ...conversation, 
                    messages:[
                        ...conversation.messages,
                        {
                            messageId: Date.now(),
                            senderId: currentUser.id,
                            text:message.current.value
                        }
                    ]}
                } else {
                    return conversation
                }
                
            });
        } else {
            newConversations = [...newConversations, {
                participants:[currentUser.id, user.id],
                messages:[
                    {
                        messageId: Date.now(),
                        senderId: currentUser.id,
                        text: message.current.value,
                    }
                ]
            }]
        }
        message.current.value = '';
        dispatch(setConversations(newConversations));
        nav('/messenger')
    }
    function deleteUser(){
        let newUsers = users.filter(x=>x.id!==user.id);
        dispatch(setUsers(newUsers));
        let newConversations = conversations.map(conversation=>{
            if (conversation.participants.includes(user.id)) return {...conversation, participants: conversation.participants.map(x=>x===user.id ? 404 : x)}
            return conversation;
        });
        dispatch(setConversations(newConversations));
        console.log(newConversations);
        nav('/messenger');
    }

    return (
        <div className='UserPage'>
            {isLoggedIn ? <>
                    <div className='left'>
                        <div className='image' style={{backgroundImage:`url('${user.image}')`}}></div>
                        {user.type==='regular' && currentUser.type==='admin' && <button onClick={deleteUser} className='delete'>Delete user</button>}
                    </div>
                <div className='info'>
                    <h2>{user.type}{user.type==='regular' && ' user'}</h2>
                    <h2>username: {user.username}</h2>
                    <h2>{user.email}</h2>
                    <textarea ref={message} placeholder={`your message to ${user.username}`}></textarea>
                    <button onClick={handleSend}>message {user.username}</button>
                </div>
                </> : 'No peaking! please login ;)'}
        </div>
    );
}

export default UserPage;