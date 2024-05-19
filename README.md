# SE School test case

NestJS application which allows users to subscribe to a currency exchange rate newsletter with up-to-date currency rates.

## Technologies used

- Node
- Typescript
- NestJS
- Docker
- Prisma
- Postgres
- Eslint
- Prettier

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager
- Docker - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Nest CLI - [Install Nest CLI](https://www.npmjs.com/package/@nestjs/cli)

## Installation

01. Clone the repository

```bash
git clone https://github.com/zweroboy1/currency-api.git
```

02. Open the currency-api directory

```bash
cd currency-api
```

03. Install dependencies

```bash
npm install
```

04. Copy the file .env.example to .env:
    

```bash
cp .env.example .env
```

Then edit the .env file with your credentials.

05. Run the application with Docker (Docker Desktop should be running) 

```bash
docker compose up
```

06. Open http://localhost:4000 in your browser (port can be changed in .env file)

## Details

- The app use public API from https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5 to get currency rate.
- The app fetch rates on the first run and every day at 9 AM.
- Endpoint for the rate is http://localhost:4000/api/rate
- Endpoint for the subscription is http://localhost:4000/api/subscribe (POST, email is required)
- Mails are sent to email addresses at 3 AM every day.
