import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ThemedText } from '../ThemedText';

const { width, height } = Dimensions.get('window');

interface CustomPieChartProps {
    parameterdata: any[];
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const CustomLegend = ({ data }) => {
    return (
        <View style={styles.legendContainer}>
            {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                    <View style={styles.textContainer}>
                        <ThemedText type="default">
                            {item.percentage}% ({item.value}kg){item.name}
                        </ThemedText>
                    </View>
                </View>
            ))}
        </View>
    );
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({ parameterdata }) => {
    const totalValue = parameterdata.reduce((sum, item) => sum + item.value, 0);

    const data = parameterdata.map((item) => ({
        name: item.name,
        value: item.value,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        percentage: ((item.value / totalValue) * 100).toFixed(2),
    }));

    return (
        <View>
            <PieChart
                data={data}
                width={width * 0.80}
                height={height * 0.3}
                chartConfig={{
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft={`${width * 0.2}`}
                hasLegend={false}
            />
            <CustomLegend data={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorBox: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
});

export default CustomPieChart;