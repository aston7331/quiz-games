const baseUrl = process.env.REACT_APP_API_URL;

export const ApiUrl = {
    GET_QUESTION: baseUrl + "questions",
    SUBMIT_ANSWER: baseUrl + "submit-answer",
    GET_SCORE: baseUrl + "score",
    CLEAR_DB: baseUrl + "clear-db",
    ADD_USER: baseUrl + "add_user",
}