FROM node:alpine
WORKDIR /app/shibutzit
COPY . .
RUN npm install -g typescript
ENV HOST=0.0.0.0
# ENV DB=mongodb+srv://myusername:1234@cluster0.b1jwk.mongodb.net/test
ENV INLINE_RUNTIME_CHUNK=false
RUN npm install
RUN npm run build-client
EXPOSE 8081
CMD ["npm","run","start"]