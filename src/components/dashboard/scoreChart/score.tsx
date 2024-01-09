import './score.css';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import { UserData } from '../../../interfaces/users';

const Score = ({ todayScore }: Pick<UserData, 'todayScore'>) => {
  const pourcentScore = todayScore ? todayScore * 100 : 0;
  const data = [{ name: 'score', score: pourcentScore, fill: '#FF0101' }];

  return (
    <div className="score_wrapper">
      <h3 className="score_title">Score</h3>
      <div className="inner-circle">
        <p className="score-text">{pourcentScore} %</p>
        <p className="sub-text">de votre objectif</p>
      </div>
      <ResponsiveContainer minWidth={230} width="99%" height={220}>
        <RadialBarChart
          width={260}
          height={260}
          innerRadius={70}
          outerRadius={110}
          data={data}
          startAngle={180}
          endAngle={-180}
          barSize={10}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar cornerRadius="10px" dataKey="score" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Score;
