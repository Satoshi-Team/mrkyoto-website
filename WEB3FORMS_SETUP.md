# Web3Forms Setup Guide

## Getting Your API Key

1. **Visit Web3Forms**: Go to https://web3forms.com/
2. **Get Access Key**: Click "Get Access Key" and enter your email
3. **Copy Your Key**: You'll receive an access key via email

## Update the Forms

Replace `YOUR-WEB3FORMS-ACCESS-KEY` in all the following files with your actual access key:

### Events Page (`events/index.html`)
```html
<input type="hidden" name="access_key" value="YOUR-ACTUAL-ACCESS-KEY-HERE">
```

### Culture Page (`culture/index.html`)
```html
<input type="hidden" name="access_key" value="YOUR-ACTUAL-ACCESS-KEY-HERE">
```

### News Page (`news/index.html`)
```html
<input type="hidden" name="access_key" value="YOUR-ACTUAL-ACCESS-KEY-HERE">
```

### Real Estate Page (`real-estate/index.html`)
```html
<input type="hidden" name="access_key" value="YOUR-ACTUAL-ACCESS-KEY-HERE">
```

## How It Works

- **Form Submission**: When users submit the form, it sends data to Web3Forms
- **Email Delivery**: Web3Forms forwards the submission to your email
- **Success Response**: Users see a success message after submission
- **No Backend Required**: Web3Forms handles everything server-side

## Form Fields

Each page has a customized signup form with relevant fields:

### Events Page
- **Name**: User's full name
- **Email**: Email address for updates
- **Event Preferences**: Traditional Festivals, Seasonal Events, Cultural Performances, Film Festivals
- **Frequency**: Weekly Updates, Monthly Digest, Seasonal Highlights

### Culture Page
- **Name**: User's full name
- **Email**: Email address for updates
- **Cultural Interests**: Traditional Arts, Cultural Heritage, Historical Sites, Traditional Crafts
- **Frequency**: Weekly Updates, Monthly Digest, Seasonal Highlights

### News Page
- **Name**: User's full name
- **Email**: Email address for updates
- **News Interests**: Local News, Events & Festivals, Cultural Updates, Business & Economy
- **Frequency**: Daily Updates, Weekly Digest, Monthly Summary

### Real Estate Page
- **Name**: User's full name
- **Email**: Email address for updates
- **Property Interests**: Buying Property, Renting Property, Investment Properties, Market Trends
- **Budget Range**: Under ¥50M, ¥50M - ¥100M, ¥100M - ¥200M, ¥200M - ¥500M, Over ¥500M
- **Frequency**: Weekly Updates, Monthly Digest, Quarterly Report

## Customization

You can customize:
- **Email Subject**: Change the `subject` hidden field
- **From Name**: Change the `from_name` hidden field
- **Form Fields**: Add/remove fields as needed
- **Styling**: Modify the CSS classes for different looks

## Testing

1. Replace the access key
2. Submit the form
3. Check your email for the submission
4. Verify the success message appears

## Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Dark Mode Support**: Matches your site theme
- ✅ **Loading States**: Shows progress during submission
- ✅ **Error Handling**: Graceful error messages
- ✅ **Success Feedback**: Clear confirmation message
- ✅ **Form Validation**: Required field validation 