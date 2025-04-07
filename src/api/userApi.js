import axios from "./axios";

export const addUser = async (userData, token) => {
    const res = await axios.post('/users/add', userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const getUsers = async (token) => {
    const res = await axios.get('/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export const deleteUser = async (id, token) => {
    const res = await axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}