// App configuration for the three variants: END, SLEEP, DECIDE.

enum AppType { end, sleep, decide }

class AppConfig {
  final String appName;
  final String launchText;
  final List<String> executionTexts;
  final String endText;
  final String dotColor;
  final String iosBundleId;
  final String androidPackage;

  const AppConfig({
    required this.appName,
    required this.launchText,
    required this.executionTexts,
    required this.endText,
    required this.dotColor,
    required this.iosBundleId,
    required this.androidPackage,
  });
}

const Map<AppType, AppConfig> appConfigs = {
  AppType.end: AppConfig(
    appName: 'END 3min',
    launchText: '終業前の3分を開始',
    executionTexts: [
      '残っている感覚が薄れていく',
      '抜ける方向に\nゆっくり吐く',
      '思考は遠ざかる\n考えは使われない',
      'さっきより弱い\nそれで十分',
    ],
    endText: '今日は切り替わった',
    dotColor: '#FFFFFF',
    iosBundleId: 'com.timer.end3min',
    androidPackage: 'com.timer.end3min',
  ),
  AppType.sleep: AppConfig(
    appName: 'SLEEP 3min',
    launchText: '寝る前の3分を開始',
    executionTexts: [
      '残っている感覚',
      '抜ける方向に\nゆっくり吐く',
      '言葉が出ても\n使わない',
      '弱くなっている\nそれで十分',
    ],
    endText: 'おやすみなさい',
    dotColor: '#0000FF',
    iosBundleId: 'com.timer.sleep3min',
    androidPackage: 'com.timer.sleep3min',
  ),
  AppType.decide: AppConfig(
    appName: 'NOW NOT DECIDE',
    launchText: 'いま決めたい感覚を\n一つだけ感じる',
    executionTexts: [
      '決めたい感覚が\n薄れていく',
      '抜ける方向に\nゆっくり吐く',
      '言葉は浮かばない\n今は決めない',
      '弱くなっている\nそれで十分',
    ],
    endText: '何もしない',
    dotColor: '#FF0000',
    iosBundleId: 'com.timer.nownotdecide',
    androidPackage: 'com.timer.nownotdecide',
  ),
};

// Default app type (e.g. for single build). Use --dart-define or build flavors to override.
AppType getAppType() {
  const env = String.fromEnvironment(
    'APP_TYPE',
    defaultValue: 'decide',
  );
  switch (env.toUpperCase()) {
    case 'END':
      return AppType.end;
    case 'SLEEP':
      return AppType.sleep;
    case 'DECIDE':
    default:
      return AppType.decide;
  }
}

AppConfig getAppConfig() => appConfigs[getAppType()]!;
