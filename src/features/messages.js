import { createSlice } from '@reduxjs/toolkit'

export const conversations = createSlice({
    name: "conversations",
    initialState:{
        value:{
            conversations:[
                {
                    participants:[1, 2],
                    messages:[
                        {
                            messageId: 354654165,
                            senderId: 1,
                            text:'labas :)'
                        },{
                            messageId: 57659613,
                            senderId: 2,
                            text: 'labas ir tau 😊'
                        }
                    ]
                },{
                    participants:[2, 3],
                    messages:[
                        {
                            messageId: 354654165,
                            senderId: 2,
                            text:'Labas Onut :)'
                        },{
                            messageId: 57659615,
                            senderId: 3,
                            text: 'Sveikutis Petriuk 😊'
                        }
                    ]
                },{
                    participants:[1, 3],
                    messages:[
                        {
                            messageId: 354654165,
                            senderId: 1,
                            text:'labas Ona'
                        },{
                            messageId: 354654166,
                            senderId: 1,
                            text:'gal žinai kur Petras?'
                        },{
                            messageId: 57659614,
                            senderId: 3,
                            text: 'Oi neklausk, po savaigalio nemačiau dar 🤣'
                        }
                    ]
                }
                
            ]
        }
    },
    reducers: { 
        setConversations: ({value}, {payload}) => {
            value.conversations = payload;
        }
    }
});

export const { setConversations } = conversations.actions;

export default conversations.reducer;