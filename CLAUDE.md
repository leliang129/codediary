# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Docusaurus website project. Key development commands:

- `npm start` - Start development server with hot reload
- `npm run build` - Build production static site
- `npm run serve` - Serve built site locally
- `npm run clear` - Clear Docusaurus build cache
- `npm run swizzle` - Customize theme components
- `npm run deploy` - Deploy to GitHub Pages

## Architecture Overview

This is a standard Docusaurus v3 website with the following structure:

- **Framework**: Docusaurus 3.7.0 with React 19
- **Build System**: Webpack-based build process
- **Content**: Markdown/MDX files in `docs/` and `blog/` directories
- **Configuration**: `docusaurus.config.js` for site configuration
- **Sidebars**: `sidebars.js` for documentation navigation
- **Custom Styles**: `src/css/custom.css` for custom styling
- **Components**: React components in `src/components/`

## Key Files

- `docusaurus.config.js` - Main site configuration
- `sidebars.js` - Documentation sidebar structure  
- `package.json` - Dependencies and scripts
- `src/pages/index.js` - Homepage component
- `src/components/HomepageFeatures/` - Homepage feature components
- `docs/` - Documentation markdown files
- `blog/` - Blog post markdown files

## Content Structure

The website is organized around three main technology areas:

1. **Linux基础** (Linux Basics) - System administration, command line operations, shell scripting
2. **云原生** (Cloud Native) - Containerization, orchestration, monitoring, DevOps (Kubernetes, Prometheus)
3. **脚本编程** (Scripting Languages) - Automation, tool development, task processing (Python, Shell)

Documentation files are organized in the `docs/` directory with a hierarchical structure matching the sidebar navigation.

## Development Notes

- Uses Docusaurus preset-classic with docs and blog features
- No testing framework configured (typical for Docusaurus sites)
- No linting configured beyond Docusaurus defaults
- Content is primarily markdown/MDX based
- Custom React components can be added in `src/components/`
- Homepage features are defined in `src/pages/index.js` as technology cards