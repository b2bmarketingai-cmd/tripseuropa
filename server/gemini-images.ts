import { Express } from "express";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash-image";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function generateImageWithGemini(title: string, slug: string): Promise<string | null> {
  if (!GEMINI_API_KEY) {
    console.log("[gemini] No API key configured");
    return null;
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Professional travel photography for a European travel blog. Topic: ${title}. Style: bright, inspiring, high quality travel photo, no text overlays, no logos, realistic photography style, 16:9 ratio, vibrant colors, cinematic lighting.`
          }]
        }],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        }
      })
    });

    if (!response.ok) {
      console.log(`[gemini] API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageDir = path.join(process.cwd(), "client/public/images/blog");
          fs.mkdirSync(imageDir, { recursive: true });
          
          const ext = part.inlineData.mimeType?.includes("png") ? "png" : "webp";
          const imagePath = path.join(imageDir, `${slug}.${ext}`);
          fs.writeFileSync(imagePath, Buffer.from(part.inlineData.data, "base64"));
          
          console.log(`[gemini] Generated image: /images/blog/${slug}.${ext}`);
          return `/images/blog/${slug}.${ext}`;
        }
      }
    }

    console.log("[gemini] No image data in response");
    return null;
  } catch (error) {
    console.log(`[gemini] Error: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

export function registerGeminiRoutes(app: Express) {
  app.post("/api/generate-blog-image", async (req, res) => {
    const { title, slug } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: "title and slug are required" });
    }

    const imageUrl = await generateImageWithGemini(title, slug);
    if (imageUrl) {
      res.json({ success: true, imageUrl });
    } else {
      res.json({ success: false, error: "Image generation failed" });
    }
  });

  app.post("/api/generate-blog-images-batch", async (req, res) => {
    const { posts } = req.body;

    if (!Array.isArray(posts)) {
      return res.status(400).json({ error: "posts array is required" });
    }

    const results: Array<{ slug: string; imageUrl: string | null; error?: string }> = [];

    for (const post of posts) {
      const existingPath = path.join(process.cwd(), "client/public/images/blog");
      const existingFiles = fs.existsSync(existingPath) 
        ? fs.readdirSync(existingPath).filter(f => f.startsWith(post.slug + "."))
        : [];

      if (existingFiles.length > 0) {
        results.push({ slug: post.slug, imageUrl: `/images/blog/${existingFiles[0]}` });
        continue;
      }

      const imageUrl = await generateImageWithGemini(post.title, post.slug);
      results.push({ slug: post.slug, imageUrl });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    res.json({ results });
  });
}

export { generateImageWithGemini };
