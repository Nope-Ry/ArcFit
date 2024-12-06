import { useUser } from '@/contexts/UserContext';
import { Image } from 'expo-image';
import { ImageSourcePropType } from 'react-native';

interface AvatarProps {
  size: number;
}

export default function Avatar({size}: AvatarProps) {
  const { user } = useUser();
  
  const source: ImageSourcePropType = user.avatarLocalUri ?? require('../assets/images/icon.png');
  console.log("Avatar source:", source);
  return <Image source={source} style={{ width: size, height: size, borderRadius: size / 2, resizeMode: 'cover' }} />;
}
