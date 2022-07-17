import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '../features/messages';
import { setCurrentUser, setIsLoggedIn, setUsers } from '../features/users';


const MessengerPage = () => {
    const dispatch = useDispatch();
    const newMessage = useRef();
    const isLoggedIn = useSelector(state=>state.users.value.isLoggedIn);
    const users = useSelector(state=>state.users.value.users);
    const currentUser = useSelector(state=>state.users.value.currentUser);
    const conversations = useSelector(state=>state.conversations.value.conversations);
    const [getActiveConversation, setActiveConversation] = useState({messages:[],participants:[]});
    const [getUser, setUser] = useState({});
    function handleSend(){
        if (currentUser.blackList.includes(getUser.id)) alert(`you cannot send messages to ${getUser.username}, because this user is blocked.`)
        else if (newMessage.current.value) sendMessage(newMessage.current.value);
    }
    
    
    function sendMessage(message){
        let newConversations = [...conversations];
        newConversations = newConversations.map(conversation => {
            if (conversation.participants.includes(getActiveConversation.participants[0]) && 
            conversation.participants.includes(getActiveConversation.participants[1])) {
                let x = {
                    ...conversation, 
                    messages:[
                        ...conversation.messages,
                        {
                            messageId: Date.now(),
                            senderId: currentUser.id,
                            text:message
                        }
                    ]}
                setActiveConversation(x);
                return x;
            } else {
                return conversation
            }
        });
        newMessage.current.value = '';
        dispatch(setConversations(newConversations));
    }

    function deleteConversation(conversation){
        setActiveConversation({messages:[],participants:[]});
        dispatch(setConversations(conversations.filter(x=>x!==conversation)));
    }

    function blockUser(userId){
        let newUsers = users.map(user=>{
            if (user.id===currentUser.id && !user.blackList.includes(userId)) {
                sendMessage(`*you have been blocked by ${currentUser.username}*`)  
                user = {...user, blackList:[...user.blackList, userId]}
            }
            if (user.id===userId && !user.blackList.includes(currentUser.id)) 
            user = {...user, blackList:[...user.blackList, currentUser.id]};
            return user;
        });
        console.log(newUsers);
        dispatch(setCurrentUser(newUsers.filter(x=>x.id===currentUser.id)[0]));
        dispatch(setUsers(newUsers));
    }

    return (
        <div className='MessengerPage' >
            {isLoggedIn ? <>
            <div className='left'>
                {conversations.filter(conversation=>conversation.participants.includes(currentUser.id)).map((conversation, i)=>{
                    const userId = conversation.participants.filter(x=>x!==currentUser.id)[0];
                    const user = users.filter(x=>x.id===userId).length ? users.filter(x=>x.id===userId)[0] : users.filter(x=>x.id===404)[0];
                    return(
                        <div key={i} onClick={()=>{setActiveConversation(conversation); setUser(user)}} className='conversationCard'>
                            <div className='image' style={{backgroundImage:`url('${user.image}')`}}></div>
                            <h2>{user.username}</h2>
                            <button className='delete' onClick={()=>deleteConversation(conversation)} >❌</button>
                            <button className='block' onClick={()=>blockUser(userId)} >⛔</button>
                        </div>
                    )
                }
                )}

            </div>
            <div className='right'>
                <div className='chatHistory'>
                    {getActiveConversation.messages.map((message, i)=>
                        <div className='message' key={i} style={message.senderId===currentUser.id ? {flexDirection: 'row-reverse'} : {}}>
                            <div className="image" style={
                                users.filter(x=>x.id===message.senderId).length ? 
                                    {backgroundImage:`url('${users.filter(x=>x.id===message.senderId)[0].image}')`} :
                                    {backgroundImage:`url('${users.filter(x=>x.id===404)[0].image}')`}
                                }></div>
                            <p style={message.senderId===currentUser.id ? {textAlign:'right'} : {}}>{message.text}</p>
                        </div>
                    )}
                </div>
                <div className='bottomInputs'>
                    <input ref={newMessage} type='text' placeholder='...'/>
                    <button onClick={handleSend}>➡️</button>
                </div>
            </div>
            </> : 'No peaking! please login ;)'}
        </div>
)};

export default MessengerPage;