import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AllUsersPage = () => {
    const nav = useNavigate();
    const users = useSelector(state=>state.users.value.users);
    const currentUser = useSelector(state=>state.users.value.currentUser);

    return (
        <div className='AllUsersPage'>
            {users.map((user, i)=> 
                    <div key={i} onClick={()=>nav(`/user/${user.username}`)} className='userCard' style={user.id===404 || user.id===currentUser.id ? {display:'none'} : {}}>
                        <div className='image' style={{backgroundImage:`url('${user.image}')`}}>
                        </div>
                        <div className='info'>
                            {user.type}<br/>
                            {user.username}
                        </div>
                    </div>
                ) 
            }
        </div>
    );
};

export default AllUsersPage;