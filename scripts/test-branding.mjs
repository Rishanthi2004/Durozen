const routes = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/projects",
  "/gallery",
  "/blog",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/process",
  "/why-choose-us",
];

async function verifyBranding() {
  console.log("=== VERIFYING BROWSER TAB BRANDING ACROSS ALL PAGES ===\n");
  let allPass = true;

  for (const r of routes) {
    try {
      const res = await fetch("http://localhost:3000" + r);
      if (!res.ok) {
        console.error(`FAIL: ${r} returned status ${res.status}`);
        allPass = false;
        continue;
      }
      const text = await res.text();
      const titleMatch = text.match(/<title>([^<]*)<\/title>/);
      const iconMatches = text.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi) || [];

      const rawTitle = titleMatch ? titleMatch[1] : "NOT FOUND";
      const title = rawTitle.replace(/&amp;/g, "&");
      const expectedTitle = "Durozen | Enterprise Software & IT Services";
      const titleOk = title === expectedTitle;

      if (!titleOk) allPass = false;

      console.log(`[${titleOk ? "PASS" : "FAIL"}] Route: ${r}`);
      console.log(`       Title: "${title}"`);
      console.log(`       Icon tags count: ${iconMatches.length}`);
      if (iconMatches.length > 0) {
        iconMatches.forEach((tag) => console.log(`         -> ${tag}`));
      }
    } catch (err) {
      console.error(`ERROR: ${r}:`, err.message);
      allPass = false;
    }
  }

  // Also verify favicon.ico and icon.svg endpoint responses
  console.log("\n=== VERIFYING ICON ASSET ENDPOINTS ===");
  for (const asset of ["/icon.svg", "/favicon.ico", "/apple-touch-icon.png"]) {
    try {
      const res = await fetch("http://localhost:3000" + asset);
      const contentType = res.headers.get("content-type");
      console.log(`[${res.ok ? "PASS" : "FAIL"}] ${asset} -> Status: ${res.status}, Type: ${contentType}`);
      if (!res.ok) allPass = false;
    } catch (err) {
      console.error(`ERROR: ${asset}:`, err.message);
      allPass = false;
    }
  }

  console.log(`\nOVERALL STATUS: ${allPass ? "ALL BRANDING TESTS PASSED!" : "FAILURES DETECTED"}`);
}

verifyBranding();
