import axios from "axios";

export const handleCepChange = async (cepValue) => {
  if (cepValue.length != 8) return
  const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
  return response.data
}