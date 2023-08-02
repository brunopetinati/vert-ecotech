const getMonthName = (monthNumber) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return months[monthNumber - 1];
};

export const calculateTotalAreaByMonth = (projects) => {
  const totalsByMonth = {};

  projects.forEach((project) => {
    const date = new Date(project.created_at);
    const monthYear = `${getMonthName(date.getMonth() + 1)}`; 
    if (!totalsByMonth[monthYear]) {
      totalsByMonth[monthYear] = 0;
    }
    totalsByMonth[monthYear] += project.total_area;
  });

  const result = [];
  for (const monthYear in totalsByMonth) {
    result.push({ month: monthYear, hectares: totalsByMonth[monthYear] });
  }

  return result;
};
