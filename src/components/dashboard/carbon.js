const getMonthName = (monthNumber) => {
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
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

  let cumulativeTotal = 0;
  const result = [];
  for (const monthYear in totalsByMonth) {
    cumulativeTotal += totalsByMonth[monthYear];
    result.push({ month: monthYear, hectares: cumulativeTotal });
  }

  return result;
};
