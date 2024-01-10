import { useParams } from 'react-router-dom';
import './session.css';
import { useEffect, useState } from 'react';
import { getSessionsById } from '../../../services/userService';
import { UserSession } from '../../../interfaces/sessions';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const Session = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    getSessionsById(parseInt(userId, 10)).then((json) => {
      setUserSessions(json);
      // console.log(json);
      setIsLoading(false);
    });
    //  .catch((e) => setError(e));
  }, [userId]);

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const transformedData = userSessions.map((session) => ({
    ...session,
    dayName: daysOfWeek[session.day - 1],
  }));

  // const firstDayData = { day: 0, dayName: '', sessionLength: 30 };
  // const lastDayData = { day: 8, dayName: '', sessionLength: 60 };
  // const extendedData = [firstDayData, ...transformedData, lastDayData];

  if (isLoading) {
    return <div>En chargement ...</div>;
  }
  if (!userId) {
    return <div> L'utilisateur n'existe pas</div>;
  }

  return (
    <div className="session_wrapper">
      <h3 className="session_title">Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height="100%">
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
            cursor={{ stroke: 'transparent' }}
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
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Session;
