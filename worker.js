export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Try to serve the actual file first
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;

      // For everything else serve index.html
      const indexUrl = new URL('/index.html', url);
      return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
    } catch(e) {
      return new Response('Site error: ' + e.message, { status: 500 });
    }
  }
};
