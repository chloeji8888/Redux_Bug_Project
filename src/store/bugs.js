import { createAction,createReducer,createSlice } from "@reduxjs/toolkit";
import { name } from "tar/lib/types";
import{createSelector}from 'reselect';
import { apiCallBegan } from "./api";
import projects from "./projects";

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list:[],
        loading:false,
        lastFetch: null
    },

    reducers:{

        bugRequested:(state,action)=>{
            state.loading = true;
        },

        bugsReceived:(state,action)=>{
            state.list = action.payload;
            state.loading = false;
        },

        bugsRequestFailed:(state, action)=>{
            state.loading = false;
        },

        bugAssignedToUser:(state,action)=>{
            const {bugId, userId} = action.payload;
            const index = state.list.findIndex(bug => bug.id === bugId);
            state.list[index].userId = userId;
        },

        //map actions => action handlers
        bugAdded:(state,action)=>{
            state.list.push(
                {
                id: ++lastId, 
                description: action.payload.description,
                resolved: false
                }
            )
        },

        bugResolved:(state, action) => {
            const index = state.list.findIndex(bug => bug.id === action.payload.id);
            state.list[index].resolved = true;
        },

        bugRemoved: (state,action) => {
            state.list.filter(bug => bug.id != action.payload.id);
        }
    }
})
export const {bugAdded, bugRemoved, bugResolved, bugAssignedToUser, bugsReceived, bugRequested, bugsRequestFailed} = slice.actions;
export default slice.reducer;

const url = '/bugs'
export const loadBugs = () => apiCallBegan(
    {   
        url, 
        onStart: bugRequested.type,
        onSuccess: bugsReceived.type,
        onError:bugsRequestFailed.type
    }
    )

//selector function
// export const getUnresolvedBugs = state => 
// state.entities.bugs.filter(bug => !bug.resolved);

//Memoization
//bugs => get unresolved bugs from the cache
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs,projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsFromUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)

//Action creaters
// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");


// export const bugAdded = description =>(
//     {
//         type:BUG_ADDED,
//         payload:{
//             description
//         }
//     }
// )
// export const bugResolved = id => ({
//     type:BUG_RESOLVED,
//     payload:{
//         id
//     }
// })


// #2 reducer
// export default createReducer([], {
//     //key: value
//     //actions: functions(event => event handler)

//     [bugAdded.type]:(state, action) => {
//         state.push(
//             {
//             id: ++lastId, 
//             description: action.payload.description,
//             resolved: false
//             }
//         )
//     },

//     [bugResolved.type]:(state, action) => {
//         const index = state.findIndex(bug => bug.id === action.payload.id);
//         state[index].resolved = true;

//         },
    
//     [bugRemoved.type]:(state, action) => {
//         state.filter(bug => bug.id != action.payload.id);
//     }
//     }
// )


//#1 reducer

// export default function reducer(state = [], action){
//     if(action.type === bugAdded.type){
//         return[
//             ...state,
//             {
//                 id: ++lastId, 
//                 description:action.payload.description,
//                 resolved:false
//             }
//         ]
//     }else if(action.type === bugRemoved.type){
//         return state.filter(bug => bug.id != action.payload.id);
//     }else if (action.type === bugResolved.type){
//         return state.map(bug => bug.id !== action.payload.id ? bug : {...bug,resolved:true})
//     }
//     return state;
// }
