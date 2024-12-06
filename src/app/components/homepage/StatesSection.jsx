import { FaLayerGroup, FaGift, FaUsers } from "react-icons/fa";

const StatsSection = () => {
  return (
    <section>
      <div>
        {/* First statistic */}
        <div>
          <FaLayerGroup />
          <div>5,404</div>
          <p>Community-made UI elements</p>
        </div>
        {/* Second statistic */}
        <div>
          <FaGift />
          <div>100%</div>
          <p>Free for personal and commercial use</p>
        </div>
        {/* Third statistic */}
        <div>
          <FaUsers />
          <div>114,977</div>
          <p>Contributors to the community</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
