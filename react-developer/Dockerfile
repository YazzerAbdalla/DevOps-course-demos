FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json bun.lockb* ./
RUN bun install

# Expose the development port
EXPOSE 5173

# Start development server
CMD ["bun", "run", "dev"]