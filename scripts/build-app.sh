#!/bin/bash
# 個別アプリのビルドスクリプト
# 使用方法: ./scripts/build-app.sh [APP_TYPE] [PLATFORM]
# APP_TYPE: END, SLEEP, DECIDE
# PLATFORM: ios, android

set -e

APP_TYPE=${1:-END}
PLATFORM=${2:-ios}

if [[ ! "$APP_TYPE" =~ ^(END|SLEEP|DECIDE)$ ]]; then
  echo "エラー: APP_TYPEは END, SLEEP, DECIDE のいずれかである必要があります"
  exit 1
fi

if [[ ! "$PLATFORM" =~ ^(ios|android)$ ]]; then
  echo "エラー: PLATFORMは ios または android である必要があります"
  exit 1
fi

CONFIG_FILE="app-${APP_TYPE,,}.json"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "エラー: $CONFIG_FILE が見つかりません"
  exit 1
fi

echo "=== $APP_TYPE ($PLATFORM) のビルドを開始 ==="

# app.jsonをバックアップ
if [ -f "app.json" ]; then
  cp app.json app.json.backup
fi

# 設定ファイルをapp.jsonにコピー
cp "$CONFIG_FILE" app.json

# ビルド実行
if [ "$PLATFORM" = "ios" ]; then
  echo "iOSビルドを実行中..."
  # EAS Buildを使用する場合
  # eas build --platform ios --profile production
  # またはローカルビルド
  npx expo run:ios --configuration Release
else
  echo "Androidビルドを実行中..."
  echo "Android用のネイティブプロジェクトを再生成しています (expo prebuild --clean)..."
  # 現在のapp.json (END / SLEEP / DECIDE) に合わせて android/ を再生成
  npx expo prebuild --platform android --clean

  echo "Androidリリースビルドを実行中..."
  # EAS Buildを使用する場合
  # eas build --platform android --profile production
  # またはローカルビルド
  npx expo run:android --variant release
fi

# app.jsonを復元
if [ -f "app.json.backup" ]; then
  mv app.json.backup app.json
fi

echo "=== ビルド完了 ==="
