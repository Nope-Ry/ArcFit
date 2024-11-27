import {View, StyleSheet} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Divider } from "@/components/ui/divider";
import DateTimePicker from '@react-native-community/datetimepicker';
interface IHistoryRecordHeaderProps {
    date: Date;
    setDate: (date: Date) => void;
}

export default function HistoryRecordHeader({ date, setDate }: IHistoryRecordHeaderProps) {

    return (
        <View className="flex flex-col items-center bg-white" style={styles.container}>
            <View className="h-20 justify-center">
                <ThemedText type="title">历史记录</ThemedText>
            </View>
            <Divider />
            <View className="h-12 justify-center">
                {/* Date time selecter */}
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            setDate(selectedDate);
                            console.log("currentDate: ", selectedDate);
                        }
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