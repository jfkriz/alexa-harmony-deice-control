FROM node:12.16.3-buster

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./dist ./

# Expose port 8080 (should match the app port)
EXPOSE 3000

CMD [ "node", "app.js" ]
