# 3分プロトコルアプリ

3つのタイマーアプリを1つのコードベースから生成するReact Native（Expo）プロジェクトです。

## アプリ一覧

1. **END 3min** - 終業前の3分を開始
2. **SLEEP 3min** - 寝る前の3分を開始
3. **NOW NOT DECIDE** - 今は決めない

## 機能

- 3分間のタイマー（30-90-30-30秒の4区間）
- 各アプリ専用のテキスト表示
- Haptic Feedback（触覚振動）
- シンプルなUI（背景色のみ、タイマー表示なし）

## 開発

### セットアップ

```bash
npm install
npm run generate-icons
```

### 起動

```bash
# デフォルト（END 3min）で起動
npm start

# 特定のアプリで起動する場合
cp app-end.json app.json    # または app-sleep.json, app-decide.json
npm start
```

## ビルド

詳細は [README-BUILD.md](./README-BUILD.md) を参照してください。

### クイックビルド

```bash
# アイコン生成
npm run generate-icons

# 各アプリのビルド（app.jsonを置き換えてから）
cp app-end.json app.json
eas build --platform ios --profile production
eas build --platform android --profile production
```

## プロジェクト構成

```
.
├── app/
│   ├── _layout.tsx      # ルートレイアウト
│   └── index.tsx        # メインアプリ画面
├── config/
│   └── app-config.ts    # アプリ設定（3アプリのテキストと色）
├── assets/
│   └── images/          # アイコン画像
├── scripts/
│   ├── create-icons.js  # アイコン生成スクリプト
│   └── build-all.js     # ビルドスクリプト
├── app-end.json         # END 3min設定
├── app-sleep.json       # SLEEP 3min設定
└── app-decide.json      # NOW NOT DECIDE設定
```

## 仕様

### 画面遷移
1. 起動画面 → 「開始」ボタン
2. 実行情報（3分間、自動進行）
3. 終了画面 → 「閉じる」ボタン

### タイマー区間
- ① 30秒
- ② 90秒
- ③ 30秒
- ④ 30秒
合計: 180秒（3分）

### Haptic Feedback
- 開始時: 軽い振動1回
- 区間切替時: 軽い振動1回
- 終了時: 軽い振動2回（0.3秒間隔）

### 制約
- 戻る/やり直し/スキップ不可
- 再起動時は必ず起動画面から開始
- ログインなし、DB保存なし、広告なし、通知なし

## ライセンス

Private
