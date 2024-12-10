import { UserInfo, ServerUserInfo } from "@/contexts/UserContext.types";
import { useUser, translateGender, translateAge } from "@/contexts/UserContext";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import Avatar from "@/components/Avatar";
import InfoGroup from "@/components/profile/InfoGroup";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import EditModal, { InfoType } from "@/components/profile/EditModal";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { API } from "@/constants/APIs";
import * as ImagePicker from "expo-image-picker";
import { emitUserEvent } from "@/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type InfoItem = InfoType & {
  label: string;
  field: keyof ServerUserInfo;
  icon: any;
};

export default function AccountScreen() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const [curItem, setCurItem] = useState<InfoItem>(null);

  const setVisible = (item: InfoItem) => {
    setCurItem(item);
    setIsVisible(true);
  };

  const setInvisible = () => {
    setIsVisible(false);
  };

  const [title, info, field] = (() => {
    if (curItem === null) {
      return [null, null, null];
    }
    const { label, field, ...info } = curItem;
    return [`编辑 ${label}`, info, field];
  })();

  const onEdit = (value: string) => {
    const tryUpdateUser = async () => {
      try {
        const newServerUser = await API.call(API.Account.update, { [field]: value });
        const newUser: UserInfo = {
          ...user,
          ...newServerUser,
        };
        setUser(newUser);
      } catch (e) {
        console.error(e);
        Alert.alert("更新失败，请稍后再试");
      }
    };
    tryUpdateUser();
  };

  const uploadAvatar = async () => {
    try {
      // 打开相机或相册上传头像
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      const uri = result.assets[0].uri;
      const response = await API.call(API.Account.uploadAvatar, uri);
      if (response.avatar_url) {
        const newUser: UserInfo = {
          ...user,
          ...response,
          avatarLocalUri: null,
        };
        setUser(newUser);
        emitUserEvent("userAvatarChanged");
      } else {
        throw new Error(response);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("更新失败，请稍后再试");
    }
  };

  const logout = async () => {
    if (!user.isLogin) {
      return;
    }
    
    try {
      await API.call(API.Account.logout, {});
      resetUser();
      navigation.navigate("profile");
    } catch (e) {
      console.error(e);
      Alert.alert("退出登录失败，请稍后再试");
    }
  };

  return (
    <View style={styles.container}>
      {/* 封面区域 */}
      <View>
        <Image source={require("../../coverimage/image.png")} style={styles.cover} />
        <TouchableOpacity style={styles.coverButton}>
          <Ionicons name="image" size={24} color="white" />
          <ThemedText style={{ color: "white" }}> 更换封面</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15, marginTop: -85 }}>
        {/* 用户头像区域 */}
        <TouchableOpacity style={styles.avatarContainer} onPress={uploadAvatar}>
          <Avatar size={styles.avatarContainer.width} />
        </TouchableOpacity>
        {/* 用户名区域 */}
        <ThemedText type="title">{user.username}</ThemedText>
        {/* 个人资料详情区域 */}
        <InfoGroup groupName={"基本信息"}>
          {[
            { label: "性别", field: "gender", value: translateGender(user.gender), type: "select", options: ["男", "女", "保密"], icon: require("../../assets/images/gender.png") },
            { label: "年龄", field: "age", value: translateAge(user.age), type: "text", icon: require("../../assets/images/age.png") },
            { label: "邮箱", field: "email", value: user.email, type: "text", icon: require("../../assets/images/email.png") },
            { label: "手机", field: "phone_number", value: user.phone_number, type: "text", icon: require("../../assets/images/phone.png") },
          ].map((item: InfoItem, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => setVisible(item)}>
                <ProfileInfo label={item.label} value={item.value} icon={item.icon} />
              </TouchableOpacity>
            );
          })}
        </InfoGroup>

        {/* 退出登录 */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutButtonText}>退出登录</ThemedText>
        </TouchableOpacity>
        <EditModal
          visible={isVisible}
          title={title}
          info={info}
          onClose={setInvisible}
          onSave={onEdit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cover: {
    width: width,
    height: 200,
  },
  coverButton: {
    // 水平排列
    flexDirection: "row",
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#525252",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#525252",
    marginLeft: 5,
  },
  avatarContainer: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
  },
  value: {
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});