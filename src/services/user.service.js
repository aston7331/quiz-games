import axios from "axios";
import { ApiUrl } from "../api/apiUrl";

export const getQuestion = async () => {
    try {
        const result = await axios.get(`${ApiUrl.GET_QUESTION}`);
        return {
            success: true,
            data: result?.data
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}


export const submitAnswer = async (userAnswer) => {
    try {
        const result = await axios.post(`${ApiUrl.SUBMIT_ANSWER}`, userAnswer);
        return {
            success: true,
            data: result?.data
        };
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}


export const getScore = async (data) => {
    try {
        const result = await axios.post(`${ApiUrl.GET_SCORE}/${data}`);
        return {
            success: true,
            data: result?.data
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}


export const clearDatabase = async () => {
    try {
        console.log("first 1")
        const result = await axios.post(`${ApiUrl.CLEAR_DB}`);
        console.log("first 2", result)

        return {
            success: true,
            data: result?.data
        };
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}

export const addUser = async (name) => {
    try {
        const result = await axios.post(`${ApiUrl.ADD_USER}`, { name });
        console.log(result)
        return {
            success: true,
            data: result?.data
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data
        };
    }
}
