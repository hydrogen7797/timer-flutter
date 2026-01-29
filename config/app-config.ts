// アプリ設定ファイル
// このファイルで3つのアプリのテキストと色を切り替えます

export type AppType = "END" | "SLEEP" | "DECIDE";

export interface AppConfig {
  appName: string;
  launchText: string;
  executionTexts: string[];
  endText: string;
  dotColor: string; // アイコンのドット色
  bundleId: {
    ios: string;
    android: string;
  };
}

export const APP_CONFIGS: Record<AppType, AppConfig> = {
  END: {
    appName: "END 3min",
    launchText: "終業前の3分を開始",
    executionTexts: [
      "残っている感覚が薄れていく",
      "抜ける方向に\nゆっくり吐く",
      "思考は遠ざかる\n考えは使われない",
      "さっきより弱い\nそれで十分",
    ],
    endText: "今日は切り替わった気がする",
    dotColor: "#FFFFFF", // 白
    bundleId: {
      ios: "com.timer.end3min",
      android: "com.timer.end3min",
    },
  },
  SLEEP: {
    appName: "SLEEP 3min",
    launchText: "寝る前の3分を開始",
    executionTexts: [
      "残っている感覚を\n一つだけ感じる",
      "吐く終わりで\n抜ける方向に",
      "言葉が出たら\n「今は使わない」と一回だけ",
      "さっきより弱い、が一つあれば十分",
    ],
    endText: "このまま何もしないでください",
    dotColor: "#0000FF", // 青
    bundleId: {
      ios: "com.timer.sleep3min",
      android: "com.timer.sleep3min",
    },
  },
  DECIDE: {
    appName: "NOW NOT DECIDE",
    launchText: "いま決めたい感覚を\n一つだけ感じる",
    executionTexts: [
      "決めたい感覚が\n薄れていく",
      "抜ける方向に\nゆっくり吐く",
      "言葉が出たら\n「今は決めない」と一回だけ",
      "「さっきより弱い」が一つあれば終了",
    ],
    endText: "終わりました\n何もしないでください",
    dotColor: "#FF0000", // 赤
    bundleId: {
      ios: "com.timer.nownotdecide",
      android: "com.timer.nownotdecide",
    },
  },
};

// 環境変数またはビルド時に設定されるアプリタイプ
// デフォルトは END（開発時）
export const getAppType = (): AppType => {
  try {
    // Expoのextra設定から取得
    const Constants = require("expo-constants").default;
    const appType = Constants?.expoConfig?.extra?.appType as
      | AppType
      | undefined;
    if (appType && ["END", "SLEEP", "DECIDE"].includes(appType)) {
      return appType;
    }
  } catch (e) {
    // expo-constantsが利用できない場合
  }

  // 環境変数から取得（ビルド時に設定）
  const envAppType = process.env.EXPO_PUBLIC_APP_TYPE as AppType | undefined;
  if (envAppType && ["END", "SLEEP", "DECIDE"].includes(envAppType)) {
    return envAppType;
  }

  // デフォルト
  return "END";
};

export const getAppConfig = (): AppConfig => {
  return APP_CONFIGS[getAppType()];
};
