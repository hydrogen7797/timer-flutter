import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter/material.dart';

import '../config/app_config.dart';

enum TimerScreen { launch, execution, end }

// Timer intervals in seconds: 30, 90, 30, 30 = 180s (3 min)
const List<int> intervals = [30, 90, 30, 30];

class TimerScreenWidget extends StatefulWidget {
  const TimerScreenWidget({super.key});

  @override
  State<TimerScreenWidget> createState() => _TimerScreenWidgetState();
}

class _TimerScreenWidgetState extends State<TimerScreenWidget> {
  TimerScreen _screen = TimerScreen.launch;
  int _currentIntervalIndex = 0;
  int _remainingTime = intervals[0];
  Timer? _timer;
  final AppConfig _config = getAppConfig();

  @override
  void initState() {
    super.initState();
    _startLaunchPhase();
  }

  void _startLaunchPhase() {
    Future.delayed(const Duration(milliseconds: 750), () {
      if (!mounted) return;
      setState(() {
        _screen = TimerScreen.execution;
        _currentIntervalIndex = 0;
        _remainingTime = intervals[0];
      });
      _startExecutionTimer();
    });
  }

  void _startExecutionTimer() {
    if (_screen != TimerScreen.execution) return;

    HapticFeedback.lightImpact();

    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        if (_remainingTime <= 1) {
          final nextIndex = _currentIntervalIndex + 1;
          if (nextIndex < intervals.length) {
            _currentIntervalIndex = nextIndex;
            _remainingTime = intervals[nextIndex];
            HapticFeedback.lightImpact();
          } else {
            _timer?.cancel();
            _timer = null;
            HapticFeedback.lightImpact();
            Future.delayed(const Duration(milliseconds: 300), () {
              if (mounted) HapticFeedback.lightImpact();
            });
            Future.delayed(const Duration(milliseconds: 100), () {
              if (!mounted) return;
              setState(() => _screen = TimerScreen.end);
            });
            _remainingTime = 0;
          }
        } else {
          _remainingTime--;
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      child: _buildContent(),
    );
  }

  Widget _buildContent() {
    switch (_screen) {
      case TimerScreen.launch:
        return Container(color: const Color(0xFF111111));
      case TimerScreen.execution:
        return Container(
          color: const Color(0xFF141414),
          alignment: Alignment.center,
          padding: const EdgeInsets.all(40),
          child: Text(
            _config.executionTexts[_currentIntervalIndex],
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              height: 1.6,
            ),
          ),
        );
      case TimerScreen.end:
        return Container(
          color: const Color(0xFF0F0F0F),
          alignment: Alignment.center,
          padding: const EdgeInsets.all(40),
          child: Text(
            _config.endText,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              height: 1.6,
            ),
          ),
        );
    }
  }
}
