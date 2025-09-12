FROM node:22-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência para instalar primeiro
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]