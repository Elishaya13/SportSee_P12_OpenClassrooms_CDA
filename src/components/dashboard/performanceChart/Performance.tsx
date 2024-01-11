import { useParams } from 'react-router-dom';
import './performance.css';
import { useEffect, useState } from 'react';
import { getPerformanceById } from '../../../services/userService';
import { PerformanceValues } from '../../../interfaces/performance';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

type TranslateKindType = {
  [key: number]: string;
};

const translateKind: TranslateKindType = {
  1: 'Cardio',
  2: 'Énergie',
  3: 'Endurance',
  4: 'Force',
  5: 'Vitesse',
  6: 'Intensité',
};

const Performance = () => {
  const { userId } = useParams<{ userId: string }>();
  const [performanceValue, setPerformanceValue] = useState<PerformanceValues[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    Array<{
      kind: string;
      value: number;
      fullMark: number;
    }>
  >([]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    getPerformanceById(parseInt(userId, 10)).then((json) => {
      setPerformanceValue(json.data);
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (performanceValue) {
      const sortPerformanceValues = performanceValue.sort(
        (a, b) => b.kind - a.kind
      );

      const dataPerformance = sortPerformanceValues.map((entry) => ({
        kind: translateKind[entry.kind],
        value: entry.value,
        fullMark: 200,
      }));
      setData(dataPerformance);
    }
  }, [performanceValue]);

  if (isLoading) {
    return <div>En chargement ...</div>;
  }

  if (!userId) {
    return <div> L'utilisateur n'existe pas</div>;
  }

  return (
    <div className="performance_wrapper">
      <ResponsiveContainer width={260} height={260}>
        <RadarChart outerRadius={80} data={data}>
          <PolarGrid
            gridType="polygon"
            radialLines={false}
            polarRadius={[0, 16, 32, 48, 64, 80]}
          />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fontSize: '12px', fill: 'white' }}
            axisLine={false}
          />
          <PolarRadiusAxis
            domain={[0, 200]}
            tick={false}
            stroke="transparent"
          />
          <Radar
            name="performance"
            dataKey="value"
            stroke="none"
            fill="#ff0101"
            fillOpacity={0.7}
          />
          {/* <Legend /> */}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
