import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjY0NTMwMzlhYzliZjIxY2RjYTRlMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTY0OTM3NCwiZXhwIjoxNjkxNzM1Nzc0fQ.TzYIfKYiFJrlY_P-s0vSA2KbKigmlTWKo0vtifxlvkw'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {  
        token: `Bearer ${TOKEN}`,
    },
})