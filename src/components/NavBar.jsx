import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
const NavBar = () => {
    const login = useSelector(state=>state.users.value.isLoggedIn);
    const currentUser = useSelector(state=>state.users.value.currentUser);
    const conversations = useSelector(state=>state.conversations.value.conversations);

    const pathname = window.location.pathname;
    const nav = useNavigate();
    const style = {textShadow: 'rgb(0, 0, 0, 1) -10px 15px 15px'};
    return (
        <div className='NavBar'>
            {login ? 
                <>
                    <h1 onClick={()=>nav('/profile')}  style={pathname==='/profile'  ? style:{}}>Profile</h1> 
                    <h1 onClick={()=>nav('/users')}     style={pathname==='/users'     ? style:{}}>Users</h1>
                    <h1 onClick={()=>nav('/messenger')} style={pathname==='/messenger' ? style:{}}>Messenger
                        <div className='counter'>
                            {conversations.filter(conversation=>conversation.participants.includes(currentUser.id)).length}
                        </div>
                    </h1>
                </>
                :
                <>
                    <h1 onClick={()=>nav('/')} style={pathname==='/' ? style:{}}>Login</h1>
                    <h1 onClick={()=>nav('/register')} style={pathname==='/register' ? style:{}}>Register</h1>
                </> 
                
            }
        </div>
    );
};

export default NavBar;