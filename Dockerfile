FROM node:19
WORKDIR /app
COPY ./package.json ./package.json
COPY  . .
RUN npm install
EXPOSE 3000 
CMD ["npm","start"]