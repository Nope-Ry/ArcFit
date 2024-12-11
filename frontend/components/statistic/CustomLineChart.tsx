import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

interface CustomLineChartProps {
    parameterLabels: string[];  
    parameterData: number[];    
    showParameterInfo(param: number): void;
}


const CustomLineChart: React.FC<CustomLineChartProps> = ({ parameterLabels, parameterData, showParameterInfo }) => {
    return (
        <LineChart
        data={{
            labels: parameterLabels,
            datasets: [{ data: parameterData }]
        }}
        width={width * 0.85}
        height={height * 0.3}
        chartConfig={{
            backgroundGradientFrom: "#F5F5F5",
            backgroundGradientTo: "#F5F5F5",
            color: (opacity) => `rgba(128, 128, 128, ${opacity})`,
            labelColor: (opacity) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
            },
            decimalPlaces: 0,
            propsForLabels: {
                fontSize: 12,
                fontWeight: "bold",
            }
        }}
        bezier
        onDataPointClick={({ index }) => {showParameterInfo(index);}}
        style={{ marginVertical: 8, borderRadius: 16 }}
    />
    );
};

export default CustomLineChart;