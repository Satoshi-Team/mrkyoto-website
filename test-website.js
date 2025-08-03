#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const http = require('http')

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  requiredFiles: [
    'index.html',
    'real-estate.html',
    'events.html',
    'privacy.html',
    'terms.html',
    'js/main.js',
    'css/tailwind.css',
    'favicon.svg',
    'sw.js',
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'DEPLOYMENT.md'
  ],
  requiredPages: [
    '/',
    '/index.html',
    '/real-estate.html',
    '/events.html',
    '/privacy.html',
    '/terms.html'
  ]
}

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logTest(testName, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL'
  const color = passed ? 'green' : 'red'
  log(`${status} ${testName}${details ? ` - ${details}` : ''}`, color)
}

// Test 1: Check if all required files exist
function testFileExistence() {
  log('\n📁 Testing File Existence...', 'blue')
  
  let allFilesExist = true
  TEST_CONFIG.requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file)
    const exists = fs.existsSync(filePath)
    logTest(`File: ${file}`, exists)
    if (!exists) allFilesExist = false
  })
  
  return allFilesExist
}

// Test 2: Check if server is running
function testServerRunning() {
  return new Promise((resolve) => {
    log('\n🌐 Testing Server Status...', 'blue')
    
    const req = http.get(TEST_CONFIG.baseUrl, (res) => {
      const isRunning = res.statusCode === 200
      logTest('Server Running', isRunning, `Status: ${res.statusCode}`)
      resolve(isRunning)
    })
    
    req.on('error', () => {
      logTest('Server Running', false, 'Connection failed')
      resolve(false)
    })
    
    req.setTimeout(5000, () => {
      logTest('Server Running', false, 'Timeout')
      resolve(false)
    })
  })
}

// Test 3: Check if all pages are accessible
function testPageAccessibility() {
  return new Promise((resolve) => {
    log('\n📄 Testing Page Accessibility...', 'blue')
    
    let allPagesAccessible = true
    let completedTests = 0
    
    TEST_CONFIG.requiredPages.forEach(page => {
      const url = `${TEST_CONFIG.baseUrl}${page}`
      
      const req = http.get(url, (res) => {
        const isAccessible = res.statusCode === 200
        logTest(`Page: ${page}`, isAccessible, `Status: ${res.statusCode}`)
        if (!isAccessible) allPagesAccessible = false
        
        completedTests++
        if (completedTests === TEST_CONFIG.requiredPages.length) {
          resolve(allPagesAccessible)
        }
      })
      
      req.on('error', () => {
        logTest(`Page: ${page}`, false, 'Connection failed')
        allPagesAccessible = false
        completedTests++
        if (completedTests === TEST_CONFIG.requiredPages.length) {
          resolve(allPagesAccessible)
        }
      })
      
      req.setTimeout(5000, () => {
        logTest(`Page: ${page}`, false, 'Timeout')
        allPagesAccessible = false
        completedTests++
        if (completedTests === TEST_CONFIG.requiredPages.length) {
          resolve(allPagesAccessible)
        }
      })
    })
  })
}

// Test 4: Check HTML structure
function testHTMLStructure() {
  log('\n🏗️ Testing HTML Structure...', 'blue')
  
  const indexPath = path.join(__dirname, 'index.html')
  const indexContent = fs.readFileSync(indexPath, 'utf8')
  
  const requiredElements = [
    '<!DOCTYPE html>',
    '<html',
    '<head>',
    '<title>',
    '<meta charset="UTF-8">',
    '<meta name="viewport"',
    '<body',
    '<nav',
    '<main',
    '<footer',
    'MrKyoto.com',
    'Your Gateway to Timeless Kyoto'
  ]
  
  let allElementsPresent = true
  requiredElements.forEach(element => {
    const isPresent = indexContent.includes(element)
    logTest(`HTML Element: ${element}`, isPresent)
    if (!isPresent) allElementsPresent = false
  })
  
  return allElementsPresent
}

// Test 5: Check JavaScript functionality
function testJavaScriptFunctionality() {
  log('\n⚡ Testing JavaScript Functionality...', 'blue')
  
  const jsPath = path.join(__dirname, 'js/main.js')
  const jsContent = fs.readFileSync(jsPath, 'utf8')
  
  const requiredFunctions = [
    'class ThemeManager',
    'class MobileMenuManager',
    'class SmoothScroller',
    'class FormManager',
    'class AnimationManager',
    'class FloatingCTAManager',
    'class PerformanceOptimizer',
    'class AnalyticsManager'
  ]
  
  let allFunctionsPresent = true
  requiredFunctions.forEach(func => {
    const isPresent = jsContent.includes(func)
    logTest(`JS Function: ${func}`, isPresent)
    if (!isPresent) allFunctionsPresent = false
  })
  
  return allFunctionsPresent
}

// Test 6: Check CSS and styling
function testCSSAndStyling() {
  log('\n🎨 Testing CSS and Styling...', 'blue')
  
  const cssPath = path.join(__dirname, 'css/tailwind.css')
  const cssContent = fs.readFileSync(cssPath, 'utf8')
  
  const requiredStyles = [
    'tailwindcss',
    'Noto Serif JP',
    'Inter',
    '--color-primary',
    '--color-secondary',
    'animate-fade-in-up',
    'animate-float'
  ]
  
  let allStylesPresent = true
  requiredStyles.forEach(style => {
    const isPresent = cssContent.includes(style)
    logTest(`CSS Style: ${style}`, isPresent)
    if (!isPresent) allStylesPresent = false
  })
  
  return allStylesPresent
}

// Main test runner
async function runAllTests() {
  log('🚀 Starting MrKyoto.com Website Tests...', 'bold')
  log('=' * 50, 'blue')
  
  const results = {
    fileExistence: testFileExistence(),
    htmlStructure: testHTMLStructure(),
    javascriptFunctionality: testJavaScriptFunctionality(),
    cssAndStyling: testCSSAndStyling(),
    serverRunning: await testServerRunning(),
    pageAccessibility: await testPageAccessibility()
  }
  
  // Summary
  log('\n📊 Test Summary', 'bold')
  log('=' * 30, 'blue')
  
  const totalTests = Object.keys(results).length
  const passedTests = Object.values(results).filter(Boolean).length
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL'
    const color = passed ? 'green' : 'red'
    log(`${status} ${test}`, color)
  })
  
  log(`\n🎯 Overall Result: ${passedTests}/${totalTests} tests passed`, 
      passedTests === totalTests ? 'green' : 'red')
  
  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! MrKyoto.com is ready for deployment.', 'green')
    log('🌐 Website is running at: http://localhost:3000', 'blue')
  } else {
    log('\n⚠️ Some tests failed. Please review the issues above.', 'yellow')
  }
  
  return passedTests === totalTests
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1)
  }).catch(error => {
    log(`\n💥 Test runner error: ${error.message}`, 'red')
    process.exit(1)
  })
}

module.exports = { runAllTests, TEST_CONFIG } 