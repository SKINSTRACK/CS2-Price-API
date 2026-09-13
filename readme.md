
# Skinstrack API

Public API for accessing CS2 skin prices and market data aggregated across multiple marketplaces.

* Skinstrack offers a free, limited API endpoint that returns Steam item prices. Paid plans additionally provide access to pricing data from multiple marketplaces, making it possible to compare prices across different markets through a single API.
* The CS2 Skins Price API provides real-time price data for Counter-Strike 2 weapon skins aggregated from +30 marketplaces including Buff163, CSFloat, Skinport, and Steam Market. It includes endpoints for skin prices.

## Full API Documentation

[https://skinstrack.com/api-docs](https://skinstrack.com/api-docs?utm_source=github.com)

## Base URL

[https://api.skinstrack.com](https://api.skinstrack.com)



---

## Authentication

All endpoints (including Free Plan) require an API key.

### Header format

x-api-key: YOUR_API_KEY


---

## Free Plan

The free plan provides limited access to item price data.

### Endpoint

```
GET /v2/free/items
```

### Example Request

```bash
curl https://api.skinstrack.com/v2/free/items \
  -H "x-api-key: YOUR_API_KEY"
```

### Response Example

```json
[
    {
        "market_hash_name": "★ Falchion Knife | Ultraviolet (Well-Worn)",
        "slug": "falchion-knife-ultraviolet-well-worn",
        "icon_url": "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-AAViA1PxmvORWSSi_lhUuvDO6l4r9KD7KcFUoDZZ0R-IM50Xrm4fgMb_k41Dfjt1Nzi_43y9B6H1vtekKV_UgrqXJz1aW3qoAVI8",
        "type": "skin",
        "liquidity": 50,
        "prices": [
            {
                "price": 120.86,
                "count": 1,
                "volume": 0,
                "meta": {
                    "buy_order": 105.01
                },
                "provider": "steam",
                "updated_at": "2026-04-01T08:54:31.781Z"
            }
        ]
    }
]
```

---

## Free Plan Limitations

* **Rate limit:** 50 requests per month
* **Data source:** Steam prices only
* **Update frequency:** Cached data (not real-time)

### Notes

* This endpoint is intended for testing and low-volume usage.
* Data is filtered to include only items with prices from Steam.
* Data may be cached and updated less frequently than paid endpoints.
* For more requests, real-time updates, and full marketplace coverage, upgrade to the paid plan.

---

### Stickers Endpoint

```
GET /v2/free/stickers
```

### Example Request

```bash
curl https://api.skinstrack.com/v2/free/stickers \
  -H "x-api-key: YOUR_API_KEY"
```

---

## Paid Plan (Recommended)

For production usage, higher rate limits, and full marketplace coverage. Requires a paid plan API key.

### Endpoint

```
GET /v2/paid/items
```

Retrieves a list of items with their prices from specified providers. Results can be filtered by provider and market hash names. Optionally includes average, median, and price change statistics via query flags. Prices, average, and median are in USD by default; pass `currency` to convert.

### Parameters

| Name | In | Type | Description |
|---|---|---|---|
| `providers` | query | string | Comma-separated list of marketplace providers to include. Default: `csfloat,waxpeer`. Example: `csfloat,buff163,youpin,dmarket,marketcsgo` |
| `market_hash_names` | query | string | Comma-separated list of market hash names or slugs to filter by. Example: `USP-S \| Whiteout (Battle-Scarred),AK-47 \| Redline (Field-Tested)` |
| `avg` | query | string | Include average price statistics grouped by time periods (7d, 14d, 30d, 60d, 90d). Example: `true` |
| `median` | query | string | Include median price statistics grouped by time periods (7d, 14d, 30d, 60d, 90d). Example: `true` |
| `changes` | query | string | Include price change percentage statistics grouped by time periods (1d, 7d, 14d, 30d, 60d, 90d). Example: `true` |
| `currency` | query | string | ISO 4217 currency code for all returned prices (and average/median where present). Rates refresh every 12 hours. Unknown codes return 400. Default: `USD`. Example: `EUR` |

### Example Request

```bash
curl "https://api.skinstrack.com/v2/paid/items?providers=csfloat,buff163&avg=true&currency=EUR" \
  -H "x-api-key: YOUR_API_KEY"
```

---

### Stickers Endpoint

```
GET /v2/paid/stickers
```

Retrieves a list of CS2 stickers with their prices from specified providers. Results can be filtered by provider and market hash names. Prices are in USD by default; pass `currency` to convert. Requires a paid plan API key.

#### Parameters

| Name | In | Type | Description |
|---|---|---|---|
| `providers` | query | string | Comma-separated list of marketplace providers to include. Default: `csfloat,waxpeer`. Example: `csfloat,waxpeer,dmarket,marketcsgo` |
| `market_hash_names` | query | string | Comma-separated list of sticker market hash names or slugs to filter by. Example: `Sticker \| Crown (Foil)` |
| `currency` | query | string | ISO 4217 currency code for all returned prices (and average/median where present). Rates refresh every 12 hours. Unknown codes return 400. Default: `USD`. Example: `EUR` |

#### Example Request

```bash
curl "https://api.skinstrack.com/v2/paid/stickers?providers=csfloat,waxpeer&currency=EUR" \
  -H "x-api-key: YOUR_API_KEY"
```

### Benefits

* Higher request limits
* Aggregated prices from multiple marketplaces
* Faster updates and near real-time data
* More complete item coverage

---

## Use Cases

* Price tracking dashboards
* Arbitrage detection between marketplaces
* Historical price analytics
* Trading bots and automation

---

## Watching Marketplaces like:
avan.market, BitSkins, Buff.163, Buff.Market, CS.Deals, CSFloat, CSGO500, CSGOEmpire, cs.money, cs.money TRADE, CS.Trade, DMarket, Ecosteam, GamerPay, HaloSkins, Lis-skins, LootFarm, Market.CSGO, RapidSkins, ShadowPay, SIH.app, SkinBaron, SKINFLOW, SkinOut, Skinport, SKINSWAP, SKINSWAP CN, Steam, TradeIt.GG, UUSkins, Waxpeer, White.Market, YouPin898

## Support

👉 [https://skinstrack.com](https://skinstrack.com?utm_source=github.com)

---
