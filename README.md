# Limitless Infotech Solution Web Application

This is the official web application for Limitless Infotech Solution Pvt. Ltd. It serves as our digital identity, showcasing our services, projects, team, and providing various client and internal management tools.

## Project Structure

The project is built with Next.js (App Router) and uses TypeScript, Tailwind CSS, and Shadcn UI components for a modern and responsive user experience.

-   `app/`: Contains all Next.js App Router pages, layouts, and API routes.
    -   `admin/`: Admin panel for internal management.
    -   `api-docs/`: Public API documentation.
    -   `api/`: Backend API routes (Next.js Route Handlers).
    -   `careers/`: Career opportunities page.
    -   `components/`: Reusable React components used across the application.
    -   `cpanel/`: Client control panel for hosting management.
    -   `docs/`: Internal company documentation.
    -   `projects/`: Portfolio of completed projects.
    -   `services/`: Detailed descriptions of our services.
    -   `team/`: Meet our team members.
    -   `webmail/`: Webmail client for email access.
    -   `layout.tsx`: Root layout for the entire application.
    -   `page.tsx`: Main landing page.
    -   `globals.css`: Global CSS styles (primarily Tailwind base and custom utilities).
-   `components/ui/`: Shadcn UI components (generated via `shadcn-ui`).
-   `hooks/`: Custom React hooks.
-   `lib/`: Utility functions, authentication logic, database connections, etc.
-   `public/`: Static assets like images, fonts, etc.
-   `scripts/`: Various shell and SQL scripts for setup, deployment, and database management.
-   `deployment/`: Deployment-related scripts and configuration files.

## Getting Started

### Prerequisites

-   Node.js (v20 or later)
-   npm or Yarn (npm is recommended)

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-repo/limitless-webapp.git
    cd limitless-webapp
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your environment variables. Refer to `deployment/go-live-checklist.ts` for a list of required variables.

    Example `.env.local`:
    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1h
    RESEND_API_KEY=your_resend_api_key
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    NODE_ENV=development
    \`\`\`

4.  **Run database setup (optional, if using a database):**
    If you have a database (e.g., PostgreSQL with Neon or Supabase), you might need to run initial schema and seed data scripts.
    \`\`\`bash
    # Example for PostgreSQL (adjust based on your database setup)
    # npm run db:migrate # if using Prisma or similar ORM
    # npm run db:seed    # if you have seed data scripts
    \`\`\`
    Refer to the `scripts/` directory for available database scripts.

### Running the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

This command builds the application for production to the `.next` folder.

### Running in Production Mode

\`\`\`bash
npm run start
\`\`\`

This command starts the Next.js production server.

## Deployment

This project is designed for deployment on Vercel.

1.  **Vercel Deployment:**
    -   Ensure your environment variables are configured in your Vercel project settings.
    -   Connect your Git repository to Vercel.
    -   Vercel will automatically detect the Next.js project and deploy it.

2.  **Manual Deployment (e.g., to a VPS with Nginx):**
    Refer to the `deployment/` directory for scripts and configuration examples:
    -   `deployment/deploy.sh`: Example shell script for deployment.
    -   `deployment/nginx-production.conf`: Example Nginx configuration.
    -   `deployment/go-live-checklist.ts`: Checklist for production readiness.
    -   `deployment/health-check.ts`: Script to verify system health post-deployment.

## Admin & cPanel Access

For demo purposes, the Admin and cPanel sections have hardcoded credentials:

-   **Admin Panel (`/admin`)**:
    -   Username: `admin`
    -   Password: `limitless2024`
-   **cPanel (`/cpanel`)**:
    -   Username: `cpanel`
    -   Password: `limitless2024`
-   **Webmail (`/webmail`)**:
    -   Email: `user@limitless.com`
    -   Password: `webmail2024`

**Note:** In a real production environment, these should be replaced with a robust authentication system (e.g., NextAuth.js, Supabase Auth) and secure credential management.

## Contributing

We welcome contributions! Please follow our contribution guidelines (to be added).

## License

This project is licensed under the MIT License.
\`\`\`

\`\`\`
