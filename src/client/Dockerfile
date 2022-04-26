FROM node:16

WORKDIR /client

COPY package.json ./

RUN npm install --silent

COPY ./ ./

# ENV REACT_APP_SECURITY_KEY = D73373D9B4ED6FEC5B8B2DAF6WA929B1C7D14CDC88B196EBDCCEA77AFF7BB9
# ENV REACT_APP_BACKEND_URL = http://localhost:5000/

# RUN npm install webpack-dev-server@3.11.0

EXPOSE 3000

CMD ["npm", "start"]