# Email Configuration Setup for Sheetal Aromatics Website

This guide explains how to set up email functionality for your website using free email services.

## Option 1: Resend (Recommended - Free Tier Available)

Resend offers 3,000 emails/month for free and is the easiest to set up.

### Setup Steps:
1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your domain or use their test domain
3. Generate an API key from the dashboard
4. Add to your Vercel environment variables:
   \`\`\`
   RESEND_API_KEY=your_api_key_here
   \`\`\`

### Pros:
- Easy setup
- Reliable delivery
- Good free tier
- Modern API

## Option 2: Gmail with App Passwords (Free)

Use your existing Gmail account to send emails.

### Setup Steps:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add to your Vercel environment variables:
   \`\`\`
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   \`\`\`

### Pros:
- Completely free
- Uses your existing Gmail
- No additional accounts needed

### Cons:
- Daily sending limits (500 emails/day)
- Requires 2FA setup

## Option 3: SendGrid (Free Tier Available)

SendGrid offers 100 emails/day for free.

### Setup Steps:
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify your sender identity
3. Create an API key
4. Add to your Vercel environment variables:
   \`\`\`
   SENDGRID_API_KEY=your_api_key_here
   \`\`\`

### Pros:
- Professional email service
- Good analytics
- Reliable delivery

### Cons:
- Lower free tier limit
- More complex setup

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the variables for your chosen email service
5. Redeploy your application

## Testing Email Functionality

After setup, test the email functionality by:
1. Submitting the contact form
2. Requesting a quote
3. Using the product quote buttons

## Email Types Handled

The system automatically handles:
- **Contact Form Submissions** → Formatted contact emails
- **Quote Requests** → Detailed quote request emails  
- **Product Inquiries** → Product-specific inquiry emails
- **General Inquiries** → Catch-all for other submissions

## Troubleshooting

### Common Issues:
1. **Emails not sending**: Check environment variables are set correctly
2. **Gmail authentication failed**: Ensure 2FA is enabled and app password is correct
3. **Resend domain issues**: Verify domain ownership or use test domain
4. **SendGrid blocked**: Check sender verification status

### Development Testing:
If no email service is configured, emails will be logged to the console for development purposes.

## Recommended Setup Order:
1. Try **Resend** first (easiest and most reliable)
2. Fall back to **Gmail** if you prefer using your existing email
3. Use **SendGrid** for more advanced email needs

## Support:
If you encounter issues, check the Vercel deployment logs or contact support with the specific error messages.
