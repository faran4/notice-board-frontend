import axios from "./axios";

export const getNotices = async () => {
    const res = await axios.get('/notices');
    return res.data;
};

export const postNotice = async (notice, token) => {
    const res = await axios.post('/notices', notice, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

export const deleteNotice = async (id, token) => {
    const res = await axios.delete(`/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
}