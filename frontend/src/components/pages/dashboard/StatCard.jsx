import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle
}) => {
  return (
    <div className="stat-card">

      <div
        className="stat-card-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="stat-card-content">

        <h4>{title}</h4>

        <h2>{value}</h2>

        <p>{subtitle}</p>

      </div>

    </div>
  );
};

export default StatCard;