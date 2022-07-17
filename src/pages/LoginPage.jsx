import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { setCurrentUser, setIsLoggedIn } from '../features/users';
const LoginPage = () => {
    const [getError, setError] = useState(false);
    
    const email = useRef();
    const password = useRef();
    const nav = useNavigate();
    const users = useSelector(state=>state.users.value.users);
    const dispatch = useDispatch();
    function login (){
        let user = users.filter(user=>user.email===email.current.value && user.password === password.current.value);
        if (user.length) {
            dispatch(setCurrentUser(user[0]));
            dispatch(setIsLoggedIn(true));
            nav('/profile');
        } else {
            setError('Check email and/or password.')
        }
    };
    return (
        <div className='LoginPage'>
            <input ref={email} type="text" placeholder='email' ></input>
            <input ref={password} type="password" placeholder="password" ></input>
            <button onClick={login}>Login</button>
            {getError && <h2>{getError}</h2>}
        </div>
    );
};

export default LoginPage;