#!/bin/bash

# Pull the latest Docker image
echo "Pulling the latest Docker image..."
docker pull joebeanzz123/patient_service:latest

# Run the Docker image with environment variables
echo "Running the Docker container..."
docker run -d \
  --name="patient-service" \
  -e DB_URI='mongodb+srv://HartyPotter:alohomora@krustykrab.qgxswyg.mongodb.net/Patient_Service?retryWrites=true&w=majority&appName=KrustyKrab' \
  -e JWT_SECRET_KEY="SECRET_KEY" \
  -e REFRESH_TOKEN_SECRET_KEY="REFRESH_SECRET_KEY" \
  -e JWT_ACCESS_SECRET_KEY="accesssecret" \
  -e JWT_REFRESH_SECRET_KEY="refreshsecret" \
  -e JWT_RESET_SECRET_KEY="resetsecret" \
  -e APP_MAIL="youssefashraf246@gmail.com" \
  -e APP_MAIL_KEY="wruc lqps zsmd cgwt" \
  -e REDIS_HOST="redis-14068.c239.us-east-1-2.ec2.redns.redis-cloud.com" \
  -e REDIS_PORT=14068 \
  -e REDIS_PASS='OS29hReaPP6e75raJEoh7qAsX8MNt5gM' \
  -e AUTH0_DOMAIN="ehr-ai.eu.auth0.com" \
  -e AUTH0_AUDIENCE="http://localhost:3000" \
  -e CLIENT_ID='Tc9vwfTM5FqLSwYx13PsmuKlgddz5LU3' \
  -e CLIENT_SECRET='J3CvLAizNS8mYyzuD3lC1QG9YolOMA8gtiayDI6i0oluMWMN_UeSvlJmxsUAQBo0' \
  -e PG_DB_URI='postgresql://neondb_owner:tbYk3h6vzPoy@ep-white-leaf-a5mogkc9-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require' \
  -p 3001:3001 \
  joebeanzz123/patient_service:latest

# Check the container status
if [ $? -eq 0 ]; then
  echo "Container is running successfully."
else
  echo "Failed to start the container."
  exit 1
fi
