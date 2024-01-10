/// <reference types="@fastly/js-compute" />

async function handler(event) {
  try {
    // Make a request to the Binance API
    const binanceResponse = await fetch(
      "https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT",
      { method: "GET" }
    );

    // Create a new response with the Binance API response body and headers
    return new Response(binanceResponse.body, {
      status: binanceResponse.status,
      statusText: binanceResponse.statusText,
      headers: binanceResponse.headers,
    });
  } catch (error) {
    console.error('Error proxying request to Binance API:', error);

    // If there's an error, respond with a 500 Internal Server Error
    return new Response('Internal Server Error', { status: 500 });
  }
}

// eslint-disable-next-line no-restricted-globals
addEventListener("fetch", (event) => event.respondWith(handler(event)));
