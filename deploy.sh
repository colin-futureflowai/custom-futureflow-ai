#!/bin/bash

echo "🚀 Starting Vercel Deployment Process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Checking Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
else
    echo -e "${GREEN}✓ Vercel CLI is installed${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Login to Vercel${NC}"
echo "Please follow the prompts to login:"
vercel login

echo ""
echo -e "${BLUE}Step 3: Deploying to Production${NC}"
echo "Deploying your app to Vercel..."
vercel --prod

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "Your site should be live at your Vercel URL"
echo ""
echo -e "${YELLOW}Don't forget to:${NC}"
echo "1. Set environment variables in Vercel Dashboard"
echo "2. Configure Stripe webhooks for production"
echo "3. Test the live site"