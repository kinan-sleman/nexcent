import React from "react";
import Counter from "./Counter";

interface AchievementProps {
  title: string;
  description: string;
  statistics: { label: string; value: number }[];
}

const Achievements: React.FC<AchievementProps> = ({
  title,
  description,
  statistics,
}) => {
  const words = title.split(" ");
  const firstThreeWords = words.slice(0, 3).join(" ");
  const remainingWords = words.slice(3).join(" ");
  const onInViewHandle = ()=>{}
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center flex-col md:flex-row justify-around">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            {firstThreeWords}{" "}
            <span className="text-green-500">{remainingWords}</span>
          </h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {statistics.map((statistic, index) => (
            <div key={index} className="flex gap-x-16">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  {getIcon(statistic.label)}
                  <span className="text-2xl font-bold ml-2">
                    <Counter
                      from={0}
                      to={statistic.value}
                      onInView={onInViewHandle}
                    />
                  </span>
                </div>
                <p className="text-gray-600">{statistic.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getIcon = (label: string) => {
  switch (label) {
    case "Members":
      return <div className="icon-users1 text-green-500 text-[22px]"></div>;
    case "Clubs":
      return <div className="icon-user-check text-green-500 text-[22px]"></div>;
    case "Event Bookings":
      return (
        <div className="icon-event_available text-green-500 text-[22px]"></div>
      );
    case "Payments":
      return (
        <div className="icon-credit-card text-green-500 text-[22px]"></div>
      );
    default:
      return null;
  }
};

export default Achievements;
