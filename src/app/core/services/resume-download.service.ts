// resume-download.service.ts
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ResumeDownloadService {

  constructor() { }

  async downloadResume(elementId: string, downloadType: 'pdf' | 'ats' = 'pdf'): Promise<void> {
    try {
      if (downloadType === 'ats') {
        await this.downloadATSFriendlyResume();
        return;
      }

      const resumeElement = document.getElementById(elementId);

      if (!resumeElement) {
        console.error('Resume element not found');
        return;
      }

      const clonedElement = resumeElement.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '794px';
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#1f2937'
      });

      document.body.removeChild(clonedElement);

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let pageData = canvas.toDataURL('image/jpeg', 1.0);

      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Alexander_Barkus_Resume.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  private async downloadATSFriendlyResume(): Promise<void> {
    const resumeHTML = this.getATSFriendlyResumeHTML();
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alexander_Barkus_ATS_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private getATSFriendlyResumeHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alexander Barkus - Forward Deployed Engineer</title>
    <style>
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

        @media print {
            body { padding: 0; font-size: 12px; }
            .header h1 { font-size: 24px; }
            .header h2 { font-size: 16px; }
            .section-title { font-size: 16px; }
            .job-title { font-size: 14px; }
            .no-print { display: none; }
        }

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
            <h2>Forward Deployed Engineer</h2>
            <div class="contact-info">
                <div class="contact-item"><span>alexander.barkus96@gmail.com</span></div>
                <div class="contact-item"><span>(702) 510-6168</span></div>
                <div class="contact-item"><span>linkedin.com/in/alexander-barkus</span></div>
                <div class="contact-item"><span>Las Vegas, NV</span></div>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
            <p>Forward Deployed Engineer with a background spanning full-stack development, data engineering, and customer-facing technical delivery. Three productions as sole developer: a four-repo internal platform at Sphere Entertainment, a ground-up data infrastructure system at one of the largest school districts in the US, and ScopeOrNope, an indie SaaS designed, built, and shipped to production in 2026. I sit at the intersection of engineering and the customer: close enough to understand the real problem, technical enough to build the right solution.</p>
        </div>

        <div class="section">
            <h3 class="section-title">PROFESSIONAL EXPERIENCE</h3>

            <div class="experience-item">
                <div class="job-title">Forward Deployed Engineer (Contract)</div>
                <div><span class="company">The Sphere</span> &ndash; Las Vegas, NV</div>
                <div class="date">October 2025 &ndash; Present &nbsp;&middot;&nbsp; Contract Oct 2025 &rarr; FTE Jan 2026</div>
                <ul class="responsibilities">
                    <li>Sole developer on a four-repo platform: Angular 19 frontend (swiki), FastAPI/SQL Server backend (swiki-api), Python ETL pipelines (etls), and centralized CI infrastructure (testing-suite)</li>
                    <li>Architected a role-gated SPA with five stakeholder portals and two-pass Microsoft Entra ID / Azure AD authentication with backend JWT revalidation</li>
                    <li>Replaced a legacy monolith ETL script with a modular framework, automating workforce report generation and data pipeline orchestration</li>
                    <li>Three-dashboard Prometheus + Grafana observability stack monitors API and ETL health in real time</li>
                    <li>Playwright E2E coverage spans all five portals; SAST runs in GitHub Actions on a Page Object Model architecture</li>
                    <li>Presented to 6&ndash;7 senior executives across Event Security, Building Operations, and Guest Services. Buy-in from all 3 departments.</li>
                    <li>Company president identified the platform as a candidate revenue product for future Sphere venues</li>
                    <li>Dockerized deployment via docker-compose; nginx handles reverse proxy and HTTPS enforcement</li>
                </ul>
            </div>

            <div class="experience-item">
                <div class="job-title">Senior Data Visualization Analyst II &ndash; Design Focus</div>
                <div><span class="company">Clark County School District (CCSD)</span> &ndash; Las Vegas, NV</div>
                <div class="date">November 2023 &ndash; September 2025</div>
                <ul class="responsibilities">
                    <li>Sole developer on the full stack: Angular frontend, FastAPI/Python backend, Microsoft SQL Server database, and self-designed schema</li>
                    <li>ETL pipelines pull from Oracle, Workforce, Google Sheets, Excel, and additional internal systems</li>
                    <li>Built 22 components including an Arc Sankey diagram tracking staff movement across leadership categories, a geographic Highcharts heatmap of staff tenure by zip code, and a staff search tool with filterable tags for education, skills, certifications, and tenure</li>
                    <li>App reached production-ready state; funding was cut before user onboarding began</li>
                    <li>Deployment managed via Docker on a VM</li>
                </ul>
            </div>

            <div class="experience-item">
                <div class="job-title">Customer Experience &amp; Shopper Care Team Lead</div>
                <div><span class="company">Instacart</span> &ndash; Remote</div>
                <div class="date">February 2021 &ndash; June 2023</div>
                <ul class="responsibilities">
                    <li>Led a team of customer support representatives &mdash; coaching, performance management, and process guidance</li>
                    <li>Customer service analytics covered our team and adjacent teams across the same pillar</li>
                    <li>Identified a process responsible for 22% of dissatisfactory customer response scores and escalated to leadership</li>
                    <li>Built dashboards and reports in Google Suite, MySQL, Snowflake, and Mode</li>
                    <li>A Google Script tool aggregated 150+ stakeholder recommendations across the pillar</li>
                    <li>Collaborated with Product, QA, Learning &amp; Development, and Process Owners</li>
                </ul>
            </div>

            <div class="experience-item">
                <div class="job-title">Customer &amp; Shopper Support Specialist (Contract)</div>
                <div><span class="company">Instacart</span> &ndash; Remote</div>
                <div class="date">July 2020 &ndash; February 2021</div>
                <ul class="responsibilities">
                    <li>Resolved 150+ support tickets weekly across varying priority levels</li>
                    <li>POS troubleshooting across 20+ retailer types</li>
                    <li>Contributed to documenting and improving 30+ business processes</li>
                </ul>
            </div>

            <div class="experience-item">
                <div class="job-title">Payroll Care</div>
                <div><span class="company">Gusto</span> &ndash; Remote</div>
                <div class="date">August 2023 &ndash; November 2023</div>
                <p class="description">Provided specialized payroll support and resolved complex customer issues across multiple client accounts.</p>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">PROJECTS</h3>

            <div class="project-item">
                <div class="job-title">ScopeOrNope &mdash; Indie SaaS (scopeornope.com)</div>
                <div class="date">Founder &amp; Sole Engineer &nbsp;&middot;&nbsp; 2026 &nbsp;&middot;&nbsp; Next.js / TypeScript / Supabase / Anthropic API</div>
                <p class="description">A SaaS tool for freelance creatives that classifies client change requests as in-scope, out-of-scope, or unclear, then generates a professional, tone-matched response in seconds. Designed, architected, and shipped to production solo.</p>
                <ul class="responsibilities">
                    <li>Hybrid classifier: rule-based engine (fully offline) escalates to claude-haiku-4-5 with prompt caching for ambiguous requests; graceful degradation if the API is unavailable</li>
                    <li>Full SaaS billing: Stripe webhook is the sole writer of subscription_tier, enforced at the Supabase RLS level. Feature gates are verified server-side; client input is never trusted.</li>
                    <li>Security-first schema: RLS on every table, FOR UPDATE locking for concurrent revision-log writes, unique constraint on (project_id, revision_number) backed by a transaction</li>
                    <li>Privacy-first analytics: PostHog property allowlist blocks any key matching /scope/, /client/, or /content/ before reaching third-party telemetry</li>
                </ul>
            </div>

            <div class="project-item">
                <div class="job-title">Internal Operations Platform &mdash; The Sphere</div>
                <p class="description">Four-repo internal platform built as sole developer: Angular 19 frontend (swiki), FastAPI/SQL Server backend (swiki-api), Python ETL pipelines (etls), and centralized CI infrastructure (testing-suite). Role-gated SPA with five stakeholder portals, two-pass Entra ID authentication, modular ETL framework, Prometheus/Grafana observability, and Playwright E2E coverage. Deployed via Docker with nginx.</p>
            </div>

            <div class="project-item">
                <div class="job-title">Leadership Tracking System &mdash; CCSD</div>
                <p class="description">Full-stack internal platform built solo for CCSD principals and senior administrators. Angular frontend, FastAPI/Python backend, self-designed SQL Server schema. 22 components including an Arc Sankey diagram tracking staff movement across leadership categories, a geographic Highcharts heatmap of staff tenure by zip code, and a filterable staff search tool. ETL pipelines pull from Oracle, Workforce, Google Sheets, and Excel. Deployed via Docker on a VM.</p>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">TECHNICAL SKILLS</h3>
            <div class="skills-grid">
                <div>
                    <div class="skill-category">
                        <h4>Frontend &amp; Frameworks</h4>
                        <div class="skill-list">
                            <span class="skill-item">Angular</span>
                            <span class="skill-item">Next.js 16</span>
                            <span class="skill-item">TypeScript</span>
                            <span class="skill-item">RxJS</span>
                            <span class="skill-item">Tailwind CSS</span>
                            <span class="skill-item">Highcharts</span>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Backend &amp; APIs</h4>
                        <div class="skill-list">
                            <span class="skill-item">FastAPI</span>
                            <span class="skill-item">Python</span>
                            <span class="skill-item">REST API design</span>
                            <span class="skill-item">JWT</span>
                            <span class="skill-item">RBAC</span>
                            <span class="skill-item">MSAL</span>
                            <span class="skill-item">Stripe</span>
                            <span class="skill-item">C#</span>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Data &amp; Databases</h4>
                        <div class="skill-list">
                            <span class="skill-item">SQL Server</span>
                            <span class="skill-item">Supabase</span>
                            <span class="skill-item">Drizzle ORM</span>
                            <span class="skill-item">T-SQL</span>
                            <span class="skill-item">PostgreSQL</span>
                            <span class="skill-item">MySQL</span>
                            <span class="skill-item">ETL pipelines</span>
                            <span class="skill-item">Oracle</span>
                            <span class="skill-item">Snowflake</span>
                            <span class="skill-item">Workforce systems</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="skill-category">
                        <h4>Infrastructure &amp; DevOps</h4>
                        <div class="skill-list">
                            <span class="skill-item">Docker</span>
                            <span class="skill-item">docker-compose</span>
                            <span class="skill-item">nginx</span>
                            <span class="skill-item">Linux</span>
                            <span class="skill-item">Vercel</span>
                            <span class="skill-item">VM deployment</span>
                            <span class="skill-item">GitHub Actions</span>
                            <span class="skill-item">CI/CD</span>
                            <span class="skill-item">SAST</span>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Auth &amp; Observability</h4>
                        <div class="skill-list">
                            <span class="skill-item">Azure AD</span>
                            <span class="skill-item">Microsoft Entra ID</span>
                            <span class="skill-item">Prometheus</span>
                            <span class="skill-item">Grafana</span>
                            <span class="skill-item">PostHog</span>
                            <span class="skill-item">Sentry</span>
                            <span class="skill-item">Playwright</span>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Analytics &amp; Tools</h4>
                        <div class="skill-list">
                            <span class="skill-item">Tableau</span>
                            <span class="skill-item">Mode</span>
                            <span class="skill-item">Google Workspace</span>
                            <span class="skill-item">Google Apps Script</span>
                            <span class="skill-item">Jira</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="skills-grid">
                <div>
                    <h3 class="section-title">EDUCATION</h3>

                    <div class="education-item">
                        <div class="job-title">Master of Science (In Progress)</div>
                        <div class="date">Expected 2027</div>
                    </div>

                    <div class="education-item">
                        <div class="job-title">Bachelor of Applied Science &mdash; Software Development</div>
                        <div>DeVry University, North Las Vegas, NV</div>
                        <div class="date">2024</div>
                    </div>

                    <div class="education-item">
                        <div class="job-title">Associate of Science &mdash; IT &amp; Networking / Information Systems</div>
                        <div>DeVry University, North Las Vegas, NV</div>
                        <div class="date">2023</div>
                    </div>
                </div>

                <div>
                    <h3 class="section-title">CERTIFICATIONS</h3>

                    <div class="education-item">
                        <ul class="responsibilities">
                            <li>Six Sigma Black Belt &mdash; AIGPE&trade;</li>
                            <li>Lean Six Sigma Green Belt &mdash; AIGPE&trade;</li>
                            <li>Six Sigma Yellow Belt &mdash; AIGPE&trade;</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="download-container no-print">
        <button class="download-btn" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <script>
        document.querySelector('.download-btn').addEventListener('click', function() {
            window.print();
        });
    </script>
</body>
</html>`;
  }
}
