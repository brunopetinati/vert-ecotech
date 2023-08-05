import { getMonthName } from './months';

export const calculateTotalAreaByMonth = (projects) => {
  
  const totalsByMonth = {};

  if (!projects) return;

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
  if (!projects) return;

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

  // Função para adicionar um item ao objeto mergedData, garantindo a ordem correta e acumulando os valores
  const addItem = (item) => {
    const { month, estimativa, em_processo } = item;
    if (!mergedData[month]) {
      mergedData[month] = { month, estimativa: 0, em_processo: 0 };
    }
    mergedData[month].estimativa += estimativa || 0;
    mergedData[month].em_processo += em_processo || 0;
  };

  // Adicionando os dados de carbon_1
  carbon_1.forEach(addItem);

  // Adicionando os dados de carbon_2
  carbon_2.forEach(addItem);

  // Ordenando os meses em ordem cronológica
  const months = Object.keys(mergedData).sort((a, b) => new Date(a) - new Date(b));

  // Acumulando os valores ao longo dos meses
  let cumulativeEstimativa = 0;
  let cumulativeEmProcesso = 0;
  const result = months.map((month) => {
    cumulativeEstimativa += mergedData[month].estimativa;
    cumulativeEmProcesso += mergedData[month].em_processo;
    return {
      month,
      estimativa: cumulativeEstimativa,
      em_processo: cumulativeEmProcesso,
    };
  });

  return result;
};

