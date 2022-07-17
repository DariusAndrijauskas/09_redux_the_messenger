import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn, setCurrentUser, setUsers } from '../features/users.js';
const UserPage = () => {
    const [getError, setError] = useState(false);
    const nav = useNavigate();
    const image = useRef();
    const pass1 = useRef();
    const pass2 = useRef();
    const currentUser = useSelector(state=>state.users.value.currentUser);
    const isLoggedIn = useSelector(state=>state.users.value.isLoggedIn);
    const users = useSelector(state=>state.users.value.users);
    const dispatch = useDispatch();    
    // console.log(currentUser);
    function updateImage(){
        dispatch(setCurrentUser({...currentUser, image:image.current.value}))
        let newUsers = users.map(user => user.id===currentUser.id ? {...user, image:image.current.value} : user);
        dispatch(setUsers(newUsers));
    }

    function updatePassword (){
        let error = '';
        if (pass1.current.value!==pass2.current.value) error = `passwords don't match`;
        if (!RegExp('(?=.*?[!@#$%^&*_+])').test(pass1.current.value)) error = `password must include special characters '!@#$%^&*_+'`;
        if (!RegExp('^(?=.*?[A-Z])').test(pass1.current.value)) error = `password must include a Capital letter`;
        if (!RegExp('^(?=.*?[a-z])').test(pass1.current.value)) error = `password must include a letter`;
        if (pass1.current.value.length > 20) error = `password must be no more than 20 characters`;
        if (pass1.current.value.length < 4) error = `password must be at least 4 characters`;
    
        setError(error);
        if (!error) {
            
            let newUsers = users.map(user => user.id===currentUser.id ? {...user, password:pass1.current.value} : user);
            dispatch(setUsers(newUsers));
            
            setError('password changed successfully');
        }
    
    }

    function logout(){
        dispatch (setIsLoggedIn(false));
        nav('/');
    }
    return (
        <div className='ProfilePage'>
            {isLoggedIn ? <>
                <div className='image' style={{backgroundImage:`url('${currentUser.image}')`}}></div>
                <div className='info'>
                    <h2>{currentUser.type}</h2>
                    <h2>{currentUser.username}</h2>
                    <h2>{currentUser.email}</h2>
                    <input ref={image} type='text' placeholder='new image url'/>
                    <button onClick={updateImage}>change image</button>
                    <input ref={pass1} type='password' placeholder='new password'/>
                    <input ref={pass2} type='password' placeholder='repeat password'/>
                    <button onClick={updatePassword}>change password</button>
                    {getError && <h2>{getError}</h2>}
                    <button onClick={logout}>logout</button>
            </div>
            </> : 'No peaking! please login ;)'}
        </div>
    );
};

export default UserPage;