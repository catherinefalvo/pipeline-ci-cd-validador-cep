const axios = require('axios');

const validateCepFormat = (cep) => {
  const regex = /^[0-9]{8}$/;
  return regex.test(cep);
};

const getCepInfo = async (cep) => {
  if (!validateCepFormat(cep)) {
    throw new Error('Invalid CEP format');
  }
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
};

module.exports = { validateCepFormat, getCepInfo };
