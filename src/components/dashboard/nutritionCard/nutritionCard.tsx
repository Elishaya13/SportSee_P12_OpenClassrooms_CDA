import './nutritionCard.css';

interface NutritionCardProps {
  value: number;
  unite: string;
  type: string;
  icon: string;
}

const NutritionCard = ({ value, unite, type, icon }: NutritionCardProps) => {
  return (
    <div className="nutrition_card_wrapper">
      <div className="nutrition_icon_wrapper">
        <img src={icon} alt="icon" />
      </div>
      <div className="nutrition_values_wrapper">
        <p className="nutrition_value">
          {value}
          {unite}
        </p>
        <span className="nutrition_categorie">{type}</span>
      </div>
    </div>
  );
};

export default NutritionCard;
