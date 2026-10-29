const API_URL = 'https://api.skinstrack.com';
const API_KEY = process.env.SKINSTRACK_API_KEY;

async function getFree(path, listKey) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: { 'x-api-key': API_KEY }
    });

    if (!response.ok) {
        throw new Error(`${path} returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data?.[listKey] || [];
}

const getSteamPrices = () => getFree('/v2/free/items', 'items');
const getStickerPrices = () => getFree('/v2/free/stickers', 'stickers');

(async () => {
    if (!API_KEY) {
        console.error('Set SKINSTRACK_API_KEY first');
        process.exit(1);
    }

    const items = await getSteamPrices();
    console.log('items:', items.length, items[0]);

    const stickers = await getStickerPrices();
    console.log('stickers:', stickers.length, stickers[0]);
})();
