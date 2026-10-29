# CS2 Price API - JavaScript example

Example client and reference for the SKINSTRACK CS2 price API: Counter-Strike 2 skin and sticker prices as JSON over HTTP.

- Base URL: `https://api.skinstrack.com`
- Full documentation: https://skinstrack.com/api-docs

## Sample data

`free_prices.json` and `free_sticker_prices.json` are a one-time snapshot of the free endpoints, taken on 2026-10-29. They are kept as example data and are no longer updated in this repository. Prices are updated continuously on the API side, so call the API for current data.

## Quick start

Requires Node.js 18+ (built-in `fetch`).

```bash
git clone https://github.com/SKINSTRACK/CS2-Price-API.git
cd CS2-Price-API
SKINSTRACK_API_KEY=your_key node app.js
```

## Authentication

Every endpoint requires an API key sent in the `x-api-key` header.

```
x-api-key: YOUR_API_KEY
```

## Endpoints

| Endpoint | Data | Key |
| --- | --- | --- |
| `GET /v2/free/items` | Steam prices for skins, knives, gloves, cases and other items | Free |
| `GET /v2/free/stickers` | Steam prices for stickers | Free |
| `GET /v2/paid/items` | Item prices from multiple marketplaces, optional history stats | Paid |
| `GET /v2/paid/stickers` | Sticker prices from multiple marketplaces | Paid |

Free keys are limited to 50 requests per month and return cached Steam prices only.

### GET /v2/free/items

```bash
curl https://api.skinstrack.com/v2/free/items \
  -H "x-api-key: YOUR_API_KEY"
```

```json
{
  "currency": "USD",
  "items": [
    {
      "market_hash_name": "MAC-10 | Commuter (Minimal Wear)",
      "slug": "mac-10-commuter-minimal-wear",
      "icon_url": "i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-...",
      "type": "skin",
      "liquidity": 30,
      "prices": [
        {
          "price": 14.61,
          "count": 14,
          "volume": 0,
          "meta": { "buy_order": 11.78 },
          "provider": "steam",
          "updated_at": "2026-10-03T09:28:04.626Z"
        }
      ]
    }
  ]
}
```

### GET /v2/free/stickers

Same shape as `/v2/free/items`, with the list under `stickers` instead of `items`.

```bash
curl https://api.skinstrack.com/v2/free/stickers \
  -H "x-api-key: YOUR_API_KEY"
```

### GET /v2/paid/items

| Name | Type | Description |
| --- | --- | --- |
| `providers` | string | Comma-separated marketplaces. Default `csfloat,waxpeer`. Example: `csfloat,buff163,youpin,dmarket,marketcsgo` |
| `market_hash_names` | string | Comma-separated market hash names or slugs. Example: `AK-47 \| Redline (Field-Tested)` |
| `avg` | boolean | Average price for 7d, 14d, 30d, 60d, 90d |
| `median` | boolean | Median price for 7d, 14d, 30d, 60d, 90d |
| `changes` | boolean | Price change % for 1d, 7d, 14d, 30d, 60d, 90d |
| `currency` | string | ISO 4217 code, default `USD`. Unknown codes return 400 |

```bash
curl "https://api.skinstrack.com/v2/paid/items?providers=csfloat,buff163&avg=true&currency=EUR" \
  -H "x-api-key: YOUR_API_KEY"
```

### GET /v2/paid/stickers

Accepts `providers`, `market_hash_names` and `currency` as above.

```bash
curl "https://api.skinstrack.com/v2/paid/stickers?providers=csfloat,waxpeer&currency=EUR" \
  -H "x-api-key: YOUR_API_KEY"
```

## Response fields

| Field | Description |
| --- | --- |
| `market_hash_name` | Steam market name of the item |
| `slug` | URL-safe identifier, accepted anywhere a market hash name is |
| `icon_url` | Steam economy image id, append to `https://community.cloudflare.steamstatic.com/economy/image/` |
| `type` | Item type, e.g. `skin` |
| `liquidity` | 0-100 score of how easily the item sells |
| `prices[].price` | Lowest listing price in the requested currency |
| `prices[].count` | Number of active listings |
| `prices[].meta.buy_order` | Highest buy order, where the marketplace has one |
| `prices[].provider` | Marketplace the price comes from |
| `prices[].updated_at` | When the price was last collected |

## Data sources

Prices are collected from Steam Community Market and third-party marketplaces including CSFloat, Buff163, YouPin, DMarket, Market.CSGO, Waxpeer and Skinport. The full provider list is in the [API documentation](https://skinstrack.com/api-docs).
