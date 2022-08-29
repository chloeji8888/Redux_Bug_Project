import axios from "axios";
import * as actions from '../api'

const action = {
    type: actions.apiCallBegan,
    payload:{
        url:'/bugs',
        method:'get',
        data:{},
        onSuccess: actions.apiCallSuccess,
        onError: actions.apiCallFailed
    }
}


const api = ({dispatch}) => next=> async action => {
    if(action.type !== actions.apiCallBegan.type){
        return next(action)
    }

    next(action);
    const{url, method,data,onError,onSuccess} = action.payload
    try{
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data,
        });

        dispatch(actions.apiCallSuccess(response.data));
        if(onSuccess){
            dispatch(
                {
                    type:onSuccess, 
                    payload:response.data
                }
            )
        }

    }catch(error){
        dispatch(action.apiCallFailed(error));

        if(onError){
            dispatch(
                {
                    type:onError, 
                    payload:error 
                }
                )
        }
        
    }

}
export default api;