import { axiosClientRegister } from './axiosClient';

const userApi = {
    register(data) {
        const url = '/auth/local/register';
        return axiosClientRegister.post(url, data);
    },
};

export default userApi;
