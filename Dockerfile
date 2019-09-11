FROM node:10.15.3

LABEL Thomas DSilva (thomas.dsilva.contractor@macmillan.com) 
COPY ./ ./
RUN npm install
#EXPOSE 3000

#CMD ["npm", "run", "test"]