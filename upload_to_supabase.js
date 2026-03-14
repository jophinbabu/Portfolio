const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const bucketName = 'portfolio-assets';

const assets = [
  { local: 'public/hero-bg.mp4', remote: 'hero/hero-bg.mp4' },
  { local: 'public/profile.jpg', remote: 'hero/profile.jpg' },
  { local: 'public/resume.pdf', remote: 'documents/resume.pdf' },
  { local: 'public/logo.jpg', remote: 'brand/logo.jpg' },
  { local: 'public/project1.png', remote: 'projects/project1.png' },
  { local: 'public/bloodlink-1.png', remote: 'projects/bloodlink/bloodlink-1.png' },
  { local: 'public/bloodlink-2.jpg', remote: 'projects/bloodlink/bloodlink-2.jpg' },
  { local: 'public/bloodlink-3.jpg', remote: 'projects/bloodlink/bloodlink-3.jpg' },
  { local: 'public/bloodlink-4.jpg', remote: 'projects/bloodlink/bloodlink-4.jpg' },
  { local: 'public/bloodlink-5.jpg', remote: 'projects/bloodlink/bloodlink-5.jpg' },
  { local: 'public/roadguard-1.jpg', remote: 'projects/roadguard/roadguard-1.jpg' },
  { local: 'public/roadguard-2.jpg', remote: 'projects/roadguard/roadguard-2.jpg' },
  { local: 'public/roadguard-3.png', remote: 'projects/roadguard/roadguard-3.png' },
  { local: 'public/bigchat-1.png', remote: 'projects/bigchat/bigchat-1.png' },
  { local: 'public/bigchat-2.png', remote: 'projects/bigchat/bigchat-2.png' },
  { local: 'public/bigchat-3.png', remote: 'projects/bigchat/bigchat-3.png' },
  { local: 'public/tata-trading.png', remote: 'projects/tata-trading/tata-trading.png' },
  { local: 'myphoto.jpeg', remote: 'hero/myphoto.jpeg' },
  { local: 'Jophin_Babu_FullStack_Developer (2).pdf', remote: 'documents/Jophin_Babu_FullStack_Developer.pdf' },
  { local: 'Jophin_Babu_Resume (3).pdf', remote: 'documents/Jophin_Babu_Resume_v3.pdf' },
];

async function uploadFile(localPath, remotePath) {
  const filePath = path.resolve(localPath);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${localPath}: File not found`);
    return;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const contentType = getContentType(localPath);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(remotePath, fileBuffer, {
      contentType,
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${localPath}:`, error.message);
  } else {
    console.log(`Successfully uploaded ${localPath} to ${remotePath}`);
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.pdf': return 'application/pdf';
    case '.mp4': return 'video/mp4';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

async function main() {
  console.log('Starting upload...');
  for (const asset of assets) {
    await uploadFile(asset.local, asset.remote);
  }
  console.log('Upload finished.');
}

main();
