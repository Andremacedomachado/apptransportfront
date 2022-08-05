import axios from 'axios';

import { errorInterceptor, responseInterceptor } from '../interceptors';
import { Environmenrt } from '../../../environments';


const Api = axios.create({
    baseURL: Environmenrt.URL_BASE,
});


Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

export { Api };