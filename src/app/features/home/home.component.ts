import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  terminalText = '';
  private readonly fullTerminalText = '> building at the intersection of systems and stakeholders';

  activeShot = 0;
  readonly shots = [
    { label: 'Dashboard', url: 'scopeornope.app/dashboard',    src: 'assets/images/dashboard.png',      alt: 'ScopeOrNope dashboard showing scope risk across active projects' },
    { label: 'Request',   url: 'scopeornope.app/check',        src: 'assets/images/request_input.png',  alt: 'Client change request input and classification form' },
    { label: 'Results',   url: 'scopeornope.app/check#result', src: 'assets/images/request_output.png', alt: 'Scope classification result with generated tone-matched response' },
  ];
  private typeInterval?: ReturnType<typeof setInterval>;
  private observer?: IntersectionObserver;

  readonly capabilities = [
    { group: 'Frontend',           items: ['Angular 19', 'TypeScript', 'RxJS', 'Tailwind CSS'] },
    { group: 'Backend & APIs',     items: ['FastAPI', 'Python', 'REST API Design', 'JWT Auth'] },
    { group: 'Data & ETL',         items: ['SQL Server', 'PostgreSQL', 'ETL Pipelines', 'Tableau'] },
    { group: 'Auth & Security',    items: ['Azure AD / Entra ID', 'MSAL', 'RBAC', 'SAST', 'GitHub Actions'] },
    { group: 'Infrastructure',     items: ['Docker', 'docker-compose', 'nginx', 'Linux', 'VM Deployment'] },
    { group: 'Observability & QA', items: ['Prometheus', 'Grafana', 'Playwright E2E', 'CI/CD'] },
    { group: 'Process',            items: ['Lean Six Sigma Black Belt', 'Technical Documentation', 'Stakeholder Communication'] },
  ];

  readonly experience = [
    {
      title: 'Forward Deployed Engineer',
      company: 'Sphere Entertainment Co.',
      period: 'Oct 2025 – Present',
      tag: 'Contract → FTE · Current',
      current: true,
      bullets: [
        'Built a 4-repo production platform: Angular 19 SPA, FastAPI/SQL Server backend, Python ETL suite, Playwright QA repo',
        'Enterprise auth: Azure AD / Entra ID with MSAL + backend JWT revalidation on every request',
        'Deployed Prometheus + Grafana observability (3 dashboards); configured nginx, DNS, and HTTPS on production VM',
        'Secured executive buy-in to expand QC tooling across additional venue departments',
      ]
    },
    {
      title: 'Data Visualization Analyst II',
      company: 'Clark County School District',
      period: 'Nov 2023 – Sep 2025',
      tag: '',
      current: false,
      bullets: [
        'Sole engineer on a ground-up internal web platform at one of the largest school districts in the US',
        'Designed schema, built FastAPI backend, developed Angular frontend, managed Docker deployment to VM',
        'Reduced data request fulfillment from months to days via custom ETL pipelines',
        'Built geographic staff tenure visualizations across Clark County using SQL Server + Highcharts',
      ]
    },
    {
      title: 'Customer Experience & Shopper Care Team Lead',
      company: 'Instacart',
      period: 'Feb 2021 – Jun 2023',
      tag: '',
      current: false,
      bullets: [
        'Built cross-functional dashboards in MySQL, Snowflake, Mode, and Python for CX analytics',
        'Identified and resolved a process driving 22% of DSAT KPI scores',
      ]
    },
    {
      title: 'Customer & Shopper Support Specialist',
      company: 'Instacart',
      period: 'Jul 2020 – Feb 2021',
      tag: 'Contract',
      current: false,
      bullets: []
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => this.startTypewriter(), 900);
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.observer!.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    this.el.nativeElement.querySelectorAll('.reveal')
      .forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    clearInterval(this.typeInterval);
    this.observer?.disconnect();
  }

  scrollToWork(): void {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  }

  private startTypewriter(): void {
    let i = 0;
    this.typeInterval = setInterval(() => {
      if (i < this.fullTerminalText.length) {
        this.terminalText += this.fullTerminalText[i++];
      } else {
        clearInterval(this.typeInterval);
      }
    }, 46);
  }
}
