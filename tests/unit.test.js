const { validateCepFormat } = require('../src/cepValidator');

test('Cenário CEP Válido', () => {
  expect(validateCepFormat('01001-000')).toBe(true);
});

test('Cenário CEP Inválido (Vazio)', () => {
  expect(validateCepFormat('')).toBe(false);
});

test('Cenário CEP Inválido (Menos Números)', () => {
    expect(validateCepFormat('1')).toBe(false);
    expect(validateCepFormat('14')).toBe(false);
    expect(validateCepFormat('148')).toBe(false);
    expect(validateCepFormat('1480')).toBe(false);
    expect(validateCepFormat('14801')).toBe(false);
    expect(validateCepFormat('14801-')).toBe(false);
    expect(validateCepFormat('14801-0')).toBe(false);
    expect(validateCepFormat('14801-00')).toBe(false);    
});

test('Cenário CEP Inválido (Mais Números)', () => {
    expect(validateCepFormat('14801-0000')).toBe(false);   
    expect(validateCepFormat('148010-000')).toBe(false);   
});

test('Cenário CEP Inválido (Letras)', () => {
    expect(validateCepFormat('abcde-fgh')).toBe(true);  
    expect(validateCepFormat('a0111-f00')).toBe(false);    
});

test('Cenário CEP Inválido (Sem Traço)', () => {
    expect(validateCepFormat('14801788')).toBe(false);  
    expect(validateCepFormat('14835000')).toBe(false);    
});