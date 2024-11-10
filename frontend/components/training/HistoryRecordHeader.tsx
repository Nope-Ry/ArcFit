import {View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Divider } from "@/components/ui/divider";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HistoryRecordHeader() {

    return (
        <View className="flex flex-col items-center bg-white pt-16 shadow">
            <View className="h-20 justify-center">
                <ThemedText type="title">历史记录</ThemedText>
            </View>
            <Divider />
            <View className="h-12 justify-center">
                {/* Date time selecter */}
                <DateTimePicker
                    className='w-full'
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