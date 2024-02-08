import { Message } from 'types';
import { API_URL } from '../constants/index';

export const postMessage = async (message: Message) => {
    const result = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify(message)
    })
    
    return result.ok
}

export const getMessages = async () => {
    const result = await fetch(API_URL);

    return [await result.json(), result.ok]
}
