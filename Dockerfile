FROM node:20-alpine
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend
ENV NODE_ENV=production PORT=3000 TRUST_PROXY=true
EXPOSE 3000
USER node
CMD ["node", "backend/server.js"]
