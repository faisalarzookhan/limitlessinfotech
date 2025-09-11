# Limitless Infotech Solutions Web Application

Welcome to the Limitless Infotech Solutions web application! This project serves as a comprehensive platform showcasing our services, projects, team, and providing a robust cPanel-like interface for managing web hosting aspects.

## Project Overview

This application is built with Next.js (App Router), React, and Tailwind CSS, leveraging shadcn/ui components for a modern and responsive user interface. It includes:

-   **Marketing Pages**: Home, About Us, Services, Projects, Careers, Team, Contact Us.
-   **Documentation**: Company history, Mission & Values.
-   **Legal Pages**: Privacy Policy, Terms of Service, Cookies Policy.
-   **Admin Panel**: A secure area for internal management.
-   **cPanel-like Interface**: A custom control panel for managing hosting features like domains, databases, email accounts, files, SSL, CDN, security, and server monitoring.
-   **API Endpoints**: A comprehensive set of mock API routes for various functionalities.

## Features

-   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
-   **Theming**: Dark and light mode support.
-   **Form Handling**: Contact forms with mock backend logic.
-   **Dynamic Content**: Project and service detail pages.
-   **Interactive cPanel**: Simulate management of web hosting resources with detailed mock APIs for:
    -   Analytics and server monitoring
    -   Backup and file management
    -   Domain, subdomain, and DNS management
    -   Email account, auto-responder, and filter management
    -   Database and user management
    -   SSL certificate management
    -   Security and firewall rule management
-   **Authentication**: Mock authentication routes for login, logout, registration, and password reset.
-   **Real-time Features**: Placeholder for WebSocket integration for chat and notifications.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (recommended), or yarn/npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/limitless-webapp.git
    cd limitless-webapp
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as the preferred package manager.
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Update the `.env.local` file with your environment variables. For this project, mock APIs are used, so no external API keys are strictly required for basic functionality. However, to use the database features, you will need to provide Supabase credentials.

    ```env
    # Example for Supabase integration
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    # Example for JWT secret
    JWT_SECRET=a-strong-secret-key-for-jwt

    # Example for Resend (email service)
    RESEND_API_KEY=your-resend_api_key
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

    The application will be accessible at `http://localhost:3000`.

### Building for Production

```bash
pnpm build
```

### Running in Production Mode

```bash
pnpm start
```

## Testing

This project uses Jest for unit and integration testing.

-   **Run all tests:**
    ```bash
    pnpm test
    ```
-   **Run tests in watch mode:**
    ```bash
    pnpm test --watch
    ```
-   **Run tests for a specific file:**
    ```bash
    pnpm test <path_to_file>
    ```

The Jest configuration is located in `jest.config.js`, and the setup file `jest.setup.js` is used to polyfill necessary browser APIs for the Node.js test environment.

## Project Structure

```
.
├── app/
│   ├── api/                  # Next.js API Routes (mock backend)
│   │   ├── auth/             # Authentication endpoints
│   │   ├── cpanel/           # cPanel-specific API routes
│   │   ├── ...
│   ├── cpanel/               # cPanel UI components and pages
│   ├── components/           # Application-specific React components
│   ├── ...
├── components/               # Shared UI components (shadcn/ui overrides/extensions)
│   ├── ui/                   # shadcn/ui components
│   ├── ...
├── hooks/                    # Custom React hooks (e.g., useIsMobile)
├── lib/                      # Utility functions and core logic
│   ├── auth.ts               # Authentication services (JWT, NextAuth)
│   ├── database.ts           # Supabase client and database helpers
│   ├── email.ts              # Email sending services
│   ├── rate-limit.ts         # Rate limiting utilities
│   ├── ...
├── public/                   # Static assets
├── scripts/                  # Utility scripts
└── ...
```

## Technologies Used

-   **Next.js 14+**: React framework for production.
-   **React 18+**: JavaScript library for building user interfaces.
-   **TypeScript**: Strongly typed JavaScript.
-   **Tailwind CSS**: A utility-first CSS framework.
-   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
-   **Jest & React Testing Library**: For unit and integration testing.
-   **pnpm**: Fast, disk space-efficient package manager.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
