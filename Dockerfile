FROM node:18
WORKDIR /device
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "device.js"]