addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    // Make a request to the Binance API
    const binanceResponse = await fetch(
      "https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT",
      { method: request.method, headers: request.headers }
    );

    // Read the response body as text
    const responseBody = await binanceResponse.text();

    // Create a new response with the same body and headers
    return new Response(responseBody, {
      status: binanceResponse.status,
      statusText: binanceResponse.statusText,
      headers: binanceResponse.headers,
    });
  } catch (error) {
    console.error('Error fetching Binance API:', error);

    // If there's an error, respond with a 500 Internal Server Error
    return new Response('Internal Server Error', { status: 500 });
  }
}
