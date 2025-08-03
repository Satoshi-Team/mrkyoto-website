# MrKyoto.com - Language Page Review

## 🎯 **Goal:**
Ensure English pages are completely English and Japanese pages are completely Japanese.

## 📋 **Systematic Review:**

### **✅ COMPLETED - Activities Page:**
- ✅ **Language attribute**: Fixed `lang="ja"` → `lang="en"`
- ✅ **Meta content**: Fixed Japanese titles/descriptions → English
- ✅ **Navigation links**: Fixed `/ja/` → `/` paths
- ✅ **Navigation text**: Fixed Japanese text → English text
- ✅ **Footer links**: Fixed `/ja/` → `/` paths
- ✅ **Footer text**: Fixed Japanese text → English text
- ✅ **Copyright**: Fixed Japanese text → English text

### **❌ NEEDS FIXING - Events Page:**
- ❌ **Navigation links**: Still has `/ja/` paths (should be `/`)
- ❌ **Navigation text**: Still has Japanese text (should be English)
- ❌ **Footer links**: Still has `/ja/` paths (should be `/`)
- ❌ **Footer text**: Still has Japanese text (should be English)

### **🔍 TO CHECK - Remaining Pages:**
1. **News page** - Check language attribute, meta content, navigation, footer
2. **Real Estate page** - Check language attribute, meta content, navigation, footer
3. **Live from Kyoto page** - Check language attribute, meta content, navigation, footer
4. **Terms page** - Check language attribute, meta content, navigation, footer
5. **Privacy page** - Check language attribute, meta content, navigation, footer

## 🔧 **What to Fix for Each English Page:**

### **1. Language Attribute:**
```html
<!-- Should be -->
<html lang="en">
```

### **2. Meta Content:**
```html
<!-- Should be English -->
<title>English Title - MrKyoto.com</title>
<meta name="description" content="English description">
<meta name="keywords" content="English, keywords">
<meta name="language" content="English">
<meta property="og:locale" content="en_US">
<link rel="canonical" href="https://mrkyoto.com/english-path/">
```

### **3. Navigation Links:**
```html
<!-- Should point to English pages -->
<a href="/">Home</a>
<a href="/activities/">Activities</a>
<a href="/events/">Events</a>
<a href="/news/">News</a>
<a href="/real-estate/">Real Estate</a>
<a href="/live-from-kyoto/">Live from Kyoto</a>
```

### **4. Navigation Text:**
```html
<!-- Should be English -->
<span>Home</span>
<span>Activities</span>
<span>Events</span>
<span>News</span>
<span>Real Estate</span>
<span>Live from Kyoto</span>
```

### **5. Footer Links:**
```html
<!-- Should point to English pages -->
<a href="/activities/">Activities</a>
<a href="/events/">Events & Festivals</a>
<a href="/news/">News</a>
<a href="/live-from-kyoto/">Live from Kyoto</a>
<a href="/real-estate/">Property Listings</a>
<a href="/privacy/">Privacy Policy</a>
<a href="/terms/">Terms of Service</a>
```

### **6. Footer Text:**
```html
<!-- Should be English -->
<h3>Explore</h3>
<h3>Real Estate</h3>
<h3>Contact</h3>
<p>Your gateway to timeless Kyoto — connect, explore, and live in Japan's cultural capital.</p>
<p>© 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.</p>
```

## 🔧 **What to Fix for Each Japanese Page:**

### **1. Language Attribute:**
```html
<!-- Should be -->
<html lang="ja">
```

### **2. Meta Content:**
```html
<!-- Should be Japanese -->
<title>Japanese Title - MrKyoto.com</title>
<meta name="description" content="Japanese description">
<meta name="keywords" content="Japanese, keywords">
<meta name="language" content="Japanese">
<meta property="og:locale" content="ja_JP">
<link rel="canonical" href="https://mrkyoto.com/ja/japanese-path/">
```

### **3. Navigation Links:**
```html
<!-- Should point to Japanese pages -->
<a href="/ja/">ホーム</a>
<a href="/ja/activities/">アクティビティ</a>
<a href="/ja/events/">イベント</a>
<a href="/ja/news/">ニュース</a>
<a href="/ja/real-estate/">不動産</a>
<a href="/ja/live-from-kyoto/">京都ライブ</a>
```

### **4. Navigation Text:**
```html
<!-- Should be Japanese -->
<span>ホーム</span>
<span>アクティビティ</span>
<span>イベント</span>
<span>ニュース</span>
<span>不動産</span>
<span>京都ライブ</span>
```

### **5. Footer Links:**
```html
<!-- Should point to Japanese pages -->
<a href="/ja/activities/">アクティビティ</a>
<a href="/ja/events/">イベント・祭り</a>
<a href="/ja/news/">ニュース</a>
<a href="/ja/live-from-kyoto/">京都ライブ</a>
<a href="/ja/real-estate/">物件一覧</a>
<a href="/ja/privacy/">プライバシーポリシー</a>
<a href="/ja/terms/">利用規約</a>
```

### **6. Footer Text:**
```html
<!-- Should be Japanese -->
<h3>探索</h3>
<h3>不動産</h3>
<h3>お問い合わせ</h3>
<p>永遠の京都への入り口 — 日本の文化首都の心とつながり、探索し、暮らしましょう。</p>
<p>© 2025 MrKyoto.com. All rights reserved. 永遠の京都への入り口。</p>
```

## 🎯 **Next Steps:**

1. **Fix Events page** - Apply all English fixes
2. **Check News page** - Verify and fix if needed
3. **Check Real Estate page** - Verify and fix if needed
4. **Check Live from Kyoto page** - Verify and fix if needed
5. **Check Terms page** - Verify and fix if needed
6. **Check Privacy page** - Verify and fix if needed
7. **Rebuild and test** - Ensure all pages work correctly

## 📊 **Status:**
- ✅ **Activities page**: COMPLETED
- ❌ **Events page**: NEEDS FIXING
- 🔍 **Other pages**: TO BE CHECKED

**Overall Status**: 🔧 **IN PROGRESS - NEEDS SYSTEMATIC FIXING** 