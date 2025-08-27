# Gmail Email Configuration Setup

This guide explains how to set up Gmail for sending emails from the Sheetal Aromatics website.

## Prerequisites

1. A Gmail account (sheetalaromatics@gmail.com)
2. Gmail App Password (not your regular Gmail password)

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2-factor authentication

## Step 2: Generate App Password

1. After enabling 2-factor authentication, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Enter "Sheetal Aromatics Website" as the device name
5. Click "Generate"
6. Copy the 16-character app password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Set Environment Variables

Add these environment variables to your Vercel project:

\`\`\`bash
GMAIL_USER=sheetalaromatics@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
\`\`\`

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the two variables above
4. Redeploy your application

### For Local Development:
Create a `.env.local` file in your project root:

\`\`\`bash
GMAIL_USER=sheetalaromatics@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
\`\`\`

## Step 4: Test the Configuration

1. Deploy your changes to Vercel
2. Visit your website's contact page
3. Submit a test quote request
4. Check the Gmail inbox for sheetalaromatics@gmail.com

## Security Notes

- Never share your app password
- The app password is different from your Gmail login password
- If you suspect the app password is compromised, revoke it and generate a new one
- App passwords bypass 2-factor authentication, so keep them secure

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Verify the Gmail address is correct
   - Ensure you're using the app password, not the regular password
   - Check that 2-factor authentication is enabled

2. **"Less secure app access" error**
   - This shouldn't occur with app passwords, but if it does, enable "Less secure app access" in Gmail settings

3. **Emails not being received**
   - Check the spam folder
   - Verify the recipient email address
   - Check Vercel function logs for errors

### Testing Locally:

\`\`\`bash
npm run dev
# Visit http://localhost:3000/contact
# Submit a test form
\`\`\`

## Support

If you encounter issues:
1. Check the Vercel function logs
2. Verify environment variables are set correctly
3. Test with a different Gmail account if needed
4. Contact Vercel support for deployment-specific issues
