import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const EquipmentScreen = () => {
  return (
    <View style={styles.container}>
      {/* 图片部分 */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.picture} 
      />
      
      {/* 带圆角阴影的白色方框 */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
        高位下拉器主要用于锻炼背部、肩部和手臂的肌肉。它通常由一个高位拉索、
        滑轮系统和可调节的坐垫组成。使用者可以通过拉动手柄向下拉动拉索，锻炼
        到主要的背阔肌、斜方肌和肱二头肌。高位下拉器的多样化握柄设计允许用户
        进行不同的锻炼变体，以达到最佳的肌肉发展效果。
        </Text>
      </View>

      {/* 第二个白色方框 */}
      <View style={styles.recommendedBox}>
        <Text style={styles.recommendedText}>推荐动作</Text>
        
        {/* 扁长带圆角的矩形 */}
        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconText}>+</Text>
            </View>
            <Text style={styles.actionText}>ABCDEF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconText}>+</Text>
            </View>
            <Text style={styles.actionText}>ABCDEF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconText}>+</Text>
            </View>
            <Text style={styles.actionText}>ABCDEF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  picture: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
  },
  recommendedBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginBottom: 20,
  },
  recommendedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  actionBox: {
    flexDirection: 'column',
    gap: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5, // Android shadow effect
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default EquipmentScreen;
