// resume-download.service.ts
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ResumeDownloadService {
  
  constructor() { }
  
  /**
   * Generates and downloads a PDF version of the resume
   * @param elementId The ID of the HTML element to be converted to PDF
   */
  async downloadResume(elementId: string, downloadType: 'pdf' | 'ats' = 'pdf'): Promise<void> {
    try {
      if (downloadType === 'ats') {
        await this.downloadATSFriendlyResume();
        return;
      }
      
      // Get the resume element
      const resumeElement = document.getElementById(elementId);
      
      if (!resumeElement) {
        console.error('Resume element not found');
        return;
      }
      
      // Create a clone of the element to avoid modifying the original
      const clonedElement = resumeElement.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '794px'; // A4 width in pixels at 96 DPI
      
      // Add the cloned element to the document temporarily (off-screen)
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);
      
      // Capture the element as canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#1f2937' // Match the background color of your resume
      });
      
      // Remove the cloned element
      document.body.removeChild(clonedElement);
      
      // Calculate the PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      let pageData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Add image to PDF
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add new pages if the content doesn't fit on one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      pdf.save('Alexander_Barkus_Resume.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  /**
   * Downloads an ATS-friendly HTML resume
   */
  private async downloadATSFriendlyResume(): Promise<void> {
    const resumeHTML = this.getATSFriendlyResumeHTML();
    
    // Create a Blob with the HTML content
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alexander_Barkus_ATS_Resume.html';
    
    // Append the anchor to the body
    document.body.appendChild(a);
    
    // Trigger a click on the anchor
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  /**
   * Returns the HTML for the ATS-friendly resume
   */
  private getATSFriendlyResumeHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alexander Barkus - Professional Resume</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            font-size: 14px;
            line-height: 1.5;
            color: #333;
            background-color: #fff;
            padding: 2rem;
            max-width: 850px;
            margin: 0 auto;
        }
        
        /* Header Styles */
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #2c5282;
            padding-bottom: 15px;
        }
        
        .header h1 {
            font-size: 28px;
            color: #2c5282;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 18px;
            color: #4a5568;
            font-weight: normal;
        }
        
        .contact-info {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
        }
        
        /* Section Styles */
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 18px;
            color: #2c5282;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
        }
        
        /* Experience Styles */
        .experience-item, .education-item, .project-item {
            margin-bottom: 15px;
        }
        
        .job-title {
            font-size: 16px;
            font-weight: bold;
            color: #2d3748;
        }
        
        .company {
            font-weight: bold;
        }
        
        .date {
            color: #4a5568;
            font-style: italic;
        }
        
        .description {
            margin-top: 5px;
        }
        
        ul.responsibilities {
            margin-left: 20px;
            margin-top: 5px;
        }
        
        /* Skills Styles */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .skill-category {
            margin-bottom: 10px;
        }
        
        .skill-category h4 {
            font-size: 14px;
            color: #2d3748;
            margin-bottom: 5px;
        }
        
        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        
        .skill-item {
            background-color: #e6f0ff;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
        }
        
        /* Print Styles */
        @media print {
            body {
                padding: 0;
                font-size: 12px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .header h2 {
                font-size: 16px;
            }
            
            .section-title {
                font-size: 16px;
            }
            
            .job-title {
                font-size: 14px;
            }
            
            .no-print {
                display: none;
            }
        }
        
        /* Download Button */
        .download-container {
            text-align: center;
            margin: 20px 0;
        }
        
        .download-btn {
            background-color: #2c5282;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .download-btn:hover {
            background-color: #1a365d;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="header">
            <h1>ALEXANDER BARKUS</h1>
            <h2>Data Specialist & Full Stack Developer</h2>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧 alexander.barkus96@gmail.com</span>
                </div>
                <div class="contact-item">
                    <span>📱 (702) 510-6168</span>
                </div>
                <div class="contact-item">
                    <span>🔗 linkedin.com/in/alexander-barkus</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
            <p>Highly skilled Data Specialist and Full Stack Developer with over five years of experience supporting technical teams, building reporting dashboards, automating backend processes, and developing efficient data processes/pipelines. Adept at developing end-to-end applications integrating GUIs with cloud-based databases and creating impactful visualizations that aid in strategic decision-making. Expertise in Microsoft SQL Server, Tableau, Google Workspace, Angular, Python, and more.</p>
        </div>
        
        <div class="section">
            <h3 class="section-title">PROFESSIONAL EXPERIENCE</h3>
            
            <div class="experience-item">
                <div class="job-title">Data Visualization Analyst II - Design Focus</div>
                <div><span class="company">Clark County School District (CCSD)</span> – Las Vegas, NV</div>
                <div class="date">November 2023 - Present</div>
                <p class="description">Coordinates, designs, develops, implements, and refines interactive data visualizations and full-stack applications using modern web technologies and software packages to support data-based decision-making.</p>
                <ul class="responsibilities">
                    <li>Developed and maintained multiple data pipelines, including the License Data Pipeline and Professional Learning Data Pipeline, reducing data request wait times from months to days.</li>
                    <li>Unified and streamlined fragmented data from various Google Sheets and tables for comprehensive querying and visualization.</li>
                    <li>Prototyped visualizations using Tableau, then implemented them as a full-featured Angular web application with PDF resume generation.</li>
                    <li>Architected and built a robust Python backend for direct SQL Server integration, ensuring secure and efficient data access.</li>
                    <li>Integrated HighCharts for advanced interactive data visualization components.</li>
                    <li>Fulfilled complex data requests for stakeholders utilizing ETL processes I developed and validated.</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">Angular</span>
                    <span class="skill-item">Tableau</span>
                    <span class="skill-item">SQL</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">HighCharts</span>
                    <span class="skill-item">Data Pipeline Development</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Payroll Care</div>
                <div><span class="company">Gusto</span> – Remote</div>
                <div class="date">August 2023 - November 2023</div>
                <p class="description">Provided specialized payroll support, resolving complex customer issues and ensuring timely and accurate processing of payroll data across various systems.</p>
                <div class="skill-list">
                    <span class="skill-item">Customer Support</span>
                    <span class="skill-item">Payroll Systems</span>
                    <span class="skill-item">Data Analysis</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Customer Experience Team Lead</div>
                <div><span class="company">Instacart</span> – Remote</div>
                <div class="date">February 2021 - June 2023</div>
                <p class="description">Managed a team of customer support representatives, providing guidance and training to improve performance. Designed dashboards for ad-hoc analysis, delivering actionable insights.</p>
                <ul class="responsibilities">
                    <li>Collaborated cross-functionally with Product, Learning & Development, QA, and Process Owners.</li>
                    <li>Developed dashboards and reports using Google Suite, MySQL, Snowflake, Mode, and Python.</li>
                    <li>Analyzed KPI metrics for Customer Support and Retailer performance, identifying root causes.</li>
                    <li>Identified and addressed a process contributing to 22% of DSAT KPI scores.</li>
                    <li>Designed a Google Script tool to collect 150+ stakeholder recommendations, improving process efficiency.</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">Jira</span>
                    <span class="skill-item">Datadog</span>
                    <span class="skill-item">SQL</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">Google Script</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Specialized Customer Support</div>
                <div><span class="company">Next Level Business Services, Inc.</span> – Remote (Contract)</div>
                <div class="date">July 2020 - February 2021</div>
                <p class="description">Partnered with clients to define business needs, manage projects within timelines and budgets, and deliver high-quality results.</p>
                <ul class="responsibilities">
                    <li>Resolved 150+ ticket issues weekly, efficiently handling varying priority levels.</li>
                    <li>Provided expert troubleshooting for POS issues across 20+ retailer types.</li>
                    <li>Offered feedback and assisted with developing 30+ business processes.</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">Jira</span>
                    <span class="skill-item">Google Sheets</span>
                    <span class="skill-item">Process Improvement</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Customer Service Representative</div>
                <div><span class="company">Sutherland</span></div>
                <div class="date">June 2019 - May 2020</div>
            </div>
        </div>
        
        <div class="section">
            <h3 class="section-title">PROJECTS</h3>
            
            <div class="project-item">
                <div class="job-title">Leadership Tracking System</div>
                <p class="description">A comprehensive web application built with Angular and Python that integrates multiple data pipelines and visualization tools. Features include dynamic dashboards with HighCharts integration, role-based access control, custom report generation, and a responsive UI.</p>
                <div class="skill-list">
                    <span class="skill-item">Angular</span>
                    <span class="skill-item">TypeScript</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">FastAPI</span>
                    <span class="skill-item">SQL Server</span>
                    <span class="skill-item">HighCharts</span>
                </div>
            </div>
            
            <div class="project-item">
                <div class="job-title">Form Data Manager</div>
                <p class="description">An Angular web application supporting users of different roles interacting with dynamic forms. The API is designed to scale efficiently, supporting role-based access control (RBAC) and integrating seamlessly with the front end for a responsive user experience.</p>
                <div class="skill-list">
                    <span class="skill-item">Angular</span>
                    <span class="skill-item">TypeScript</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">FastAPI</span>
                    <span class="skill-item">SQL</span>
                    <span class="skill-item">RBAC</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="skills-grid">
                <div>
                    <h3 class="section-title">TECHNICAL SKILLS</h3>
                    
                    <div class="skill-category">
                        <h4>Programming Languages</h4>
                        <div class="skill-list">
                            <span class="skill-item">Python</span>
                            <span class="skill-item">JavaScript</span>
                            <span class="skill-item">TypeScript</span>
                            <span class="skill-item">SQL</span>
                            <span class="skill-item">T-SQL</span>
                            <span class="skill-item">C#</span>
                            <span class="skill-item">GScript</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Frameworks & Technologies</h4>
                        <div class="skill-list">
                            <span class="skill-item">Angular</span>
                            <span class="skill-item">Tableau</span>
                            <span class="skill-item">Tableau Prep Flow</span>
                            <span class="skill-item">FastAPI</span>
                            <span class="skill-item">RESTful APIs</span>
                            <span class="skill-item">HighCharts</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Tools & Platforms</h4>
                        <div class="skill-list">
                            <span class="skill-item">Google Workspace</span>
                            <span class="skill-item">Microsoft 365</span>
                            <span class="skill-item">Mode</span>
                            <span class="skill-item">Jira</span>
                            <span class="skill-item">Datadog</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Key Competencies</h4>
                        <div class="skill-list">
                            <span class="skill-item">Data Pipeline Development</span>
                            <span class="skill-item">Data Visualization</span>
                            <span class="skill-item">Process Automation</span>
                            <span class="skill-item">Technical Leadership</span>
                            <span class="skill-item">Lean Six Sigma</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 class="section-title">EDUCATION & CERTIFICATIONS</h3>
                    
                    <div class="education-item">
                        <div class="job-title">Bachelor of Applied Science (B.S.)</div>
                        <div>Software Development</div>
                        <div>DeVry University - North Las Vegas, NV</div>
                        <div class="date">2021 - 2024</div>
                    </div>
                    
                    <div class="education-item">
                        <div class="job-title">Associate of Science (A.S.)</div>
                        <div>IT & Networking, Information Systems</div>
                        <div>DeVry University - North Las Vegas, NV</div>
                        <div class="date">2021 - 2023</div>
                    </div>
                    
                    <div class="education-item">
                        <div class="job-title">Certifications</div>
                        <ul class="responsibilities">
                            <li>Six Sigma Black Belt Certification - AIGPE™</li>
                            <li>Lean Six Sigma Green Belt - AIGPE™</li>
                            <li>Six Sigma Yellow Belt - AIGPE™</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="download-container no-print">
        <button class="download-btn" onclick="window.print()">Download as PDF</button>
    </div>
    
    <script>
        // Add any JavaScript functionality here if needed
        document.querySelector('.download-btn').addEventListener('click', function() {
            window.print();
        });
    </script>
</body>
</html>`;
  }
}