# Angular Resume Application

A professional resume web application built with Angular, featuring download options for ATS-optimized resume formats.

## Overview

This Angular application provides an interactive online resume with a modern, responsive design. It offers two download options:

1. **ATS-Friendly Resume** - A clean, optimized PDF designed to pass through Applicant Tracking Systems

## Features

- Interactive web-based resume with responsive design
- Professional styling with Tailwind CSS
- Experience, skills, education, and project sections
- PDF generation using html2canvas and jsPDF
- ATS-optimized resume format for job applications
- Loading indicator for user feedback during PDF generation

## Project Structure

Key components include:

- `resume.component.ts` - Main resume component with download functionality
- `resume.component.html` - Resume template with content sections
- `resume-download.service.ts` - Service for PDF generation and download options

## Technologies Used

- Angular
- TypeScript
- Tailwind CSS
- html2canvas
- jsPDF

## Getting Started

### Prerequisites

- Node.js and npm installed
- Angular CLI installed

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd angular-resume
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser

## How It Works

### Resume Display

The application uses Angular components to render a professional resume with sections for:
- Professional summary
- Work experience
- Technical skills
- Education and certifications
- Project showcases
- Contact information

### PDF Generation

The application offers two PDF download options:

#### ATS-Friendly Resume PDF
- Generates a simplified resume with optimal formatting for ATS systems
- Uses clean typography, clear section headers, and keyword-friendly structure
- Ensures resume content will pass through automated filters during job applications

## Customization

### Content Customization

To update your resume content:
1. Edit the `resume.component.html` file to update your information
2. Update the ATS template HTML in the `getATSFriendlyResumeHTML()` method in `resume-download.service.ts`

### Styling Customization

- Style changes for the web view can be made in the Tailwind classes in `resume.component.html`
- ATS resume styling can be modified in the inline CSS within the `getATSFriendlyResumeHTML()` method

## Browser Compatibility

The application has been tested and works in:
- Chrome
- Firefox
- Edge
- Safari

## Author

Alexander Barkus

## Acknowledgments

- Tailwind CSS for the UI framework
- html2canvas and jsPDF for PDF generation capabilities
