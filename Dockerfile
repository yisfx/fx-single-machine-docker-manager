FROM docker.io/wangsaihaizai/node:v1
WORKDIR /app
COPY /dist/release/ /app
RUN npm install
# USER node
EXPOSE 9000
ENV NODE_ENV=production
ENV GLOBCONFIG=/global/global.setting.json
CMD ["node","server.js"]
