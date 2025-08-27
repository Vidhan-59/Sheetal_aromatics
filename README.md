# Sheetal Aromatics Website

A modern, responsive website for Sheetal Aromatics - a leading supplier of premium chemicals, essential oils, and herbal products with 20+ years of export expertise.

## Features

- 🎨 Clean, light UI design with dark/light theme support
- 🔍 Advanced product search with chemical database
- 📧 Quote request system with email notifications
- 📱 Fully responsive design
- ⚡ Performance optimized with fast routing
- 🔍 SEO optimized with structured data
- 🌐 Product categories with detailed specifications

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **Typography**: Work Sans & Open Sans
- **Email**: Resend API integration
- **Performance**: Optimized images, lazy loading, and caching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd sheetal-aromatics
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables (see Email Configuration below)

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Email Configuration

The website includes a quote request system that sends emails to `sheetalaromatics@gmail.com`. Follow these steps to configure email functionality:

### Option 1: Resend (Recommended)

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. Add the API key to your environment variables:

\`\`\`bash
# In your .env.local file
RESEND_API_KEY=your_resend_api_key_here
\`\`\`

4. Verify your domain in Resend dashboard (for production)

### Option 2: Alternative Email Services

The email API route (`app/api/send-quote/route.ts`) can be easily modified to use other services:

#### Gmail SMTP
\`\`\`typescript
// Install nodemailer: npm install nodemailer @types/nodemailer
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});
\`\`\`

#### SendGrid
\`\`\`typescript
// Install @sendgrid/mail: npm install @sendgrid/mail
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
\`\`\`

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`bash
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here

# Optional: Custom email settings
CONTACT_EMAIL=sheetalaromatics@gmail.com
FROM_EMAIL=noreply@yourdomain.com
\`\`\`

### Testing Email Functionality

1. Start the development server
2. Navigate to the Contact page
3. Fill out the quote form
4. Check your email inbox for the quote request

## Performance Optimizations

The website includes several performance optimizations:

- **Image Optimization**: Lazy loading and optimized placeholder images
- **Font Loading**: Preconnect and DNS prefetch for Google Fonts
- **CSS Optimizations**: Minimal CSS with Tailwind CSS purging
- **Component Optimization**: React.memo and performance-optimized classes
- **Routing**: Fast client-side navigation with Next.js App Router

## SEO Features

- Comprehensive meta tags and Open Graph data
- Structured data (JSON-LD) for search engines
- Automatic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Fast loading times for better search rankings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions and data
└── public/               # Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For technical support or questions about the website, contact:
- **Email**: sheetalaromatics@gmail.com
- **Phone**: +91 9825036382, +91 9825001540

## License

This project is proprietary to Sheetal Aromatics. All rights reserved.
