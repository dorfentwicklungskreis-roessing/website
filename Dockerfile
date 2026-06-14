# --- Stage 1: Build the static Astro site ---
FROM node:22-alpine AS build
WORKDIR /app

# Abhängigkeiten zuerst (Layer-Cache)
COPY package.json package-lock.json* ./
RUN npm ci

# Quellcode kopieren und statisch bauen
COPY . .
RUN npm run build

# --- Stage 2: Serve dist/ via nginx ---
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
