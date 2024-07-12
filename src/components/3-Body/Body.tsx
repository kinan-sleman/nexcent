import Achievements from "./components/Achievements";
import CommunityUpdate from "./components/CommunityUpdate";
import Customer from "./components/Customer";
import Unlock from "./components/Unlock";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loadUnlocks } from "../../store/Unlock/Reducer";
import { loadCustomers } from "../../store/Customer/Reducer";
import { loadAchievements } from "../../store/Achievement/Reducer";
export default function Body() {
  const AchievementsData = useSelector(
    (state: RootState) => state.achievement.Achievements
  );

  const UnlocksData = useSelector((state: RootState) => state.unlock.unlocks);
  const CustomersData = useSelector(
    (state: RootState) => state.customer.Customers
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadAchievements());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUnlocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  // تحقق من وجود بيانات قبل استخدامها
  const beforeAchievements = UnlocksData?.filter(
    (unlock) => unlock.type === "before Achievements"
  ) || [];

  const afterAchievements = UnlocksData?.filter(
    (unlock) => unlock.type === "after Achievements"
  ) || [];

  return (
    <>
      {beforeAchievements.map((unlock, index) => (
        <Unlock
          key={index}
          title={unlock.title}
          description={unlock.description}
          image={unlock.image}
          btn={unlock.btn}
        />
      ))}

      {AchievementsData?.map((achievement, index) => (
        <Achievements
          key={index}
          title={achievement.title}
          description={achievement.description}
          statistics={achievement.statistics}
        />
      ))}

      {afterAchievements.map((unlock, index) => (
        <Unlock
          key={index}
          title={unlock.title}
          description={unlock.description}
          image={unlock.image}
          btn={unlock.btn}
        />
      ))}

      {CustomersData?.map((customer, index) => {
        return (
          <Customer
            key={index}
            logo={customer.logo}
            description={customer.description}
            name={customer.name}
            association={customer.association}
            customerLogos={customer.images}
            btn={customer.btn}
          />
        );
      })}
      <CommunityUpdate />
    </>
  );
}
