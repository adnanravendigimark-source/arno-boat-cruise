import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { recordMediaUpload } from "@/lib/media";

// Force this route to always run as a live serverless function rather than
// get statically optimized at build time — see app/api/admin/upload/route.ts
// for why.
export const dynamic = "force-dynamic";

// Saves an uploaded video to Vercel Blob storage and returns its public
// URL — used ONLY by the hero background video field (components/Hero.tsx,
// via VideoUploadField.tsx). Kept as a separate endpoint from
// app/api/admin/upload/route.ts (images) rather than widening that one,
// since every other upload field in the admin expects an image and the
// size/type limits here are deliberately different.
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Video uploads aren't configured yet — add a Blob store to your Vercel project (Storage tab) and set BLOB_READ_WRITE_TOKEN in .env / your Vercel project's env vars. Paste a video URL instead for now.",
      },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Only video files are allowed." }, { status: 400 });
  }
  // Hero background videos should stay short and lightweight for page
  // load — 40MB is generous for a 10-20s muted loop at reasonable bitrate.
  if (file.size > 40 * 1024 * 1024) {
    return NextResponse.json({ error: "Video is larger than 40MB." }, { status: 400 });
  }

  const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
  const rawExt = extMatch ? extMatch[0].toLowerCase() : ".mp4";
  const ext = /^\.(mp4|webm|mov)$/.test(rawExt) ? rawExt : ".mp4";
  const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });
    // Never awaited-and-blocking on failure — same reasoning as the image
    // upload route: the upload itself already succeeded.
    await recordMediaUpload({
      url: blob.url,
      filename: file.name || filename,
      contentType: file.type,
      sizeBytes: file.size,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    return NextResponse.json(
      { error: "Upload failed. " + ((err as Error).message || "Please try again or paste a video URL.") },
      { status: 500 }
    );
  }
}
