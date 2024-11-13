import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function MainRecord() {
  return (
    <View style={styles.container}>
      {/* 左侧的图像 */}
      <Image
        source={require("../../assets/images/body.png")}
        style={styles.bodyImage}
        resizeMode="contain"
      />

      {/* 右侧的锻炼信息 */}
      <View style={styles.infoBox}>
        <ThemedText type="default">开始时间</ThemedText>
        <ThemedText type="subtitle">20:34</ThemedText>
        <ThemedText type="default">运动时长</ThemedText>
        <ThemedText type="subtitle">1小时6分</ThemedText>
        <ThemedText type="default">消耗热量</ThemedText>
        <ThemedText type="subtitle">61 cal</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 30,
  },
  bodyImage: {
    width: width * 0.4,
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
