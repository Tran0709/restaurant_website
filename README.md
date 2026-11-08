# 菜园子 原味湘菜 — Website & Online Ordering

118 Killiney Road #01-02, Singapore 239555 · 6041 9403

```
restaurant_website/
├── index.html          introduction website (HTML)
├── css/style.css       its styles (CSS)
├── js/main.js          its scripts (JavaScript): opening-hours banner, reservation form
├── order/
│   ├── index.html      online ordering page (HTML)
│   ├── css/order.css   its styles (CSS)
│   └── js/order.js     its scripts (JavaScript): menu & prices, cart, checkout
└── img/                logo and dish photos (shared by both pages)
```

- **Menu and prices** are in `order/js/order.js` (the `const M = [...]` and `const D = [...]` lists).
- **Opening hours** are `HOURS` in both `js/main.js` and `order/js/order.js`.
- **Reservation WhatsApp number** is `RPHONE` in `js/main.js`.

The website does not link to the ordering page yet; payments are still simulated until a payment provider is connected.

## View it

Double-click `index.html`, or run a local server from this folder:

    python -m http.server 8000

then open http://localhost:8000 (website) and http://localhost:8000/order/ (ordering).
