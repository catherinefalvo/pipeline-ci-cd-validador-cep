const axios = require('axios');

const validateCepFormat = (cep) => {
    const regex = /^[0-9]{5}-[0-9]{3}$/;
    return regex.test(cep);
};

const getCepInfo = async (cep) => {
    if (!validateCepFormat(cep)) {
        throw new Error('CEP com formato inválido!');
    }
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};

module.exports = { validateCepFormat, getCepInfo };
