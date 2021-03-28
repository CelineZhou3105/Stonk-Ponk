import { MarketsLink } from '../api-links/constants';

export async function getMarketData() {
    // TODO - Add page_num to the variables
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    // TODO - change link to `${MarketsLink}?=${page_num}`
    await fetch(`${MarketsLink}`, requestOptions).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.json());
        }
        return Promise.reject(response);
    })

}

export const market = {
    getMarketData
}