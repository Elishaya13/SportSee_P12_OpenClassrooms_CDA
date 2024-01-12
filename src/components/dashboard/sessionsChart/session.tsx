import './session.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSessionsById } from '../../../services/userService';
import { UserSession } from '../../../interfaces/sessions';
import {
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CustomCursorProps {
  points?: { x: number; y: number }[];
  width?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
const CustomCursor = (props: CustomCursorProps) => {
  const { points, width, height, top, left, right, bottom } = props;
  if (!points || points.length === 0) {
    return null;
  }

  const { x } = points[0];
  const startX = left ? x - left : 0;

  const totalWidth = width ? width + left! + right! : 0;
  const calculatedHeight = height ? height + top! + bottom! : 0;

  return (
    <Rectangle
      fill="rgba(153, 0, 0, 0.5)"
      x={startX}
      y={0}
      width={totalWidth}
      height={calculatedHeight}
    />
  );
};

const Session = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    getSessionsById(parseInt(userId, 10))
      .then((json) => {
        setUserSessions(json);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(
          'Erreur lors de la récupération des données de sessions:',
          e
        );
      });
  }, [userId]);

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const transformedData = userSessions.map((session) => ({
    ...session,
    dayName: daysOfWeek[session.day - 1],
  }));

  if (isLoading) {
    return <div>En chargement ...</div>;
  }
  if (!userId) {
    return <div> L'utilisateur n'existe pas</div>;
  }

  return (
    <div className="session_wrapper">
      <h3 className="session_title">Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          width={230}
          height={250}
          data={transformedData}
          margin={{ top: 80, right: 20, bottom: 0, left: 20 }}
        >
          <XAxis
            dataKey="dayName"
            stroke="#FF8181"
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide={true} domain={['dataMin', 'dataMax']} />
          <Tooltip
            cursor={<CustomCursor />}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    className="custom-tooltip"
                    style={{
                      color: 'black',
                      backgroundColor: 'white',
                      padding: '5px',
                      fontSize: '8px',
                      width: '39px',
                      height: '25px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>{`${data.sessionLength} min`}</p>
                  </div>
                );
              }

              return null;
            }}
            labelFormatter={() => ''}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Session;
