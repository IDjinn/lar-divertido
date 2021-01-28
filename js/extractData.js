async function extractData() {
    const response = await fetch('./data/jogos.json');
    const contentType = response.headers.get('content-type');
    if (response.ok && contentType && contentType.includes('application/json')) {
        return await response.json();
    }

    return null;
}