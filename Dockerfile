FROM node:18.10.0
WORKDIR /
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .

EXPOSE 2000
 
CMD npm run start