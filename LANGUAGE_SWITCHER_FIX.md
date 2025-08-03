# MrKyoto.com - Language Switcher Fix

## 🎯 **Problem Identified:**

The language switcher was only working from English to Japanese but not from Japanese to English.

## 🔍 **Root Cause Analysis:**

1. **Language Detection Issue**: The `getCurrentLanguage()` method was returning `this.currentLanguage` instead of detecting from URL path
2. **Conflicting JavaScript**: Japanese pages had their own JavaScript handling the language dropdown, conflicting with the new toggle logic
3. **Inconsistent Language Detection**: The system wasn't properly detecting the current language from the URL path

## ✅ **Fixes Applied:**

### **1. Fixed Language Detection Logic:**

**Before:**
```javascript
getCurrentLanguage() {
    return this.currentLanguage; // Was returning stored language
}
```

**After:**
```javascript
getCurrentLanguage() {
    // Detect current language from URL path
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ja/')) {
        return 'ja';
    } else {
        return 'en';
    }
}
```

### **2. Updated Constructor:**

**Before:**
```javascript
this.currentLanguage = this.getStoredLanguage() || 'en';
```

**After:**
```javascript
this.currentLanguage = this.getCurrentLanguage(); // Initialize based on URL path
```

### **3. Updated UI Update Logic:**

**Before:**
```javascript
const currentLang = this.currentLanguage;
```

**After:**
```javascript
const currentLang = this.getCurrentLanguage();
```

### **4. Removed Conflicting JavaScript:**

**Removed from Japanese pages:**
```javascript
// Language dropdown functionality
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');

if (languageToggle && languageDropdown) {
    // Old dropdown logic that was conflicting
}
```

**Replaced with:**
```javascript
// Language toggle functionality is now handled by theme-language-manager.js
```

## 🧪 **Testing Results:**

### **Language Detection:**
- ✅ **English Pages**: Correctly detects 'en' from URL path
- ✅ **Japanese Pages**: Correctly detects 'ja' from URL path
- ✅ **Toggle Logic**: Properly switches between languages

### **Navigation Paths:**
- ✅ `/` ↔ `/ja/` (Homepage)
- ✅ `/activities/` ↔ `/ja/activities/` (Activities)
- ✅ `/events/` ↔ `/ja/events/` (Events)
- ✅ `/live-from-kyoto/` ↔ `/ja/live-from-kyoto/` (Live from Kyoto)
- ✅ `/real-estate/` ↔ `/ja/real-estate/` (Real Estate)
- ✅ `/news/` ↔ `/ja/news/` (News)

### **Visual Feedback:**
- ✅ **English Pages**: Show 🇬🇧 flag
- ✅ **Japanese Pages**: Show 🇯🇵 flag
- ✅ **Toggle Action**: Swaps flags correctly

## 🎯 **Language Switching Now Works Perfectly:**

### **From English to Japanese:**
- ✅ `/` → `/ja/`
- ✅ `/activities/` → `/ja/activities/`
- ✅ `/events/` → `/ja/events/`
- ✅ `/live-from-kyoto/` → `/ja/live-from-kyoto/`
- ✅ `/real-estate/` → `/ja/real-estate/`
- ✅ `/news/` → `/ja/news/`

### **From Japanese to English:**
- ✅ `/ja/` → `/`
- ✅ `/ja/activities/` → `/activities/`
- ✅ `/ja/events/` → `/events/`
- ✅ `/ja/live-from-kyoto/` → `/live-from-kyoto/`
- ✅ `/ja/real-estate/` → `/real-estate/`
- ✅ `/ja/news/` → `/news/`

## 🔧 **Technical Details:**

### **Language Detection Logic:**
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

### **Toggle Logic:**
```javascript
const currentLang = this.getCurrentLanguage();
const newLang = currentLang === 'en' ? 'ja' : 'en';
this.changeLanguage(newLang);
```

### **Navigation Logic:**
```javascript
if (lang === 'ja') {
    // Switching to Japanese
    if (currentPath === '/') {
        newPath = '/ja/';
    } else {
        newPath = '/ja' + currentPath;
    }
} else {
    // Switching to English
    if (currentPath.startsWith('/ja/')) {
        newPath = currentPath.replace('/ja/', '/');
        if (newPath === '/') {
            newPath = '/';
        }
    } else {
        newPath = '/';
    }
}
```

## 🎉 **Result:**

The language switcher now works perfectly in both directions:
- ✅ **English to Japanese**: One-click toggle works
- ✅ **Japanese to English**: One-click toggle works
- ✅ **Visual Feedback**: Correct flags displayed
- ✅ **Proper Navigation**: All paths work correctly
- ✅ **No Conflicts**: Removed conflicting JavaScript

**Status**: ✅ **LANGUAGE SWITCHER FULLY FUNCTIONAL** 