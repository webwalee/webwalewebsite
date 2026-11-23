import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

import * as fs from "node:fs";
import * as path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "data", "leads.json");
const REVIEWS_FILE = path.resolve(process.cwd(), "data", "user-reviews.json");

function getStoredLeads() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) || [];
  } catch {
    return [];
  }
}

function saveStoredLeads(leads: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.error("Save leads file error:", e);
  }
}

function getStoredUserReviews() {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      const dir = path.dirname(REVIEWS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(REVIEWS_FILE, "[]", "utf-8");
      return [];
    }
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8")) || [];
  } catch {
    return [];
  }
}

function saveStoredUserReviews(reviews: any[]) {
  try {
    const dir = path.dirname(REVIEWS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (e) {
    console.error("Save user reviews file error:", e);
  }
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // Google SEO: robots.txt
    if (url.pathname === "/robots.txt") {
      const robots = `User-agent: *\nAllow: /\nDisallow: /owner\nSitemap: ${url.origin}/sitemap.xml\n`;
      return new Response(robots, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // Google SEO: sitemap.xml
    if (url.pathname === "/sitemap.xml") {
      const today = new Date().toISOString().split("T")[0];
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url.origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${url.origin}/portfolio/nexus-tech</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${url.origin}/portfolio/globalpath-immigration</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${url.origin}/portfolio/urban-bites</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      return new Response(sitemap, {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    // Direct Backend API: /api/leads
    if (url.pathname === "/api/leads") {
      if (request.method === "GET") {
        const leads = getStoredLeads();
        return new Response(JSON.stringify({ ok: true, leads }), {
          headers: { "content-type": "application/json" },
        });
      }
      if (request.method === "POST") {
        try {
          const body = await request.json();
          const leads = getStoredLeads();
          const newLead = {
            ...body,
            id: body.id || "WW-" + Math.floor(1000 + Math.random() * 9000),
            status: "New",
            timestamp: body.timestamp || new Date().toLocaleString("en-IN"),
          };
          leads.unshift(newLead);
          saveStoredLeads(leads);
          return new Response(JSON.stringify({ ok: true, lead: newLead }), {
            headers: { "content-type": "application/json" },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }
      }
    }

    // Direct Backend API: /api/delete-lead
    if (url.pathname === "/api/delete-lead" && request.method === "POST") {
      try {
        const { id } = await request.json();
        let leads = getStoredLeads();
        leads = leads.filter((l: any) => l.id !== id);
        saveStoredLeads(leads);
        return new Response(JSON.stringify({ ok: true, leads }), {
          headers: { "content-type": "application/json" },
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // Direct Backend API: /api/reviews
    if (url.pathname === "/api/reviews") {
      if (request.method === "GET") {
        const reviews = getStoredUserReviews();
        return new Response(JSON.stringify({ ok: true, reviews }), {
          headers: { "content-type": "application/json" },
        });
      }
      if (request.method === "POST") {
        try {
          const body = await request.json();
          const reviews = getStoredUserReviews();
          const initials = (body.name || "Client")
            .split(" ")
            .map((n: string) => n[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase() || "WC";

          const newReview = {
            id: body.id || `rev-user-${Date.now()}`,
            name: body.name || "Valued Client",
            role: body.role || "Founder / Owner",
            company: body.company || "Independent Business",
            city: body.city || "India",
            category: body.category || "ecommerce",
            rating: typeof body.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : 5,
            highlightMetric: body.highlightMetric || "Verified Client Review",
            metricLabel: body.metricLabel || "Google Verified Rating",
            quote: body.quote || "Outstanding website design and service from WEBWALE Studio.",
            initials: initials,
            avatarBg: body.avatarBg || "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            date: "Just now · Google Review",
            tag: body.tag || "Verified Client Review",
            timestamp: body.timestamp || new Date().toLocaleString("en-IN"),
            verified: true,
          };

          reviews.unshift(newReview);
          saveStoredUserReviews(reviews);
          return new Response(JSON.stringify({ ok: true, review: newReview }), {
            headers: { "content-type": "application/json" },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }
      }
    }

    // Direct Backend API: /api/delete-review
    if (url.pathname === "/api/delete-review" && request.method === "POST") {
      try {
        const { id } = await request.json();
        let reviews = getStoredUserReviews();
        reviews = reviews.filter((r: any) => r.id !== id);
        saveStoredUserReviews(reviews);
        return new Response(JSON.stringify({ ok: true, reviews }), {
          headers: { "content-type": "application/json" },
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
