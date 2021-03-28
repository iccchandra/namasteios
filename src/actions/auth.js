import { makeNetworkRequest } from '../store/utility';
import * as actionTypes from './actionTypes';


export const updateNumber = ( phoneNumber ) => {
    return {
        type: actionTypes.ENTER_NUMBER,
        phoneNumber: phoneNumber
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: data
    }
}

export const verifyOTPSuccess = (data) => {
    return {
        type: actionTypes.VERIFY_OTP,
        payload: data
    }
}


export const auth = (phoneNumber) => {
    const data = {
        "loginParam": `+91${phoneNumber}`,
        "otpLengthParam": "4"
    }
    return makeNetworkRequest({
            url: "/api/login",
            onSuccess: authSuccess,
            onFailure: (err) => console.log("Error", err),
            method: 'POST',
            data
        });
};

export const verifyOTP = (code) => {
    return (dispatch, getState) => {
        const { data: { OTPDetails, UserDetails } } = getState().auth?.data;
        const data = {
            "deviceType": UserDetails.deviceType,
            "mobile": UserDetails.mobile,
            "otpIdParam": OTPDetails.userId,
            "otpParam": code,
            "deviceId": UserDetails.deviceId,
            "userIdParam": OTPDetails.userId,
            "actionName": "login"
        }
        dispatch(makeNetworkRequest({
            url: "/api/verify_otp",
            onSuccess: verifyOTPSuccess,
            label: actionTypes.VERIFY_OTP_REQUEST,
            method: 'POST',
            data
        }));
    }
}
