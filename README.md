# Weather App — Desafio Front-end

Aplicação de clima desenvolvida em React + TypeScript para consultar previsão por cidade e exibir condições atuais, períodos do dia e métricas climáticas.

## Objetivo do projeto

Este projeto foi construído com foco em:

- componentização e reaproveitamento de UI;
- uso de tipagem estática com TypeScript;
- organização de dados e estado entre páginas/componentes;
- experiência visual consistente com Chakra UI.

## Stack

- React 19
- TypeScript
- Vite
- Chakra UI
- React Router
- Open-Meteo API (sem necessidade de chave)

## Funcionalidades

- Lista de cidades para navegação rápida;
- Tela de detalhes por cidade;
- Temperatura atual com máxima e mínima;
- Faixas horárias do dia (Dawn, Morning, Afternoon, Night);
- Informações adicionais (vento, umidade, nascer e pôr do sol);
- Tema visual baseado na temperatura atual.

## Arquitetura (resumo)

- `src/pages`: composição das telas e fluxo de navegação;
- `src/components`: componentes visuais desacoplados da busca de dados;
- `src/utils/weatherData.ts`: hook de busca e tratamento de estado remoto;
- `src/utils/weatherTheme.ts`: regras de estilo com base na temperatura;
- `src/types`: contratos tipados para resposta de clima.

Decisão técnica importante: a busca de clima foi centralizada na página de cidade, e os dados são repassados por props para os cards. Isso evita requisições duplicadas e melhora previsibilidade do estado.

## Como rodar localmente

### 1) Pré-requisitos

- Node.js 20+ (recomendado)
- npm

### 2) Configuração

Não é necessário configurar chave de API para rodar a aplicação.

### 3) Instalação e execução

```bash
npm install
npm run dev
```

### 4) Qualidade e build

```bash
npm run lint
npm run build
```

## Deploy no GitHub Pages

O projeto já está configurado para deploy automático via GitHub Actions.

### 1) Garanta que o código está na branch main

```bash
git push origin main
```

### 2) Ative o GitHub Pages no repositório

- Abra Settings → Pages;
- Em Source, selecione GitHub Actions.

### 3) Acompanhe o workflow

- Vá em Actions;
- Execute (ou aguarde) o workflow Deploy to GitHub Pages.

A URL final ficará no formato:

https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/

## Melhorias futuras

- testes unitários para utilitários e componentes principais;
- estados de loading/skeleton mais ricos;
- internacionalização de textos;
- cache de requisições e invalidação otimizada.
