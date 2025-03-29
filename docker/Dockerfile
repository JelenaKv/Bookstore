FROM cypress/factory

WORKDIR /app

COPY package*.json ./

RUN npm install


RUN apt-get update \
    && apt-get install -y wget gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable
    
RUN wget https://packages.microsoft.com/keys/microsoft.asc \
    && gpg --dearmor microsoft.asc \
    && mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/ \
    && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list' \
    && apt-get update \
    && apt-get install -y microsoft-edge-stable

COPY . .

EXPOSE 8080

CMD ["npm", "run", "cypress:run:all"]
