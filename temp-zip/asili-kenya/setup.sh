#!/bin/bash

# Setup script for Asili Kenya E-Commerce Website

echo "Setting up Asili Kenya E-Commerce Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v18 or later."
    exit 1
fi

# Check node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Node.js version $NODE_VERSION detected. Please upgrade to Node.js v18 or later."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if .env file exists, create if not
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOL
# Database
DATABASE_URL=postgres://username:password@localhost:5432/asili_kenya

# Supabase (for image storage)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
EOL
    echo ".env file created. Please update it with your actual database and Supabase credentials."
else
    echo ".env file already exists."
fi

# Ask user if they want to push database schema
read -p "Do you want to push the database schema to your PostgreSQL database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing database schema..."
    npm run db:push
    echo "Database schema pushed successfully."
fi

echo ""
echo "Setup complete! To start the development server, run: npm run dev"
echo "The application will be available at http://localhost:3000"
echo ""
echo "To access the admin dashboard, go to http://localhost:3000/admin"
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "For more information, please refer to the README.md file."