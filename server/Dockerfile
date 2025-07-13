FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

EXPOSE 5000

CMD ["/wait-for.sh", "db", "3306", "sh", "-c", "npx sequelize-cli db:migrate && npm start"]
