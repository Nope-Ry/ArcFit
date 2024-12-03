import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface CustomPieChartProps {
    parameterdata: any[];
}

const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({ parameterdata }) => {

    return (
        <PieChart
            data={parameterdata.map((item) => ({
                name: item.name,
                value: item.value,
                color: getRandomColor(),
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }))}
            width={width * 0.85}
            height={220}
            chartConfig={{
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
            }}
            accessor="value" 
            backgroundColor="transparent"
            paddingLeft="0"
            absolute={false}
        />
    );
};

export default CustomPieChart;
