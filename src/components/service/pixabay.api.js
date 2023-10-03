import axios from 'axios'; 
import { paramsForNotify } from "components/App";
import { Notify } from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38533385-28515aa6f593c10148bebd9ab';

export async function fetchPhoto(search, page, perPage) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${search}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`;
    const response = await axios.get(url);
    return response.data;       
};

export function handleFetchError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
};