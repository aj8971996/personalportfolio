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
    <title>Alexander Barkus - Senior Business Intelligence Developer</title>
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
        .experience-item, .education-item, .project-item, .achievement-item {
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
        
        ul.responsibilities, ul.achievements {
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
            <h2>Senior Business Intelligence Developer | Data Engineer</h2>
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
                <div class="contact-item">
                    <span>💻 github.com/alexanderbarkus</span>
                </div>
                <div class="contact-item">
                    <span>🌐 View Live BI Portfolio</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
            <p>Senior Data Professional with 5+ years architecting end-to-end data solutions and business intelligence systems. Expert in designing scalable ETL pipelines, building self-service analytics platforms, and leading data democratization initiatives. Proven track record of reducing data processing time by 90%+ and enabling data-driven decision-making across enterprise organizations. Specializes in full-stack BI development, cloud data architecture, and translating complex business requirements into technical solutions.</p>
        </div>
        
        <div class="section">
            <h3 class="section-title">KEY ACHIEVEMENTS</h3>
            <ul class="achievements">
                <li>Saved $500K+ annually by automating manual data processes and reporting workflows</li>
                <li>Led data migration project consolidating 20+ legacy systems into unified analytics platform</li>
                <li>Increased data accessibility by 300% through self-service BI implementation serving 500+ stakeholders</li>
                <li>Reduced report generation time from 3+ months to less than 24 hours through automated ETL pipelines</li>
                <li>Mentored 5+ junior analysts in SQL, Python, and data visualization best practices</li>
            </ul>
        </div>
        
        <div class="section">
            <h3 class="section-title">PROFESSIONAL EXPERIENCE</h3>
            
            <div class="experience-item">
                <div class="job-title">Senior Business Intelligence Developer / Data Engineer</div>
                <div><span class="company">Clark County School District (CCSD)</span> – Las Vegas, NV</div>
                <div class="date">November 2023 - Present</div>
                <p class="description">Lead the design and implementation of enterprise-wide business intelligence solutions and data infrastructure supporting district-wide decision-making.</p>
                <ul class="responsibilities">
                    <li>Architected enterprise data warehouse solution integrating 15+ disparate data sources into unified analytics platform</li>
                    <li>Reduced report generation time from 3+ months to <24 hours through automated ETL pipelines processing 2M+ records daily</li>
                    <li>Built self-service BI platform serving 500+ stakeholders, eliminating 80% of ad-hoc data requests</li>
                    <li>Implemented data governance and quality frameworks ensuring 99.9% data accuracy and compliance</li>
                    <li>Designed scalable architecture supporting 10M+ records with sub-second query response times</li>
                    <li>Developed multiple production data pipelines including License Data Pipeline and Professional Learning Data Pipeline</li>
                    <li>Created full-stack Angular web application with interactive dashboards, replacing manual Tableau processes</li>
                    <li>Architected robust Python backend API for secure SQL Server integration with role-based access control</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">ETL/ELT Development</span>
                    <span class="skill-item">Data Warehouse Design</span>
                    <span class="skill-item">Business Intelligence</span>
                    <span class="skill-item">Angular</span>
                    <span class="skill-item">Tableau</span>
                    <span class="skill-item">SQL Server</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">FastAPI</span>
                    <span class="skill-item">Data Governance</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Payroll Data Analyst</div>
                <div><span class="company">Gusto</span> – Remote</div>
                <div class="date">August 2023 - November 2023</div>
                <p class="description">Provided specialized payroll data support, resolving complex data integrity issues and ensuring accurate processing across multiple systems.</p>
                <div class="skill-list">
                    <span class="skill-item">Data Quality</span>
                    <span class="skill-item">Payroll Systems</span>
                    <span class="skill-item">Data Analysis</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Business Intelligence Analyst & Team Lead</div>
                <div><span class="company">Instacart</span> – Remote</div>
                <div class="date">February 2021 - June 2023</div>
                <p class="description">Led analytics initiatives and managed team of support representatives while developing BI solutions for operational excellence.</p>
                <ul class="responsibilities">
                    <li>Developed predictive analytics model identifying customer churn risk, contributing to $2M annual savings</li>
                    <li>Built real-time dashboards using Snowflake, MySQL, and Mode Analytics for KPI monitoring</li>
                    <li>Analyzed performance metrics across Customer Support and Retailer operations, identifying root causes</li>
                    <li>Identified and resolved process inefficiency contributing to 22% of customer dissatisfaction scores</li>
                    <li>Designed automated Google Script tools collecting 150+ stakeholder inputs, improving process efficiency by 40%</li>
                    <li>Collaborated cross-functionally with Product, QA, and Process teams on data-driven improvements</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">Snowflake</span>
                    <span class="skill-item">MySQL</span>
                    <span class="skill-item">Mode Analytics</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">Predictive Analytics</span>
                    <span class="skill-item">KPI Development</span>
                </div>
            </div>
            
            <div class="experience-item">
                <div class="job-title">Technical Support Analyst</div>
                <div><span class="company">Next Level Business Services, Inc.</span> – Remote (Contract)</div>
                <div class="date">July 2020 - February 2021</div>
                <p class="description">Delivered technical solutions and process improvements for enterprise clients within defined timelines and budgets.</p>
                <ul class="responsibilities">
                    <li>Resolved 150+ technical issues weekly across varying priority levels and systems</li>
                    <li>Provided expert troubleshooting for POS systems across 20+ retailer configurations</li>
                    <li>Documented and optimized 30+ business processes for improved efficiency</li>
                </ul>
                <div class="skill-list">
                    <span class="skill-item">Jira</span>
                    <span class="skill-item">Process Optimization</span>
                    <span class="skill-item">Technical Documentation</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h3 class="section-title">KEY PROJECTS</h3>
            
            <div class="project-item">
                <div class="job-title">Enterprise BI Platform & Data Warehouse</div>
                <p class="description">Comprehensive business intelligence solution processing 2M+ records daily with 99.9% uptime. Features include real-time ETL pipelines, interactive dashboards with HighCharts visualization, role-based data access control for 200+ concurrent users, automated report generation and distribution, and scalable microservices architecture.</p>
                <div class="skill-list">
                    <span class="skill-item">Data Warehouse</span>
                    <span class="skill-item">ETL Pipeline</span>
                    <span class="skill-item">Angular</span>
                    <span class="skill-item">Python</span>
                    <span class="skill-item">SQL Server</span>
                    <span class="skill-item">HighCharts</span>
                    <span class="skill-item">CI/CD</span>
                </div>
            </div>
            
            <div class="project-item">
                <div class="job-title">Real-time Data Collection & Analytics System</div>
                <p class="description">Scalable data ingestion platform with automated validation reducing errors by 95%. Built with microservices architecture supporting 10x growth, real-time data processing and analytics, API-first design for seamless integrations, and comprehensive audit logging and monitoring.</p>
                <div class="skill-list">
                    <span class="skill-item">Real-time Analytics</span>
                    <span class="skill-item">Microservices</span>
                    <span class="skill-item">FastAPI</span>
                    <span class="skill-item">Data Validation</span>
                    <span class="skill-item">RBAC</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="skills-grid">
                <div>
                    <h3 class="section-title">TECHNICAL SKILLS</h3>
                    
                    <div class="skill-category">
                        <h4>Data Engineering & BI Tools</h4>
                        <div class="skill-list">
                            <span class="skill-item">ETL/ELT Pipeline Development</span>
                            <span class="skill-item">Data Warehouse Design</span>
                            <span class="skill-item">Data Modeling</span>
                            <span class="skill-item">Tableau (Desktop & Server)</span>
                            <span class="skill-item">SQL Server/T-SQL</span>
                            <span class="skill-item">Python (Pandas, NumPy)</span>
                            <span class="skill-item">Business Intelligence</span>
                            <span class="skill-item">Dashboard Development</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Cloud & Modern Data Stack</h4>
                        <div class="skill-list">
                            <span class="skill-item">Snowflake</span>
                            <span class="skill-item">Azure Data Services</span>
                            <span class="skill-item">Data Lake Architecture</span>
                            <span class="skill-item">API Development (FastAPI)</span>
                            <span class="skill-item">Apache Airflow (Learning)</span>
                            <span class="skill-item">dbt (Learning)</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Programming & Development</h4>
                        <div class="skill-list">
                            <span class="skill-item">Python</span>
                            <span class="skill-item">SQL/T-SQL</span>
                            <span class="skill-item">TypeScript</span>
                            <span class="skill-item">JavaScript</span>
                            <span class="skill-item">Angular</span>
                            <span class="skill-item">RESTful APIs</span>
                            <span class="skill-item">C#</span>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Key Competencies</h4>
                        <div class="skill-list">
                            <span class="skill-item">Data Governance</span>
                            <span class="skill-item">Stakeholder Management</span>
                            <span class="skill-item">Agile/Scrum</span>
                            <span class="skill-item">Process Automation</span>
                            <span class="skill-item">Technical Leadership</span>
                            <span class="skill-item">Lean Six Sigma</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 class="section-title">EDUCATION & CERTIFICATIONS</h3>
                    
                    <div class="education-item">
                        <div class="job-title">Master of Information Systems Management (In Progress)</div>
                        <div>Specialization: Data Administration & Business Intelligence</div>
                        <div class="date">Expected 2026</div>
                    </div>
                    
                    <div class="education-item">
                        <div class="job-title">Bachelor of Science - Computer Science</div>
                        <div>Focus: Software Development & Data Systems</div>
                        <div class="date">2024</div>
                    </div>
                    
                    <div class="education-item">
                        <div class="job-title">Associate of Science - Information Technology</div>
                        <div>Focus: Systems Architecture & Networking</div>
                        <div class="date">2023</div>
                    </div>
                    
                    <div class="education-item">
                        <div class="job-title">Professional Certifications</div>
                        <ul class="responsibilities">
                            <li>Six Sigma Black Belt Certification - AIGPE™</li>
                            <li>Lean Six Sigma Green Belt - AIGPE™</li>
                            <li>Six Sigma Yellow Belt - AIGPE™</li>
                            <li>AWS Cloud Practitioner (Planned 2025)</li>
                            <li>Microsoft Azure Data Engineer (Planned 2025)</li>
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
