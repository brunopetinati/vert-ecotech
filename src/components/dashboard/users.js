import { getMonthName } from "./months";

export const groupByUserType = (users) => {
  const totalUsers = {};
  
  if (!users) return;

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



// Exemplo de uso:
const users = [
  { id: 1, user_type: "adm", created_at: "2023-06-10" },
  { id: 2, user_type: "com", created_at: "2023-06-15" },
  { id: 3, user_type: "eng", created_at: "2023-06-20" },
  { id: 4, user_type: "com", created_at: "2023-07-05" },
  { id: 5, user_type: "reg", created_at: "2023-07-10" },
  { id: 6, user_type: "eng", created_at: "2023-07-20" },
  { id: 7, user_type: "com", created_at: "2023-08-02" },
  { id: 8, user_type: "adm", created_at: "2023-08-15" },
];

const userCountsByMonthAndType = groupByUserType(users);
console.log(userCountsByMonthAndType);
