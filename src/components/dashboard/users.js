import { getMonthName } from "./months";

export const groupByUserType = (users) => {
  const totalUsers = {};
  
  if (!Array.isArray(users)) {
    console.error("O parâmetro 'users' não é um array válido.");
    return [];
  }

  users.forEach((user) => {
    const date = new Date(user.created_at);
    const monthYear = `${getMonthName(date.getMonth() + 1)}`;
    const status = user.user_type;

    if (!totalUsers[monthYear]) {
      totalUsers[monthYear] = {
        month: monthYear,
        Regular: 0,
        ADM: 0,
        COM: 0,
        ENG: 0,
      };
    }

    totalUsers[monthYear][status] += 1;
  });

  const result = Object.values(totalUsers);
  return result.reverse();
};
