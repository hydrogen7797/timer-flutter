// アイコン生成スクリプト（sharp使用版）
// 実行前に: npm install --save-dev sharp

const fs = require('fs');
const path = require('path');

// sharpがインストールされているかチェック
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('エラー: sharpがインストールされていません');
  console.log('以下のコマンドでインストールしてください:');
  console.log('  npm install --save-dev sharp');
  process.exit(1);
}

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

async function generateIcon(color, outputPath) {
  const dotSize = 15; // ドットの半径（ピクセル）
  const size = 1024; // アイコンサイズ
  const dotX = size / 2;
  const dotY = size / 2;
  const backgroundColor = '#111111'; // 背景色（濃いグレー）
  
  // SVGを作成
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
      <circle cx="${dotX}" cy="${dotY}" r="${dotSize}" fill="${color}"/>
    </svg>
  `;
  
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    console.log(`✓ 生成完了: ${path.basename(outputPath)} (色: ${color})`);
  } catch (error) {
    console.error(`✗ エラー: ${outputPath}`, error.message);
  }
}

async function main() {
  console.log('=== アイコン生成開始 ===\n');
  
  const icons = [
    { color: '#FFFFFF', filename: 'icon-end.png', name: 'END (白)' },
    { color: '#0000FF', filename: 'icon-sleep.png', name: 'SLEEP (青)' },
    { color: '#FF0000', filename: 'icon-decide.png', name: 'DECIDE (赤)' },
  ];
  
  for (const icon of icons) {
    const outputPath = path.join(assetsDir, icon.filename);
    await generateIcon(icon.color, outputPath);
  }
  
  console.log('\n=== アイコン生成完了 ===');
  console.log(`出力先: ${assetsDir}`);
}

main().catch((error) => {
  console.error('エラー:', error);
  process.exit(1);
});
