# Step 1: Install dependencies
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Copy only package files to leverage caching
COPY package.json package-lock.json* ./

# Install dependencies with legacy peer support
RUN npm install --legacy-peer-deps

# Step 2: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Build the Next.js app
RUN npm run build

# Step 3: Run the app in production
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only the necessary build artifacts and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port for the app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
