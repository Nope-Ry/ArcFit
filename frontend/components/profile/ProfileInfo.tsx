import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';

const { width } = Dimensions.get('window');

const ProfileInfo = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <ThemedText type="defaultBold">
          {label}
        </ThemedText>
        <ThemedText type="default">
          {value}
        </ThemedText>
      </View>
      <Ionicons
        name="chevron-forward"
        size={width * 0.06}
        color="black"
        style={styles.arrow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default ProfileInfo;