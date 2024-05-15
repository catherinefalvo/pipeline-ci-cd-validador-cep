
# Validador de CEP (Pipeline de CI/CD com Actions)

## Descrição

Este projeto é uma aplicação simples que valida o formato de um CEP (Código de Endereçamento Postal) e consulta informações sobre o CEP utilizando a API do ViaCEP. O projeto inclui testes unitários e de integração para garantir a funcionalidade correta e está configurado com uma pipeline de CI/CD utilizando GitHub Actions.

## Estrutura de Arquivos

```javascript
pipeline-ci-cd-validador-cep/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   └── cepValidator.js
├── tests/
│   ├── integration.test.js
│   └── unit.test.js
├── .gitignore
├── package.json
└── README.md
```

## Configuração do Projeto

### 1. Inicialize um novo projeto Node.js

```bash
npm init -y
```

### 2. Instale as dependências necessárias

```bash
npm install axios jest
```

### 3. Crie a estrutura de diretórios

```bash
mkdir src tests
```

### 4. Adicione o código básico da aplicação

Crie o arquivo `src/cepValidator.js`:

```javascript
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
```
### 5. Crie o arquivo `.gitignore`

Adicione um arquivo `.gitignore` na raiz do projeto com o seguinte conteúdo:

```bash
node_modules/
package-lock.json
```

O arquivo `.gitignore` serve para especificar quais arquivos ou diretórios o Git deve ignorar. No nosso caso, estamos ignorando a pasta `node_modules/` e o arquivo `package-lock.json`, pois eles são gerados automaticamente pelo npm e não precisam ser versionados.

## Escrita dos Testes Automatizados

### Testes Unitários

Crie o arquivo `tests/unit.test.js`:

```javascript
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
  expect(validateCepFormat('abcde-fgh')).toBe(false);
  expect(validateCepFormat('a0111-f00')).toBe(false);
});

test('Cenário CEP Inválido (Sem Traço)', () => {
  expect(validateCepFormat('14801788')).toBe(false);
  expect(validateCepFormat('14835000')).toBe(false);
});
```

### Testes de Integração

Crie o arquivo `tests/integration.test.js`:

```javascript
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
  await expect(getCepInfo('01001000')).rejects.toThrow('CEP com formato inválido!');
});

test('Cenario CEP Invalido (letras) ', async () => {
  await expect(getCepInfo('a1001-b00')).rejects.toThrow('CEP com formato inválido!');
});
```

## Configuração do GitHub Actions

Crie o arquivo `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Run unit tests
        run: npm test tests/unit.test.js

      - name: Run integration tests
        run: npm test tests/integration.test.js
```

## Configurar Scripts de Teste no package.json

Atualize o `package.json` para incluir o script de teste:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## Como Funciona a Pipeline de CI/CD

A pipeline de CI/CD é configurada para executar sempre que houver um push para o branch principal (`main`). O workflow realiza as seguintes etapas:

1. Faz checkout do código.
2. Configura o Node.js na versão 14.
3. Instala as dependências do projeto.
4. Executa os testes unitários.
5. Executa os testes de integração.

### Demonstrando a Pipeline

Para demonstrar a pipeline funcionando, faça um push para o branch `main` e verifique o log do GitHub Actions para garantir que todos os passos são executados com sucesso. 

```bash
git add .
git commit -m "Setup do projeto para teste do pipeline usando GitHub Actions"
git push origin main
```

### Referências

-   [Node.js](https://nodejs.org/)
-   [Axios](https://axios-http.com/)
-   [Jest](https://jestjs.io/)
-   [ViaCEP](https://viacep.com.br/)
-   [GitHub Actions](https://docs.github.com/en/actions)
