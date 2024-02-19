import './activity.css';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ActivitySession } from '../../../interfaces/activity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../../../services/userService';
import Loader from '../../loader/Loader';

const Activity = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userActivity, setUserActivity] = useState<ActivitySession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    getActivityById(parseInt(userId, 10))
      .then((json) => {
        setUserActivity(json);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(
          'Erreur lors de la récupération des données d activités:',
          e
        );
      });
  }, [userId]);

  // Transforms userActivity data by adding a 'dayIndex' property.
  // 'dayIndex' assigns a number (index + 1) to each session, enabling a numerical view for dates.
  const transformedData = userActivity.map((session, index) => ({
    ...session,
    dayIndex: index + 1,
  }));

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <p>En chargement..</p>
        <Loader />
      </div>
    );
  }

  if (!userId) {
    return <div> L'utilisateur n'existe pas</div>;
  }

  return (
    <div className="activity_wrapper">
      <p className="title_charts">Activité quotidienne</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 30, bottom: 0 }}
          barGap={7}
        >
          {' '}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            horizontalCoordinatesGenerator={({ height }) => {
              const topAndBottomMargin = 30;
              const usableHeight = height - 2 * topAndBottomMargin;
              const lineSpacing = usableHeight / 3;
              return [
                topAndBottomMargin + lineSpacing,
                topAndBottomMargin + lineSpacing * 2,
                topAndBottomMargin + lineSpacing * 3,
              ];
            }}
          />
          <XAxis
            dataKey="dayIndex"
            interval={0}
            stroke="#9B9EAC"
            padding={{ left: 11, right: 11 }}
            tickLine={false}
            tickMargin={10}
            axisLine={{ stroke: '#d5d5d5' }}
            scale="point"
          >
            {' '}
          </XAxis>
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickCount={3}
            interval="preserveStartEnd"
            type="number"
            domain={['dataMin - 2', 'dataMax + 1']}
            stroke="#9B9EAC"
            axisLine={false}
            tickLine={false}
            tickMargin={30}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload) {
                return (
                  <div
                    className="custom-tooltip"
                    style={{
                      color: '#fff',
                      backgroundColor: '#FF0101',
                      padding: '10px',
                      fontSize: '10px',
                      width: '49px',
                      height: '73px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    {payload.map((entry, index) => (
                      <p key={index}>
                        {entry.name === 'Poids (kg)'
                          ? `${entry.value}kg`
                          : `${entry.value}Kcal`}
                      </p>
                    ))}
                  </div>
                );
              }

              return null;
            }}
            labelFormatter={() => ''}
          />
          <Legend
            verticalAlign="top"
            align="right"
            content={({ payload }) => {
              if (payload) {
                return (
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      gap: '10px',
                    }}
                  >
                    {payload.map((entry, index) => (
                      <li
                        key={`item-${index}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          marginBottom: 5,
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          style={{ marginRight: 5, paddingTop: 1 }}
                        >
                          <circle cx="4" cy="4" r="4" fill={entry.color} />
                        </svg>
                        <span style={{ color: '#74798c' }}>{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
            }}
            wrapperStyle={{
              paddingTop: '25px',
              paddingBottom: '30px',
              height: '90px',
            }}
          />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            barSize={7}
            name="Poids (kg)"
            fill="#000"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            name="Calories brûlées"
            barSize={7}
            fill="#FF0101"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;
