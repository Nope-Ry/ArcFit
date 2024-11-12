import {View, StyleSheet} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Divider } from "@/components/ui/divider";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HistoryRecordHeader() {

    return (
        <View className="flex flex-col items-center bg-white pt-16" style={styles.container}>
            <View className="h-20 justify-center">
                <ThemedText type="title">历史记录</ThemedText>
            </View>
            <Divider />
            <View className="h-12 justify-center">
                {/* Date time selecter */}
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || new Date();
                    }}
                />

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    
        // Android shadow
        elevation: 8,
        
        paddingHorizontal: 20,
    },
});