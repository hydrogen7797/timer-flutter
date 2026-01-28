// アイコン生成スクリプト
// 各アプリ用のドットアイコンを生成します

const fs = require('fs');
const path = require('path');

// 簡単なPNG生成のため、base64エンコードされた最小限のPNGを使用
// 実際のプロダクションでは、sharpやcanvasライブラリを使用することを推奨

// 1024x1024のPNG（黒背景、中央に小さな点）
// ここでは簡易版として、実際のアイコン生成は別ツール（例：sharp）を使用することを推奨

console.log('アイコン生成スクリプト');
console.log('注意: このスクリプトはアイコンの生成方法を示します。');
console.log('実際のアイコン生成には以下のいずれかの方法を使用してください:');
console.log('1. sharpライブラリを使用したプログラム生成');
console.log('2. 画像編集ソフト（Photoshop, GIMP等）で手動作成');
console.log('3. オンラインツール（Figma, Canva等）で作成');
console.log('');
console.log('アイコン仕様:');
console.log('- サイズ: 1024x1024px');
console.log('- 背景: 濃いグレー〜黒 (#111111 または #000000)');
console.log('- 中央に極小の点（直径約10-20px）');
console.log('  - END: 白 (#FFFFFF)');
console.log('  - SLEEP: 青 (#0000FF)');
console.log('  - DECIDE: 赤 (#FF0000)');
console.log('- 文字・ロゴ・記号は一切禁止');

// 実際のアイコン生成には sharp を使用する例
// 以下のコメントアウトされたコードを参考にしてください

/*
const sharp = require('sharp');

async function generateIcon(color, outputPath) {
  const dotSize = 15;
  const size = 1024;
  const dotX = size / 2;
  const dotY = size / 2;
  
  // SVGを作成
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#111111"/>
      <circle cx="${dotX}" cy="${dotY}" r="${dotSize}" fill="${color}"/>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
}

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets', 'images');
  
  await generateIcon('#FFFFFF', path.join(assetsDir, 'icon-end.png'));
  await generateIcon('#0000FF', path.join(assetsDir, 'icon-sleep.png'));
  await generateIcon('#FF0000', path.join(assetsDir, 'icon-decide.png'));
  
  console.log('アイコン生成完了');
}

main().catch(console.error);
*/
