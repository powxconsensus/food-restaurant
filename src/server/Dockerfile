FROM node:16

WORKDIR /server

COPY package.json ./

RUN npm install --silent

COPY . .

# ENV ATLAS_URI=mongodb+srv://Dishant:qFQIPigkZccFGkp3@cluster0.hikpg.mongodb.net/classroom?retryWrites=true&w=majority
# ENV SECURITY_KEY=D73373D9B4ED6FEC5B8B2DAF6WA929B1C7D14CDC88B196EBDCCEA77AFF7BB9
# ENV CLIENT_URL=http://localhost:3000/
# ENV PORT=5000
# ENV USER=Dishant
# ENV PASS=qFQIPigkZccFGkp3

EXPOSE 4000

CMD ["npm", "start"]