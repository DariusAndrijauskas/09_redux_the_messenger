import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setUsers } from '../features/users';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
const RegisterPage = () => {
    const [getError, setError] = useState(false);
    const [getUserType, setUserType] = useState('regular');

    const nav = useNavigate();
    const dispatch = useDispatch();
    let users = useSelector(state=>state.users.value.users);
    const email = useRef();
    const pass1 = useRef();
    const pass2 = useRef();
    const username = useRef();
    
    function register (){
        let error = '';


        if (users.filter(x=>x.username===username.current.value)[0]) error = 'username is taken';
        if (username.current.value.length < 4) error = `username must be longer than 4 characters`;
        if (username.current.value.length > 20) error = `username must be shorter than 20 characters`;
        if (pass1.current.value!==pass2.current.value) error = `passwords don't match`;
        if (!RegExp('(?=.*?[!@#$%^&*_+])').test(pass1.current.value)) error = `password must include special characters '!@#$%^&*_+'`;
        if (!RegExp('^(?=.*?[A-Z])').test(pass1.current.value)) error = `password must include a Capital letter`;
        if (!RegExp('^(?=.*?[a-z])').test(pass1.current.value)) error = `password must include a letter`;
        if (pass1.current.value.length > 20) error = `password must be no more than 20 characters`;
        if (pass1.current.value.length < 4) error = `password must be at least 4 characters`;
        if (users.filter(x=>x.email===email.current.value)[0]) error = 'email already registered';
        if (!RegExp(`[a-z0-9]+@[a-z]+\\.[a-z]{2,3}`, 'gm').test(email.current.value)) error = `check email address`;
        
        
        
        setError(error);
        if (!error) {
            
            let newUser = {
                id: Date.now(),
                email: email.current.value,
                password: pass1.current.value,
                username: username.current.value,
                image: '',
                blackList:[],
                type: getUserType,
            }
            let newUsers = [...users];
            newUsers.push(newUser);
            dispatch(setUsers(newUsers));
            dispatch(setCurrentUser(newUser));
            
            nav('/');
        }
    };
    return (
        <div className='RegisterPage'>
            <input ref={email} type="text" placeholder='email' />
            <input ref={pass1} type="password" placeholder='new password' />
            <input ref={pass2} type="password" placeholder='repeat password' />
            <input ref={username} type="text" placeholder='username' />
            <div className='radio'>
                <input onClick={()=>setUserType('regular')} id="regular" type="radio" value="regular" name="group1" defaultChecked/>
                <label htmlFor="regular" >regular</label>
                <input onClick={()=>setUserType('admin')} id="admin" type="radio" value="admin" name="group1"/>
                <label htmlFor="admin" >admin</label>
            </div>
            <button onClick={register}>Register</button>
            {getError && <h2>{getError}</h2>}
        </div>
    );
};

export default RegisterPage;