import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function NounChart({ nouns }: { nouns: Record<string, number> }) {
  const labels = Object.keys(nouns).slice(0, 50);
  const values = Object.values(nouns).slice(0, 50);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Frequency",
        data: values,
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Top 50 Nouns Frequency" },
    },
    scales: {
      x: { ticks: { autoSkip: false, maxRotation: 90, minRotation: 45 } },
    },
  };

  return (
    <div className="bg-card border rounded-md p-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
