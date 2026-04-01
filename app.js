async function GetSteamPrices() {
    // This endpoint is free 50 calls/month limit. For more calls and faster updates, please consider upgrading to a paid plan and use /api/v1/paid/items endpoint.
    // Data is filtered to only include items with prices from Steam. For more comprehensive data, please consider upgrading to a paid plan and use /api/v1/paid/items endpoint.
    // Data may be cached and updated less frequently than paid endpoints. For real-time data, please consider upgrading to a paid plan and use /api/v1/paid/items endpoint.
    try {
        const response = await fetch('https://api.skinstrack.com/v1/free/items', {
            headers: {
                'x-api-key': 'YOUR_SECRET_TOKEN'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`[GetSteamPrices] Fetch error! status: ${response.status} response: ${errorText}`);
        }

        const data = await response.json();

        const itemsPrice = data?.items || [];
        return itemsPrice;
    } catch(error) {
        console.error('[GetSteamPrices] Error fetching Steam prices:', error);
        return [];
    }
}

(async () => {
    const prices = await GetSteamPrices();
    console.log('[GetSteamPrices]', prices[0], prices.length);
    // price example:
    // {
    //     "market_hash_name": "★ Falchion Knife | Ultraviolet (Well-Worn)",
    //     "slug": "falchion-knife-ultraviolet-well-worn",
    //     "icon_url": "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AAViA1PxmvORWSSi_lhUuvDO6l4r9KD7KcFUoDZZ0R-IM50Xrm4fgMb_k41Dfjt1Nzi_43y9B6H1vtekKV_UgrqXJz1aW3qoAVI8",
    //     "type": "skin",
    //     "liquidity": 50,
    //     "prices": [
    //         {
    //             "price": 120.86,
    //             "count": 1,
    //             "volume": 0,
    //             "meta": {
    //                 "buy_order": 105.01
    //             },
    //             "provider": "steam",
    //             "updated_at": "2026-04-01T08:54:31.781Z"
    //         }
    //     ]
    // }
})();