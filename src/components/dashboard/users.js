import { getMonthName } from "./months";

export const groupByUserType = (users) => {
  const totalUsers = {};

  if (!Array.isArray(users)) {
    console.error("O parâmetro 'users' não é um array válido.");
    return [];
  }

  users.forEach((user) => {
    const date = new Date(user.created_at);
    const year = date.getFullYear();
    const month = date.getMonth(); // O mês é indexado de 0 a 11
    const monthYear = `${year}-${month}`;

    const status = user.user_type;

    if (!totalUsers[monthYear]) {
      totalUsers[monthYear] = {
        month: `${getMonthName(month + 1)}, ${year}`,
        Regular: 0,
        ADM: 0,
        COM: 0,
        ENG: 0,
      };
    }

    totalUsers[monthYear][status] += 1;
  });

  const result = Object.values(totalUsers);

  // Ordenar os resultados com base na data (ano-mês)
  result.sort((a, b) => (a.month > b.month ? 1 : -1));

  // Inverter a ordem do array
  result.reverse();

  return result;
};
