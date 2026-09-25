export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Try to serve the actual file first
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch(e) {}

    // For everything else, serve index.html (SPA routing)
    const indexUrl = new URL('/', url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  }
};
