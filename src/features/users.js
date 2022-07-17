import { createSlice } from '@reduxjs/toolkit';

export const users = createSlice({
    name: "users",
    initialState:{
        value:{
            isLoggedIn: false,
            currentUser: {},
            users:[
                {
                    id: 404,
                    username: "Anon",
                    email: "anonymous@gmail.com",
                    password: "anonymous",
                    image: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                    type: 'regular',
                    blackList:[]
                },{
                    id: 1,
                    username: "Jonas",
                    email: "jonas@gmail.com",
                    password: "jonas",
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Jonas_Vilei%C5%A1is.jpg",
                    type: 'admin',
                    blackList:[]
                },{
                    id: 2,
                    username: "Petras",
                    email: "petras@gmail.com",
                    password: "petras",
                    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Petras_Vilei%C5%A1is_%281851-1926%29.jpg",
                    type: 'regular',
                    blackList:[]
                },{
                    id: 3,
                    username: "Ona",
                    email: "ona@gmail.com",
                    password: "ona",
                    image: "https://www.bernardinai.lt/wp-content/uploads/7988125303-simaite.jpg",
                    type: 'regular',
                    blackList:[]
                },{
                    id: 4,
                    username: "Danas",
                    email: "dan@gmail.com",
                    password: "dan",
                    image: "https://www.lrs.lt/sip/getFile?guid=7108c992-db57-4010-af6b-767bf07a1025",
                    type: 'regular',
                    blackList:[]
                }
            ],
        }    
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.value.currentUser = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.value.isLoggedIn = action.payload;
        },
        setUsers: (state, action) => {
            state.value.users = action.payload;
        },
    }
});

export const { setCurrentUser, setIsLoggedIn, setUsers } = users.actions;

export default users.reducer;

