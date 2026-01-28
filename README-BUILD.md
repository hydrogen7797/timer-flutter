# 3分プロトコルアプリ ビルド手順

## 概要
このプロジェクトは、3つのタイマーアプリ（END 3min、SLEEP 3min、NOW NOT DECIDE）を1つのコードベースから生成します。

## プロジェクト構成
- **END 3min**: 終業用アプリ（白いドット）
- **SLEEP 3min**: 就寝前用アプリ（青いドット）
- **NOW NOT DECIDE**: 判断停止用アプリ（赤いドット）

各アプリはiOS/Android両対応で、計6パッケージを生成します。

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. アイコンの生成
```bash
# sharpをインストール（初回のみ）
npm install --save-dev sharp

# アイコンを生成
npm run generate-icons
```

これにより、以下のアイコンが `assets/images/` に生成されます：
- `icon-end.png` (白いドット)
- `icon-sleep.png` (青いドット)
- `icon-decide.png` (赤いドット)

## ビルド方法

### 方法1: EAS Buildを使用（推奨）

#### 1. EAS CLIのインストール
```bash
npm install -g eas-cli
eas login
```

#### 2. 各アプリのビルド

**END 3min (iOS)**
```bash
cp app-end.json app.json
eas build --platform ios --profile production
```

**END 3min (Android)**
```bash
cp app-end.json app.json
eas build --platform android --profile production
```

**SLEEP 3min (iOS)**
```bash
cp app-sleep.json app.json
eas build --platform ios --profile production
```

**SLEEP 3min (Android)**
```bash
cp app-sleep.json app.json
eas build --platform android --profile production
```

**NOW NOT DECIDE (iOS)**
```bash
cp app-decide.json app.json
eas build --platform ios --profile production
```

**NOW NOT DECIDE (Android)**
```bash
cp app-decide.json app.json
eas build --platform android --profile production
```

### 方法2: ローカルビルド

#### iOS
```bash
# END 3min
cp app-end.json app.json
npx expo run:ios --configuration Release

# SLEEP 3min
cp app-sleep.json app.json
npx expo run:ios --configuration Release

# NOW NOT DECIDE
cp app-decide.json app.json
npx expo run:ios --configuration Release
```

#### Android
```bash
# END 3min
cp app-end.json app.json
npx expo run:android --variant release

# SLEEP 3min
cp app-sleep.json app.json
npx expo run:android --variant release

# NOW NOT DECIDE
cp app-decide.json app.json
npx expo run:android --variant release
```

### 方法3: ビルドスクリプトを使用

```bash
# 全アプリのビルド設定を確認
npm run build:all

# 個別ビルド（Linux/Mac）
chmod +x scripts/build-app.sh
./scripts/build-app.sh END ios
./scripts/build-app.sh END android
./scripts/build-app.sh SLEEP ios
./scripts/build-app.sh SLEEP android
./scripts/build-app.sh DECIDE ios
./scripts/build-app.sh DECIDE android
```

## 開発・テスト

### 開発モードで起動
```bash
# デフォルト（END 3min）で起動
npm start

# 特定のアプリで起動する場合
# app-end.json, app-sleep.json, app-decide.json のいずれかを app.json にコピー
cp app-end.json app.json
npm start
```

## 納品物

各アプリのビルドが完了すると、以下のファイルが生成されます：

### iOS
- `END 3min.ipa` または TestFlight用ビルド
- `SLEEP 3min.ipa` または TestFlight用ビルド
- `NOW NOT DECIDE.ipa` または TestFlight用ビルド

### Android
- `end-3min.apk` または `end-3min.aab`
- `sleep-3min.apk` または `sleep-3min.aab`
- `now-not-decide.apk` または `now-not-decide.aab`

## Bundle ID / Package名

- **END 3min**
  - iOS: `com.timer.end3min`
  - Android: `com.timer.end3min`

- **SLEEP 3min**
  - iOS: `com.timer.sleep3min`
  - Android: `com.timer.sleep3min`

- **NOW NOT DECIDE**
  - iOS: `com.timer.nownotdecide`
  - Android: `com.timer.nownotdecide`

## 注意事項

1. ビルド前に必ず対応する `app-*.json` を `app.json` にコピーしてください
2. アイコンは必ず生成してください（`npm run generate-icons`）
3. 各アプリは独立したBundle ID/Package名を持っているため、同時にデバイスにインストール可能です
4. ビルド後は元の `app.json` を復元することを推奨します（バックアップが自動で作成されます）

## トラブルシューティング

### アイコンが生成されない
- `sharp` がインストールされているか確認: `npm list sharp`
- インストール: `npm install --save-dev sharp`

### ビルドエラー
- `app.json` が正しいアプリの設定ファイルになっているか確認
- Bundle ID/Package名が重複していないか確認
- EAS Buildを使用する場合、`eas.json` の設定を確認

### アプリが起動しない
- 開発モードでテスト: `npm start`
- ログを確認: `npx expo start --clear`
