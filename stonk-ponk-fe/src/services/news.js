//TODO Replace with the correct link

// Request will just require getting top 10 news articles
// Response will give us numResults, the title, description and urlToImage
export async function getNews() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    await fetch('', requestOptions)
    .then(response => response.json())    
    .then((news) => {
        return Promise.resolve(news);
    }).catch((error) => {
        console.log("Could not fetch news.", error);
    })
}