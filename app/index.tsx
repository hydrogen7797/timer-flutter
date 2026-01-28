import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getAppConfig } from '@/config/app-config';

type Screen = 'launch' | 'execution' | 'end';

// タイマー区間（秒）
const INTERVALS = [30, 90, 30, 30]; // 合計180秒（3分）

export default function TimerApp() {
  const [screen, setScreen] = useState<Screen>('launch');
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(INTERVALS[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const config = getAppConfig();

  // 戻るボタンを無効化
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // 戻るボタンを無効化
    });

    return () => backHandler.remove();
  }, []);

  // タイマー処理
  useEffect(() => {
    if (screen !== 'execution') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 実行画面開始時のHaptic Feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // タイマー開始
    let currentIndex = currentIntervalIndex;
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          // 区間終了
          const nextIndex = currentIndex + 1;
          
          if (nextIndex < INTERVALS.length) {
            // 次の区間へ
            currentIndex = nextIndex;
            setCurrentIntervalIndex(nextIndex);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            return INTERVALS[nextIndex];
          } else {
            // 全区間終了
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            // 終了時のHaptic Feedback（短2回、0.3秒間隔）
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setTimeout(() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }, 300);
            // 終了画面へ
            setTimeout(() => {
              setScreen('end');
            }, 100);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [screen]);

  const handleStart = () => {
    setScreen('execution');
    setCurrentIntervalIndex(0);
    setRemainingTime(INTERVALS[0]);
  };

  const handleClose = () => {
    // アプリを終了（実際の実装では、必要に応じて処理を追加）
    // ここでは何もしない（静かに放す）
  };

  // 起動画面
  if (screen === 'launch') {
    return (
      <View style={styles.launchContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>開始</Text>
        </TouchableOpacity>
        <Text style={styles.launchText}>{config.launchText}</Text>
      </View>
    );
  }

  // 実行画面
  if (screen === 'execution') {
    return (
      <View style={styles.executionContainer} pointerEvents="none">
        <Text style={styles.executionText}>
          {config.executionTexts[currentIntervalIndex]}
        </Text>
      </View>
    );
  }

  // 終了画面
  return (
    <View style={styles.endContainer}>
      <Text style={styles.endText}>{config.endText}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>閉じる</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  launchContainer: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  launchText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 40,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  executionContainer: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  executionText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 32,
  },
  endContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  endText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 32,
  },
  closeButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
