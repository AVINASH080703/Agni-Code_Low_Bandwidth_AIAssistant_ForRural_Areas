# Use a base image
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Copy files (if any) into the container
COPY . .

# Install dependencies based on the environment
ARG ENVIRONMENT=development
RUN if [ "$ENVIRONMENT" = "production" ]; then \
        apt-get update && apt-get install -y <production-dependencies>; \
    else \
        apt-get update && apt-get install -y <development-dependencies>; \
    fi

# Command to run your application
CMD ["echo", "Running in ${ENVIRONMENT} environment"]
