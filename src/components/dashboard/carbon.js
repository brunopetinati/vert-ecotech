const { parseISO, getMonth } = require('date-fns');

export const getTotalAreaByMonth = (projects) => {

  if (!projects) return;

  const months = ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr"];

  const totalAreaByMonth = projects.reduce((acc, project) => {
    const createdDate = parseISO(project.created_at);
    const month = getMonth(createdDate);
    acc[month] += project.total_area;
    return acc;
  }, Array(7).fill(0));

  const result = months.map((month, index) => ({
    name: month,
    seq: totalAreaByMonth[index],
  }));

  return result;
}


