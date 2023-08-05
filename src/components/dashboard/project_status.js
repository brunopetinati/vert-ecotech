import { getMonthName } from './months';

export const groupByMonthAndStatus = (projects) => {
  const totalsByMonthAndStatus = {};

  projects.forEach((project) => {
    const date = new Date(project.created_at);
    const monthYear = `${getMonthName(date.getMonth() + 1)}`;
    const status = project.status;

    if (!totalsByMonthAndStatus[monthYear]) {
      totalsByMonthAndStatus[monthYear] = {
        month: monthYear,
        started: 0,
        analysis: 0,
        viability: 0,
        negotiation: 0,
        idle: 0,
        implementing: 0,
        concluded: 0,
      };
    }

    totalsByMonthAndStatus[monthYear][status] += 1;
  });

  const result = Object.values(totalsByMonthAndStatus);
  return result;
};

// Exemplo de uso:
const projects = [
  { created_at: "2023-06-10", status: "started" },
  { created_at: "2023-06-15", status: "analysis" },
  { created_at: "2023-06-20", status: "viability" },
  { created_at: "2023-07-05", status: "started" },
  { created_at: "2023-07-10", status: "negotiation" },
  { created_at: "2023-07-20", status: "idle" },
];

const groupedData = groupByMonthAndStatus(projects);
console.log(groupedData);
