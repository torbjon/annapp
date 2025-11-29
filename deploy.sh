#!/bin/bash

# SSH Deployment Script for AnnaApp (Web + API)
# This script deploys both applications to the production server

set -e # Exit on any error

# Configuration - UPDATE THESE VALUES
SSH_USER="${SSH_USER:-root}"
SSH_HOST="${SSH_HOST:-165.22.67.10}"
SSH_PORT="${SSH_PORT:-22}"
REMOTE_PATH_API="/var/www/annaapp.berjoza.com/api"
REMOTE_PATH_WEB="/var/www/annaapp.berjoza.com/web"
APP_NAME_API="annaapp-api"
APP_NAME_WEB="annaapp-web"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Starting AnnaApp Deployment${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if SSH connection works
echo -e "${YELLOW}Testing SSH connection...${NC}"
if ! ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} "exit"; then
    echo -e "${RED}Failed to connect to SSH server${NC}"
    exit 1
fi
echo -e "${GREEN}SSH connection successful${NC}"

# Deploy API
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Deploying API Service${NC}"
echo -e "${BLUE}========================================${NC}"

cd apps/api

# Build API locally
echo -e "${YELLOW}Building API application locally...${NC}"
pnpm run build

# Create API deployment package (COPYFILE_DISABLE=1 avoids macOS extended attributes)
echo -e "${YELLOW}Creating API deployment package...${NC}"
COPYFILE_DISABLE=1 tar -czf deploy-api.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=src \
    dist/ \
    secrets/ \
    package.json \
    ecosystem.config.cjs

# Ensure API remote directory exists
echo -e "${YELLOW}Ensuring API remote directory exists...${NC}"
ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} "mkdir -p ${REMOTE_PATH_API}/releases && mkdir -p ${REMOTE_PATH_API}/logs"

# Upload the API package
echo -e "${YELLOW}Uploading API package to server...${NC}"
scp -P ${SSH_PORT} deploy-api.tar.gz ${SSH_USER}@${SSH_HOST}:${REMOTE_PATH_API}/

# Extract and setup API on remote server
echo -e "${YELLOW}Extracting API files on server...${NC}"
ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} << ENDSSH
# Source NVM and Node environment
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
[ -s "\$HOME/.bashrc" ] && source "\$HOME/.bashrc"

# Ensure Node.js 20 LTS is installed and active
echo "Checking Node.js version..."
if ! node -v | grep -q "^v2[0-9]"; then
    echo "Node.js 20+ required. Installing via nvm..."
    nvm install 20
    nvm alias default 20
fi
nvm use 20 || nvm use default

cd ${REMOTE_PATH_API}
tar -xzf deploy-api.tar.gz
rm deploy-api.tar.gz

# Remove devDependencies from package.json (they contain workspace:* references)
echo "Cleaning package.json for production..."
node -e "
const pkg = require('./package.json');
delete pkg.devDependencies;
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Install production dependencies
echo "Installing API dependencies..."
npm install

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found, installing..."
    npm install -g pm2
fi

# Start or restart the API application with PM2
if pm2 list | grep -q "${APP_NAME_API}"; then
    echo "Restarting API application with PM2..."
    pm2 reload ecosystem.config.cjs --env production
else
    echo "Starting API application with PM2 in cluster mode..."
    pm2 start ecosystem.config.cjs --env production
fi

# Save PM2 process list
pm2 save

# Setup PM2 startup script (only needs to be done once)
pm2 startup || true

echo "API deployment completed!"
pm2 status
ENDSSH

# Cleanup local API deployment package
rm deploy-api.tar.gz

echo -e "${GREEN}API deployment completed successfully!${NC}"

cd ../..

# Deploy Web
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Deploying Web Application${NC}"
echo -e "${BLUE}========================================${NC}"

cd apps/web

# Build Web locally
echo -e "${YELLOW}Building Web application locally...${NC}"
pnpm run build

# Create Web deployment package (COPYFILE_DISABLE=1 avoids macOS extended attributes)
echo -e "${YELLOW}Creating Web deployment package...${NC}"
COPYFILE_DISABLE=1 tar -czf deploy-web.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=src \
    .next/ \
    public/ \
    package.json \
    next.config.ts \
    ecosystem.config.cjs

# Ensure Web remote directory exists
echo -e "${YELLOW}Ensuring Web remote directory exists...${NC}"
ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} "mkdir -p ${REMOTE_PATH_WEB}/releases && mkdir -p ${REMOTE_PATH_WEB}/logs"

# Upload the Web package
echo -e "${YELLOW}Uploading Web package to server...${NC}"
scp -P ${SSH_PORT} deploy-web.tar.gz ${SSH_USER}@${SSH_HOST}:${REMOTE_PATH_WEB}/

# Extract and setup Web on remote server
echo -e "${YELLOW}Extracting Web files on server...${NC}"
ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} << ENDSSH
# Source NVM and Node environment
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
[ -s "\$HOME/.bashrc" ] && source "\$HOME/.bashrc"

# Ensure Node.js 20 LTS is active
nvm use 20 || nvm use default

cd ${REMOTE_PATH_WEB}
tar -xzf deploy-web.tar.gz
rm deploy-web.tar.gz

# Remove devDependencies from package.json (they contain workspace:* references)
echo "Cleaning package.json for production..."
node -e "
const pkg = require('./package.json');
delete pkg.devDependencies;
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Install production dependencies
echo "Installing Web dependencies..."
npm install

# Start or restart the Web application with PM2
if pm2 list | grep -q "${APP_NAME_WEB}"; then
    echo "Restarting Web application with PM2..."
    pm2 reload ecosystem.config.cjs --env production
else
    echo "Starting Web application with PM2..."
    pm2 start ecosystem.config.cjs --env production
fi

# Save PM2 process list
pm2 save

echo "Web deployment completed!"
pm2 status
ENDSSH

# Cleanup local Web deployment package
rm deploy-web.tar.gz

echo -e "${GREEN}Web deployment completed successfully!${NC}"

cd ../..

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Summary${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ API deployed to ${REMOTE_PATH_API}${NC}"
echo -e "${GREEN}✓ Web deployed to ${REMOTE_PATH_WEB}${NC}"
echo -e "${YELLOW}Check logs with:${NC}"
echo -e "  ${YELLOW}API: ssh ${SSH_USER}@${SSH_HOST} 'pm2 logs ${APP_NAME_API}'${NC}"
echo -e "  ${YELLOW}Web: ssh ${SSH_USER}@${SSH_HOST} 'pm2 logs ${APP_NAME_WEB}'${NC}"
