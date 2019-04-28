FROM node:8

WORKDIR /www/twitchclips
COPY . .
RUN npm install

EXPOSE 8889
EXPOSE 8890

CMD ["npm", "run", "start"]