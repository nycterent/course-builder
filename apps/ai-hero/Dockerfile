# Course Builder AI Hero with SLURM Courses - Monorepo Build
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.5

# Copy root package.json and pnpm-workspace.yaml for monorepo
COPY ../package.json ../pnpm-workspace.yaml ./

# Copy apps/ai-hero package.json
COPY package.json ./apps/ai-hero/

# Copy packages that ai-hero depends on
COPY ../packages ./packages/

# Install dependencies for the whole monorepo
RUN pnpm install

# Copy ai-hero source code
COPY . ./apps/ai-hero/

# Build the ai-hero application
WORKDIR /app/apps/ai-hero
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]