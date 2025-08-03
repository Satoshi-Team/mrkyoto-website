# MrKyoto.com - Language Switcher Debug Summary

## 🎯 **Current Issue:**
Language switcher works from English to Japanese but **NOT** from Japanese to English.

## 🔍 **What We've Identified:**

### **✅ Working:**
- English to Japanese switching: `/` → `/ja/`, `/activities/` → `/ja/activities/`
- Language detection logic: Correctly detects 'ja' for `/ja/` paths and 'en' for others
- Button structure: All pages have correct `<button id="language-toggle">` with `<span>` inside
- Script inclusion: `theme-language-manager.js` is included in all pages
- Path replacement logic: `/ja/`.replace('/ja/', '/') = `/` ✅

### **❌ Not Working:**
- Japanese to English switching: `/ja/` → `/`, `/ja/activities/` → `/activities/`

## 🔧 **Fixes Applied:**

### **1. Removed Conflicting JavaScript:**
- Removed old dropdown JavaScript from `ja/index.html`, `ja/activities/index.html`, `ja/events/index.html`
- Replaced with: `// Language toggle functionality is now handled by theme-language-manager.js`

### **2. Fixed Language Detection:**
```javascript
getCurrentLanguage() {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ja/')) {
        return 'ja';
    } else {
        return 'en';
    }
}
```

### **3. Updated Navigation Method:**
```javascript
// Changed from window.location.replace() to window.location.href
window.location.href = newPath;
```

### **4. Added Debugging:**
- Enhanced console logging in `changeLanguage()` method
- Added URL and language detection logging in `setupLanguageDropdown()`

## 🧪 **Testing Results:**

### **Path Logic Test:**
```javascript
'/ja/'.replace('/ja/', '/') = '/' ✅
'/ja/activities/'.replace('/ja/', '/') = '/activities/' ✅
```

### **Language Detection Test:**
```javascript
'/ja/'.startsWith('/ja/') = true ✅
'/'.startsWith('/ja/') = false ✅
```

### **Navigation Logic Test:**
```javascript
// From /ja/ to English:
currentPath = '/ja/'
lang = 'en'
currentPath.startsWith('/ja/') = true
newPath = currentPath.replace('/ja/', '/') = '/'
newPath === '/' = true
newPath = '/' ✅
```

## 🤔 **Potential Issues Remaining:**

### **1. Netlify Redirects:**
The `_redirects` file contains:
```
/* /index.html 200
```
This catch-all redirect might be interfering with navigation.

### **2. Timing Issues:**
Script might be running before DOM is fully loaded on Japanese pages.

### **3. Path Resolution:**
There might be an issue with how the browser resolves the paths.

### **4. Server Configuration:**
Japanese pages might not be served correctly or have redirects.

## 🔍 **Next Steps for Debugging:**

### **1. Test with Debug Page:**
- Use `debug-language-switching.html` to test navigation step by step
- Check console logs for any errors
- Verify that Japanese pages are accessible

### **2. Check Netlify Redirects:**
- Test if the catch-all redirect is causing issues
- Consider removing or modifying the redirect rule

### **3. Test Navigation Methods:**
- Try different navigation methods (href vs replace vs assign)
- Check if there are any browser-specific issues

### **4. Verify Japanese Pages:**
- Ensure Japanese pages are actually accessible
- Check if there are any server-side redirects

## 📊 **Current Status:**

### **✅ Working Components:**
- Language detection logic
- Path replacement logic
- Button structure and event listeners
- English to Japanese navigation
- Visual feedback (flags)

### **❌ Broken Components:**
- Japanese to English navigation
- Navigation from `/ja/` paths to root paths

## 🎯 **Root Cause Hypothesis:**

The issue is likely one of these:

1. **Netlify Redirects**: The `/* /index.html 200` redirect is catching the navigation
2. **Path Resolution**: Browser is not resolving the paths correctly
3. **Server Configuration**: Japanese pages are not being served as expected
4. **Timing Issues**: Script is running before DOM is ready

## 🚀 **Next Actions:**

1. **Test with debug page** to isolate the issue
2. **Check Netlify redirects** and modify if needed
3. **Test different navigation methods** (href, replace, assign)
4. **Verify Japanese page accessibility** in browser

**Status**: 🔍 **DEBUGGING IN PROGRESS - NEEDS FURTHER INVESTIGATION** 