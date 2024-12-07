import { useUser } from '@/contexts/UserContext';
import { Image } from 'expo-image';
import { ImageSourcePropType } from 'react-native';
import * as FileSystem from 'expo-file-system';

export async function downloadAvatarAsync(url: string) {
  const split = url.split(".");
  const suffix = split[split.length - 1];
  const localUri = FileSystem.documentDirectory + 'avatar.' + suffix;

  console.log("Trying to download avatar: remote URL", url, "local URI", localUri);
  await FileSystem.downloadAsync(url, localUri);
  console.log("Avatar downloaded.");

  await Image.clearDiskCache();
  return localUri;
}
interface AvatarProps {
  size: number;
}

export default function Avatar({size}: AvatarProps) {
  const { user } = useUser();
  
  const source: ImageSourcePropType = user.avatarLocalUri ?? require('../assets/images/icon.png');
  console.log("Avatar source:", source);
  return <Image source={source} style={{ width: size, height: size, borderRadius: size / 2, resizeMode: 'cover' }} />;
}
