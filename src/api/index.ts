import { Message } from 'types';
import { API_URL } from '../constants/index';

export const postMessage = async (message: Message) => {
    fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify(message)
    })

}
export const getMessages = async () => {
    const data = await fetch(API_URL)

    return await data.json()
}