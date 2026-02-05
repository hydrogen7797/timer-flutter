import 'package:flutter/services.dart';
import 'package:flutter/material.dart';

import 'screens/timer_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF111111),
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const TimerApp());
}

class TimerApp extends StatelessWidget {
  const TimerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Timer',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF111111), brightness: Brightness.dark),
        useMaterial3: true,
      ),
      home: const TimerScreenWidget(),
    );
  }
}
