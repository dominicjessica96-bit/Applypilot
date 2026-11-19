import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The design gallery is a development tool, not a public page.
        disallow: ["/design"],
      },
    ],
  };
}
