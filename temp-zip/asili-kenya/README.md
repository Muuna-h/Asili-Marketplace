# Asili Kenya E-Commerce Website

This is an e-commerce website for Asili Kenya, featuring authentic Kenyan products with a React frontend and PostgreSQL backend.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- VS Code (recommended)

## Setting Up the Project

### Step 1: Install Dependencies

Open a terminal in the root directory of the project and run:

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```
# Database
DATABASE_URL=postgres://username:password@localhost:5432/asili_kenya

# Supabase (for image storage)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You'll need to replace the values with your actual database connection string and Supabase credentials.

### Step 3: Set Up the Database

Run the following command to push the database schema to your PostgreSQL database:

```bash
npm run db:push
```

This will create all necessary tables based on the schema defined in `shared/schema.ts`.

### Step 4: Start the Development Server

```bash
npm run dev
```

This will start both the backend Express server and the frontend Vite development server.

The app will be available at: http://localhost:3000

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - UI components
    - `/pages` - Page components
    - `/hooks` - Custom React hooks
    - `/lib` - Utility functions and constants
- `/server` - Backend Express server
  - `index.ts` - Server entry point
  - `routes.ts` - API routes
  - `storage.ts` - Database operations
  - `db.ts` - Database connection
- `/shared` - Shared code between frontend and backend
  - `schema.ts` - Database schema definitions

## Admin Dashboard

Access the admin dashboard at http://localhost:3000/admin

Default admin credentials:
- Username: admin
- Password: admin123

## Deploying the Website

There are several ways to deploy this application. Below are instructions for a few common hosting platforms.

### Option 1: Deploying to Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel login` and follow the prompts
4. From the project directory, run `vercel`
5. Follow the prompts to deploy your application

### Option 2: Deploying to Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Run `netlify login` and follow the prompts
4. From the project directory, run `netlify deploy`
5. Follow the prompts to deploy your application

### Option 3: Deploying to a VPS (Digital Ocean, AWS, etc.)

1. Set up a VPS with Node.js installed
2. Clone the repository to your server
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Use a process manager like PM2 to run the application:
   ```
   npm install -g pm2
   pm2 start npm -- start
   ```

## Attaching a Custom Domain

### Step 1: Purchase a Domain

Purchase a domain from a domain registrar like Namecheap, GoDaddy, or Google Domains.

### Step 2: Configure DNS Settings

Depending on where you've deployed your website, you'll need to configure your DNS settings:

#### For Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to "Settings" > "Domains"
4. Add your custom domain
5. Follow the instructions to update your DNS settings (typically adding an A record or CNAME)

#### For Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to "Settings" > "Domain management"
4. Click "Add custom domain"
5. Follow the instructions to update your DNS settings

#### For VPS:

1. Set up Nginx or Apache as a reverse proxy
2. Configure your DNS settings to point to your server's IP address
3. Obtain an SSL certificate using Let's Encrypt/Certbot

### Step 3: Set Up SSL (HTTPS)

Most platforms (Vercel, Netlify) handle SSL certificates automatically. If you're using a VPS, use Let's Encrypt to generate a free SSL certificate:

```bash
sudo apt-get install certbot
sudo certbot --nginx
```

Follow the prompts to generate and install the SSL certificate.

## Maintaining Your Site

### Updating Content

Use the admin dashboard to:
- Add/edit products
- Manage categories
- View and update orders

### Backing Up Your Database

Regularly backup your PostgreSQL database:

```bash
pg_dump -U username asili_kenya > backup.sql
```

### Updating the Site

To update the site with new changes:

1. Pull the latest changes: `git pull`
2. Install any new dependencies: `npm install`
3. Rebuild the application: `npm run build`
4. Restart the server

## Troubleshooting

- **Database connection issues**: Verify your DATABASE_URL is correct and the PostgreSQL server is running
- **Image upload problems**: Check your Supabase credentials and bucket permissions
- **Server not starting**: Check if the port is already in use or if there are any error messages

For further assistance, contact the developer team.