
import reducer from './reducer'
function createStore(reducer){
    let state;
    let listeners = [];

    function dispatch(action){
       state = reducer(state, action)
       for(let i = 0; i < listeners.length; i++){
        listeners[i]();
       }
    }
    function getState(){
        return state;
    }

    function subscribe(listener){
        listeners.push(listener);
    }
    return{
        subscribe,
        getState,
        dispatch
    }
}
export default createStore(reducer);