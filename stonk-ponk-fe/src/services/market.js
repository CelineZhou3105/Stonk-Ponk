import { MarketsLink } from '../api-links/constants';

export async function getMarketData(page_num) {
    // TODO - Add page_num to the variables
    const requestBody = {
        type: 'most_active',
        page_num: page_num,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };
    // TODO - change link to `${MarketsLink}?=${page_num}`
    return await fetch(`${MarketsLink}`, requestOptions).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.json());
        }
        return Promise.reject(response);
    })

}

export const market = {
    getMarketData
}