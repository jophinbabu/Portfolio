const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const bucketName =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "portfolio-assets";

function buildPublicUrl(path: string) {
  const cleanPath = path.replace(/^\/+/, "");

  if (!supabaseUrl) {
    return `/${cleanPath.split("/").at(-1)}`;
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${cleanPath}`;
}

export function getPortfolioAsset(path: string) {
  return buildPublicUrl(path);
}

export const portfolioAssets = {
  heroVideo: getPortfolioAsset("hero/hero-bg.mp4"),
  resume: getPortfolioAsset("documents/resume.pdf"),
  heroProfile: getPortfolioAsset("hero/profile.jpg"),
  projects: {
    bloodlink: [
      getPortfolioAsset("projects/bloodlink/bloodlink-1.png"),
      getPortfolioAsset("projects/bloodlink/bloodlink-2.jpg"),
      getPortfolioAsset("projects/bloodlink/bloodlink-3.jpg"),
      getPortfolioAsset("projects/bloodlink/bloodlink-4.jpg"),
      getPortfolioAsset("projects/bloodlink/bloodlink-5.jpg"),
    ],
    roadguard: [
      getPortfolioAsset("projects/roadguard/roadguard-1.jpg"),
      getPortfolioAsset("projects/roadguard/roadguard-2.jpg"),
      getPortfolioAsset("projects/roadguard/roadguard-3.png"),
    ],
    tataTrading: getPortfolioAsset("projects/tata-trading/tata-trading.png"),
    bigChat: [
      getPortfolioAsset("projects/bigchat/bigchat-1.png"),
      getPortfolioAsset("projects/bigchat/bigchat-2.png"),
      getPortfolioAsset("projects/bigchat/bigchat-3.png"),
    ],
  },
} as const;
