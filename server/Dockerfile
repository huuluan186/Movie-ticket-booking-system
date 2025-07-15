# --- Base stage ---
FROM node:18 AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Dev stage ---
FROM base AS dev

RUN npm install -g nodemon

# Cài netcat để wait-for.sh hoạt động
RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

EXPOSE 5000

# dùng .sequelizerc.docker.js trong image
COPY .sequelizerc.docker.js /app/.sequelizerc

CMD ["/wait-for.sh", "db", "3306", "sh", "-c", "npx sequelize-cli db:migrate && npm run dev"]

# --- Prod stage (nếu cần sau này) ---
# FROM base AS prod
# COPY wait-for.sh /wait-for.sh
# RUN chmod +x /wait-for.sh
# EXPOSE 5000
# CMD ["/wait-for.sh", "db", "3306", "sh", "-c", "npx sequelize-cli db:migrate && npm start"]
