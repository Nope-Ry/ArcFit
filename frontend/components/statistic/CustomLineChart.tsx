import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

interface CustomLineChartProps {
  parameterLabels: string[];
  parameterData: number[];
  showParameterInfo(param: number): void;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  parameterLabels,
  parameterData,
  showParameterInfo,
}) => {
  return (
    <LineChart
      data={{
        labels: parameterLabels,
        datasets: [{ data: parameterData }],
      }}
      width={width * 0.8}
      height={height * 0.3}
      chartConfig={{
        backgroundGradientFrom: "#fafafa",
        backgroundGradientTo: "#f5f5f5",
        color: () => `rgba(251,146,60, 0.8)`,
        labelColor: () => `rgba(0, 0, 0, 1)`,
        strokeWidth: 3,
        
        style: { borderRadius: 16 },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
        },
        decimalPlaces: 1,
        propsForLabels: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
      bezier
      onDataPointClick={({ index }) => {
        showParameterInfo(index);
      }}
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
};

export default CustomLineChart;
