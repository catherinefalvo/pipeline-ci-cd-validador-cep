const { validateCepFormat } = require('../src/cepValidator');

test('valid CEP format', () => {
  expect(validateCepFormat('01001-000')).toBe(true);
});

test('invalid CEP format', () => {
  expect(validateCepFormat('01001000')).toBe(false);
  expect(validateCepFormat('ABCDE-123')).toBe(false);
});
