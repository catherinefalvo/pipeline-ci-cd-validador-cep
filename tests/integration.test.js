const { getCepInfo } = require('../src/cepValidator');

test('Cenario CEP Motuca', async () => {
  const data = await getCepInfo('14835-000');
  expect(data).toHaveProperty('cep', '14835-000');
  expect(data).toHaveProperty('logradouro', '');
  expect(data).toHaveProperty('complemento', '');
  expect(data).toHaveProperty('bairro', '');
  expect(data).toHaveProperty('localidade', 'Motuca');
  expect(data).toHaveProperty('uf', 'SP');
  expect(data).toHaveProperty('ddd', '16');
});

test('Cenario CEP Araraquara', async () => {
    const data = await getCepInfo('14801-788');
    expect(data).toHaveProperty('cep', '14801-788');
    expect(data).toHaveProperty('logradouro', 'Avenida Paulino Rodella');
    expect(data).toHaveProperty('complemento', 'de 630 ao fim - lado par');
    expect(data).toHaveProperty('bairro', 'Jardim das Flores');
    expect(data).toHaveProperty('localidade', 'Araraquara');
    expect(data).toHaveProperty('uf', 'SP');
    expect(data).toHaveProperty('ddd', '16');
  });

test('Cenario CEP Invalido', async () => {
  await expect(getCepInfo('01001000')).rejects.toThrow('Invalid CEP format');
});

test('Cenario CEP Invalido (letras) ', async () => {
    await expect(getCepInfo('a1001-b00')).rejects.toThrow('Invalid CEP format');
  });
