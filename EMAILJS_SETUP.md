# EmailJS Setup Guide

Follow these steps to enable the contact form to send emails directly to your inbox.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's free - 200 emails/month on free plan)
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Click and authorize your Google account
   - **Outlook**: Enter your Outlook credentials
   - Other providers are also available
4. Click **Create Service**
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with these variables:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. In the "To Email" field, enter your email (e.g., `shieldshenry28@gmail.com`)
5. Click **Save**
6. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (sometimes called "User ID")
3. **Copy the Public Key**

## Step 5: Update Your Website Code

Open `main.js` and find the `CONFIG` section at the top. Replace the placeholder values:

```javascript
emailJS: {
    publicKey: 'YOUR_PUBLIC_KEY',    // Paste your Public Key here
    serviceID: 'YOUR_SERVICE_ID',    // Paste your Service ID here
    templateID: 'YOUR_TEMPLATE_ID'   // Paste your Template ID here
}
```

### Example (with fake IDs):
```javascript
emailJS: {
    publicKey: 'aBc123XyZ',
    serviceID: 'service_abc1234',
    templateID: 'template_xyz5678'
}
```

## Step 6: Test Your Form

1. Open your website in a browser
2. Go to the Contact page
3. Fill out the form and submit
4. Check your email inbox!

## Troubleshooting

### Form shows "EmailJS not configured"
- Make sure you replaced `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` in `main.js`
- Clear your browser cache and reload the page

### Email not received
- Check your spam/junk folder
- Verify the "To Email" in your EmailJS template is correct
- Check the browser console (F12) for error messages
- Verify your EmailJS service is connected and active

### "Failed to send message" error
- Check your EmailJS account hasn't exceeded the free tier limit (200 emails/month)
- Verify your Service ID and Template ID are correct
- Make sure your email service is still connected in EmailJS dashboard

## Template Variables Reference

These variables are automatically sent from your contact form:

- `{{from_name}}` - Name from the form
- `{{from_email}}` - Email address from the form
- `{{message}}` - Message text from the form
- `{{to_name}}` - Your name (set to "Henry Shields" in the code)

You can customize the email template in EmailJS to format these however you want!

## Cost

- **Free tier**: 200 emails/month
- **Personal plan**: $7/month for 1,000 emails
- Should be plenty for a portfolio website!

## Security Note

Your Public Key is safe to expose in client-side code - that's why it's called "public"! The Service ID and Template ID are also meant to be public.
