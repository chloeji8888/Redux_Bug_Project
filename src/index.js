import configureAppStore from "./store/configureStore";
import { loadBugs,assignBugToUser } from "./store/bugs";

const store = configureAppStore();

// store.dispatch((dispatch,getState)=>{
//     dispatch({type:'bugReceived', bugs:[1,2,3]}),
//     console.log(getState());
// })
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assignBugToUser(1,4)),2000)


// store.dispatch(actions.apiCallBegan({url:'/bugs',
// onSuccess: 'bugs/bugsReceived'
// }))

// store.dispatch(bugAdded({description:"Bug1"}))
// store.dispatch(bugAdded({description:"Bug2"}))
// store.dispatch(bugAdded({description:"Bug3"}))
// store.dispatch(bugAdded({description:"Bug4"}))
// store.dispatch(bugResolved({id:1}))
// store.dispatch(projectAdded({name:"Project 1"}))
// store.dispatch(userAdded({name:"User 1"}))
// store.dispatch(userAdded({name:"User 2"}))
// store.dispatch(bugAssignedToUser({bugId:1, userId:1}));
// const unresolvedBug = getUnresolvedBugs(store.getState());
// const bugFromUsers = getBugsFromUser(1)(store.getState());
// console.log(bugFromUsers);
// import { bugAdded, bugResolved } from "./actions";
// import * as actions from './actionTypes';
// const unsubcribe = store.subscribe(()=>{
//     console.log("Store changed!",store.getState());
// })

// store.dispatch(bugAdded("Bug1"));

// unsubcribe();

// store.dispatch(bugResolved(1))

// console.log(store.getState());