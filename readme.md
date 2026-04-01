
# Skinstrack API

Public API for accessing CS2 skin prices and market data aggregated across multiple marketplaces.

## Full API Documentation

[https://skinstrack.com/api-docs](https://skinstrack.com/api-docs)

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
GET /v1/free/items
```

### Example Request

```bash
curl https://api.skinstrack.com/v1/free/items \
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

## Paid Plan (Recommended)

For production usage, higher rate limits, and full marketplace coverage:

### Endpoint

```
GET /v1/paid/items
```

### Example Request

```bash
curl https://api.skinstrack.com/v1/paid/items \
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

## Support

👉 [https://skinstrack.com](https://skinstrack.com)

---
