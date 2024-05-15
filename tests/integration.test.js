const { getCepInfo } = require('../src/cepValidator');

test('fetch CEP info', async () => {
  const data = await getCepInfo('01001-000');
  expect(data).toHaveProperty('cep', '01001-000');
  expect(data).toHaveProperty('logradouro', 'Praça da Sé');
});

test('invalid CEP format throws error', async () => {
  await expect(getCepInfo('01001000')).rejects.toThrow('Invalid CEP format');
});
