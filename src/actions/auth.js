import { makeNetworkRequest } from '../store/utility';
import * as actionTypes from './actionTypes';

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: data
    }
}

export const auth = () => {
    const data = {
        "appVersion": "8.2.78",
        "devicetoken": "frSRyR_VTmOA70fapR6WWv:APA91bELkHgRjbc9RR0fpai-5-rnz9jWYR8bpWcEK71HydqEm4fYlULlKFZzAW6P3-nvMZbgKPrcS_52O7S460-hac42YXhdT645edio2uwv3tAbUj8RdNTkbtgx_k5HDuIx-vMydg_B",
        "loginParam": "+919000006515",
        "LengthParam": "4"
    }
    return makeNetworkRequest({
            url: "/api/login",
            onSuccess: authSuccess,
            onFailure: (err) => console.log("Error", err),
            label: actionTypes.LOGIN_CALL_MADE,
            method: 'POST',
            data
        });
};
