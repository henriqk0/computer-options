import axios from 'axios';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';

Ziggy.url = window.location.origin;

window.route = (name, params, absolute) => route(name, params, absolute, Ziggy);

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.baseURL = '/api';
