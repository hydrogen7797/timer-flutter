// Build three Android APK files (END, SLEEP, DECIDE)
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apps = [
  { name: 'END', config: 'app-end.json', slug: 'end-3min' },
  { name: 'SLEEP', config: 'app-sleep.json', slug: 'sleep-3min' },
  { name: 'DECIDE', config: 'app-decide.json', slug: 'now-not-decide' },
];

const originalAppJson = 'app.json';
const backupAppJsonPath = 'app.json.backup';

function backupAppJson() {
  if (fs.existsSync(originalAppJson)) {
    fs.copyFileSync(originalAppJson, backupAppJsonPath);
    console.log('✓ app.json backed up\n');
  }
}

function restoreAppJson() {
  if (fs.existsSync(backupAppJsonPath)) {
    fs.copyFileSync(backupAppJsonPath, originalAppJson);
    fs.unlinkSync(backupAppJsonPath);
    console.log('✓ app.json restored\n');
  }
}

function buildAndroidAPK(app) {
  console.log(`\n=== Building ${app.name} APK ===`);
  
  // Copy app config to app.json
  if (!fs.existsSync(app.config)) {
    console.error(`✗ Error: ${app.config} not found`);
    return false;
  }
  
  fs.copyFileSync(app.config, originalAppJson);
  console.log(`✓ Copied ${app.config} to app.json`);
  
  try {
    console.log(`Building Android APK for ${app.name}...`);
    console.log('This may take several minutes...\n');
    
    // Build Android APK
    execSync('npx expo run:android --variant release', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log(`\n✓ ${app.name} APK build completed successfully!`);
    
    // APK location info
    const apkPath = path.join('android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
    if (fs.existsSync(apkPath)) {
      const outputPath = path.join('builds', `${app.slug}.apk`);
      const buildsDir = path.join(process.cwd(), 'builds');
      
      // Create builds directory if it doesn't exist
      if (!fs.existsSync(buildsDir)) {
        fs.mkdirSync(buildsDir, { recursive: true });
      }
      
      // Copy APK to builds directory with app name
      fs.copyFileSync(apkPath, outputPath);
      console.log(`✓ APK saved to: ${outputPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`\n✗ ${app.name} APK build failed:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('=== Building Three Android APK Files ===\n');
  console.log('This will build:');
  apps.forEach(app => console.log(`  - ${app.name} (${app.slug}.apk)`));
  console.log('');
  
  backupAppJson();
  
  const results = [];
  
  for (const app of apps) {
    const success = buildAndroidAPK(app);
    results.push({
      app: app.name,
      success,
    });
    
    // Small delay between builds
    if (app !== apps[apps.length - 1]) {
      console.log('\n--- Waiting before next build ---\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  restoreAppJson();
  
  // Summary
  console.log('\n=== Build Summary ===');
  results.forEach((result) => {
    const status = result.success ? '✓' : '✗';
    console.log(`${status} ${result.app} APK`);
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n${successCount} out of ${apps.length} APKs built successfully.`);
  
  if (successCount === apps.length) {
    console.log('\n✓ All APK files are ready in the builds/ directory!');
  }
}

main().catch((error) => {
  console.error('\n✗ Fatal error:', error);
  restoreAppJson();
  process.exit(1);
});
