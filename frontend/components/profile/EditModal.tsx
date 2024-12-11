import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '../ThemedText';

interface InfoTypeText {
  type: 'text';
  value: string;
};

interface InfoTypeSelect {
  type: 'select';
  value: string;
  options: string[];
};

export type InfoType = (InfoTypeText | InfoTypeSelect) & {
  validator?: (value: string) => boolean;
};

interface EditModalProps {
  visible: boolean;
  title: string;
  info: InfoType;
  onClose: () => void;
  onSave: (value: any) => void;
};

export default function EditModal({ visible, title, info, onClose, onSave }: EditModalProps) {
  if (!visible) {
    return null;
  }

  const [value, setValue] = useState(info.value); // 初始值为当前信息值
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    if (info.validator && !info.validator(value)) { // 验证输入是否合法
      setShowError(true);
      return;
    }
    onSave(value); // 保存值
    onClose(); // 关闭弹窗
  };

  const setValueWrapped = (text: string) => {
    setValue(text);
    setShowError(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>{title}</ThemedText>
          {/* 根据信息类型显示不同的输入组件 */}
          {info.type === 'text' ? (
            <TextInput
              value={value}
              onChangeText={setValueWrapped}
              placeholder="输入文本"
              style={styles.input}
            />
          ) : info.type === 'select' ? (
            <Picker
              selectedValue={value}
              onValueChange={setValueWrapped}
            >
              {info.options.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          ) : null}

          {showError && <ThemedText style={styles.error} >输入不合法</ThemedText>}
          <View style={styles.buttonContainer}>
            <View style={styles.button} ><Button title="关闭" onPress={onClose} /></View>
            <View style={styles.button} ><Button title="保存" onPress={handleSave} /></View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 20,
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    overflow: 'hidden',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: '100%',
    margin: 5,
  },
  error: {
    color: 'red',
    marginVertical: 0,
  },
});