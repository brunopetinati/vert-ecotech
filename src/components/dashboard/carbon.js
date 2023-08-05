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
    result.push({ month: monthYear, estimate_ha: cumulativeTotal });
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
    result.push({ month: monthYear, hectares: cumulativeTotal });
  }

  return result;
};

export const mergeCarbonData = (carbon_1, carbon_2) => {
  // Cria um objeto para armazenar os dados mesclados usando o mês como chave
  const mergedData = {};

  // Itera sobre o array carbon_1 e adiciona as informações no objeto mesclado
  carbon_1.forEach((item) => {
    const { month, estimate_ha } = item;
    if (!mergedData[month]) {
      mergedData[month] = { month, estimate_ha, hectares: null };
    } else {
      mergedData[month].estimate_ha += estimate_ha;
    }
  });

  // Itera sobre o array carbon_2 e adiciona as informações no objeto mesclado
  carbon_2.forEach((item) => {
    const { month, hectares } = item;
    if (!mergedData[month]) {
      mergedData[month] = { month, estimate_ha: null, hectares };
    } else {
      mergedData[month].hectares = hectares;
    }
  });

  // Converte o objeto mesclado em um array
  const result = Object.values(mergedData);

  return result;
};