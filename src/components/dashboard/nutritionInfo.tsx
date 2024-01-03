import './nutritionInfo.css';
import NutritionCard from './nutritionCard';
import { KeyData } from '../../interfaces/users';
import calorieIcon from '../../assets/images/calories-icon.png';
import proteinIcon from '../../assets/images/protein-icon.png';
import carbIcon from '../../assets/images/carbs-icon.png';
import fatIcon from '../../assets/images/fat-icon.png';

const NutritionInfo = ({ keyData }: { keyData: KeyData }) => {
  return (
    <div className="nutrition_wrapper">
      <NutritionCard
        value={keyData.calorieCount}
        unite="kCal"
        type="Calories"
        icon={calorieIcon}
      />
      <NutritionCard
        value={keyData.proteinCount}
        unite="g"
        type="Proteines"
        icon={proteinIcon}
      />
      <NutritionCard
        value={keyData.carbohydrateCount}
        unite="g"
        type="Glucides"
        icon={carbIcon}
      />
      <NutritionCard
        value={keyData.lipidCount}
        unite="g"
        type="Lipides"
        icon={fatIcon}
      />
    </div>
  );
};

export default NutritionInfo;
