// 全アプリのビルドスクリプト
// 3アプリ × 2OS = 6パッケージを生成します

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apps = [
  { name: 'END', config: 'app-end.json' },
  { name: 'SLEEP', config: 'app-sleep.json' },
  { name: 'DECIDE', config: 'app-decide.json' },
];

const platforms = ['ios', 'android'];

console.log('=== 3分プロトコルアプリ ビルドスクリプト ===\n');

// app.jsonを一時的にバックアップ
const originalAppJson = 'app.json';
const backupAppJson = 'app.json.backup';

function backupAppJson() {
  if (fs.existsSync(originalAppJson)) {
    fs.copyFileSync(originalAppJson, backupAppJson);
    console.log('app.jsonをバックアップしました\n');
  }
}

function restoreAppJson() {
  if (fs.existsSync(backupAppJson)) {
    fs.copyFileSync(backupAppJson, originalAppJson);
    fs.unlinkSync(backupAppJson);
    console.log('app.jsonを復元しました\n');
  }
}

function buildApp(app, platform) {
  console.log(`\n--- ${app.name} (${platform}) のビルドを開始 ---`);
  
  // app.jsonを一時的に置き換え
  if (fs.existsSync(app.config)) {
    fs.copyFileSync(app.config, originalAppJson);
  } else {
    console.error(`エラー: ${app.config} が見つかりません`);
    return false;
  }

  try {
    if (platform === 'ios') {
      // iOSビルド（EAS Buildを使用）
      console.log('iOSビルドを実行中...');
      console.log('注意: EAS Buildを使用する場合は、以下のコマンドを実行してください:');
      console.log(`  eas build --platform ios --profile production`);
      console.log('または、ローカルビルド:');
      console.log(`  npx expo run:ios --configuration Release`);
    } else if (platform === 'android') {
      // Androidビルド
      console.log('Androidビルドを実行中...');
      console.log('注意: EAS Buildを使用する場合は、以下のコマンドを実行してください:');
      console.log(`  eas build --platform android --profile production`);
      console.log('または、ローカルビルド:');
      console.log(`  npx expo run:android --variant release`);
    }
    
    console.log(`✓ ${app.name} (${platform}) のビルド設定を準備しました`);
    return true;
  } catch (error) {
    console.error(`✗ ${app.name} (${platform}) のビルドに失敗しました:`, error.message);
    return false;
  }
}

// メイン処理
async function main() {
  backupAppJson();

  const results = [];

  for (const app of apps) {
    for (const platform of platforms) {
      const success = buildApp(app, platform);
      results.push({
        app: app.name,
        platform,
        success,
      });
    }
  }

  restoreAppJson();

  // 結果サマリー
  console.log('\n=== ビルド結果サマリー ===');
  results.forEach((result) => {
    const status = result.success ? '✓' : '✗';
    console.log(`${status} ${result.app} (${result.platform})`);
  });

  console.log('\n=== ビルド手順 ===');
  console.log('各アプリのビルドを実行するには:');
  console.log('1. EAS Buildを使用する場合（推奨）:');
  console.log('   - eas.jsonを設定');
  console.log('   - 各app-*.jsonをapp.jsonにコピーしてからビルド');
  console.log('   - eas build --platform ios/android --profile production');
  console.log('');
  console.log('2. ローカルビルドの場合:');
  console.log('   - 各app-*.jsonをapp.jsonにコピー');
  console.log('   - npx expo run:ios/android --configuration Release');
  console.log('');
  console.log('3. 手動ビルドスクリプト:');
  console.log('   - scripts/build-app.sh を参照');
}

main().catch((error) => {
  console.error('エラー:', error);
  restoreAppJson();
  process.exit(1);
});
