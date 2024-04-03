FROM node:21-alpine3.18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY client-gamification/ .
RUN npm install
RUN npm run build
EXPOSE 4173
CMD [ "npm", "run", "preview", "--", "--host"]