import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

interface CustomLineChartProps {
    parameterLabels: string[];  
    parameterData: number[];    
    showParameterInfo(param: string): void;  
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
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            },
            decimalPlaces: 0
        }}
        bezier
        onDataPointClick={({ index }) => {
            showParameterInfo(parameterLabels[index]);
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
    />
    );
};

export default CustomLineChart;