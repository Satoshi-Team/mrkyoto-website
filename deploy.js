#!/usr/bin/env node

const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

class MrKyotoDeployer {
  constructor() {
    this.deploymentStats = {
      buildTime: new Date().toISOString(),
      version: '2.0.0',
      deployment: 'English-only',
      steps: [],
      errors: [],
      warnings: []
    };
  }

  async deploy() {
    console.log('🚀 Starting MrKyoto.com deployment to GitHub and Netlify...\n');
    
    try {
      // Step 1: Build the project
      await this.buildProject();
      
      // Step 2: Verify the build
      await this.verifyBuild();
      
      // Step 3: Prepare for Git
      await this.prepareForGit();
      
      // Step 4: Commit and push to GitHub
      await this.commitAndPush();
      
      // Step 5: Generate deployment report
      await this.generateDeploymentReport();
      
      console.log('\n✅ Deployment completed successfully!');
      console.log('🌐 Your site will be deployed to Netlify automatically');
      console.log('📊 Check the deployment report for details');
      
    } catch (error) {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    }
  }

  async buildProject() {
    console.log('🔨 Building project...');
    
    try {
      execSync('npm run build', { stdio: 'inherit' });
      this.deploymentStats.steps.push('Build completed successfully');
      console.log('✅ Build completed');
    } catch (error) {
      this.deploymentStats.errors.push(`Build failed: ${error.message}`);
      throw new Error('Build failed');
    }
  }

  async verifyBuild() {
    console.log('🔍 Verifying build...');
    
    const requiredFiles = [
      'dist/index.html',
      'dist/activities/index.html',
      'dist/events/index.html',
      'dist/news/index.html',
      'dist/real-estate/index.html',
      'dist/live-from-kyoto/index.html',
      'dist/privacy/index.html',
      'dist/terms/index.html',
      'dist/css/styles.css',
      'dist/js/main.js',
      'dist/_redirects',
      'dist/_headers'
    ];
    
    const missingFiles = [];
    
    for (const file of requiredFiles) {
      if (!await fs.pathExists(file)) {
        missingFiles.push(file);
      }
    }
    
    if (missingFiles.length > 0) {
      this.deploymentStats.errors.push(`Missing required files: ${missingFiles.join(', ')}`);
      throw new Error(`Build verification failed: Missing ${missingFiles.length} required files`);
    }
    
    // Check build report
    const buildReportPath = 'dist/build-report.json';
    if (await fs.pathExists(buildReportPath)) {
      const buildReport = await fs.readJson(buildReportPath);
      if (buildReport.widgets && buildReport.widgets.length > 0) {
        console.log(`✅ ${buildReport.widgets.length} widgets verified`);
      }
    }
    
    this.deploymentStats.steps.push('Build verification completed');
    console.log('✅ Build verification completed');
  }

  async prepareForGit() {
    console.log('📝 Preparing for Git...');
    
    try {
      // Check if we're in a git repository
      execSync('git status', { stdio: 'pipe' });
      
      // Add all files
      execSync('git add .', { stdio: 'inherit' });
      
      // Check if there are changes to commit
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      
      if (status.trim() === '') {
        console.log('ℹ️  No changes to commit');
        this.deploymentStats.warnings.push('No changes to commit');
        return;
      }
      
      this.deploymentStats.steps.push('Git preparation completed');
      console.log('✅ Git preparation completed');
      
    } catch (error) {
      this.deploymentStats.errors.push(`Git preparation failed: ${error.message}`);
      throw new Error('Git preparation failed');
    }
  }

  async commitAndPush() {
    console.log('📤 Committing and pushing to GitHub...');
    
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const commitMessage = `Deploy English-only build v2.0.0 - ${timestamp}`;
      
      // Commit changes
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Push to GitHub
      execSync('git push origin main', { stdio: 'inherit' });
      
      this.deploymentStats.steps.push('GitHub push completed');
      console.log('✅ Changes pushed to GitHub');
      
    } catch (error) {
      this.deploymentStats.errors.push(`GitHub push failed: ${error.message}`);
      throw new Error('GitHub push failed');
    }
  }

  async generateDeploymentReport() {
    console.log('📊 Generating deployment report...');
    
    const report = {
      ...this.deploymentStats,
      deploymentTime: new Date().toISOString(),
      nextSteps: [
        'Netlify will automatically deploy from GitHub',
        'Monitor the deployment at your Netlify dashboard',
        'Test all widgets and functionality after deployment',
        'Update DNS if needed'
      ]
    };
    
    await fs.writeJson('deployment-report.json', report, { spaces: 2 });
    console.log('✅ Deployment report generated');
  }
}

// Run the deployment
if (require.main === module) {
  const deployer = new MrKyotoDeployer();
  deployer.deploy().catch(console.error);
}

module.exports = MrKyotoDeployer; 