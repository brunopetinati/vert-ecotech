import { getMonthName } from './months';

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
    result.push({ month: monthYear, estimativa: cumulativeTotal });
  }

  return result;
};

export const calculateTotalRealAreaByMonth = (projects) => {
  const filteredProjects = projects.filter((project) => project.status !== null);

  const totalsByMonth = {};

  filteredProjects.forEach((project) => {
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
    result.push({ month: monthYear, em_processo: cumulativeTotal });
  }

  return result;
};

export const mergeCarbonData = (carbon_1, carbon_2) => {
  const mergedData = {};

  carbon_1.forEach((item) => {
    const { month, estimativa } = item;
    if (!mergedData[month]) {
      mergedData[month] = { month, estimativa, em_processo: null };
    } else {
      mergedData[month].estimativa += estimativa;
    }
  });

  carbon_2.forEach((item) => {
    const { month, em_processo } = item;
    if (!mergedData[month]) {
      mergedData[month] = { month, estimativa: null, em_processo };
    } else {
      mergedData[month].em_processo = em_processo;
    }
  });

  const result = Object.values(mergedData);

  return result;
};