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
  expandedCase = 0;
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

  // ── Background art fields ──────────────────────────────────
  private bgCanvas?: HTMLCanvasElement;
  private bgCtx?: CanvasRenderingContext2D;
  private bgRafId?: number;
  private bgT = 0;
  private bgParticles: Array<{ x: number; y: number; age: number; maxAge: number }> = [];
  private readonly BG_COUNT = 160;
  private readonly BG_SPEED = 1.5;
  private bgResizeRef = () => this.bgResize();
  private bgVisibilityRef = () => {
    if (document.hidden) cancelAnimationFrame(this.bgRafId!);
    else this.bgTick();
  };

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
    this.setupBackground();
  }

  ngOnDestroy(): void {
    clearInterval(this.typeInterval);
    this.observer?.disconnect();
    cancelAnimationFrame(this.bgRafId!);
    window.removeEventListener('resize', this.bgResizeRef);
    document.removeEventListener('visibilitychange', this.bgVisibilityRef);
    this.bgCanvas?.remove();
  }

  toggleCase(index: number): void {
    this.expandedCase = this.expandedCase === index ? -1 : index;
  }

  scrollToWork(): void {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ── Background art methods ─────────────────────────────────
  private setupBackground(): void {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);
    this.bgCanvas = canvas;
    this.bgCtx = canvas.getContext('2d')!;
    this.bgResize();
    window.addEventListener('resize', this.bgResizeRef);
    document.addEventListener('visibilitychange', this.bgVisibilityRef);
    this.bgTick();
  }

  private bgResize(): void {
    const c = this.bgCanvas!;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    this.bgCtx!.fillStyle = '#09090B';
    this.bgCtx!.fillRect(0, 0, c.width, c.height);
    const w = c.width, h = c.height;
    this.bgParticles = Array.from({ length: this.BG_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      age: Math.floor(Math.random() * 60),
      maxAge: 60 + Math.random() * 100,
    }));
  }

  private bgField(x: number, y: number, t: number): number {
    const s = 0.0032;
    const phi = 1.6180339887;
    return (
      Math.sin(x * s + t * 0.28) * Math.cos(y * s * 0.78 - t * 0.20) +
      Math.sin(x * s * phi - y * s * 0.88 + t * 0.16) * 0.55 +
      Math.cos(x * s * 0.52 + y * s * phi - t * 0.11) * 0.32
    ) * Math.PI * 2;
  }

  private bgThreshold(x: number, t: number): number {
    const h = this.bgCanvas!.height;
    const phi = 1.6180339887;
    const cx = x / this.bgCanvas!.width;
    const amp = 0.09 * h;
    return h * 0.5
      + amp * Math.sin(cx * 2.5 * Math.PI + t * 0.35)
      + amp * 0.5 * Math.sin(cx * 2.5 * phi * Math.PI - t * 0.35 * phi)
      + amp * 0.25 * Math.sin(cx * 2.5 * phi * phi * Math.PI + t * 0.24);
  }

  private bgTick(): void {
    this.bgRafId = requestAnimationFrame(() => this.bgTick());
    const ctx = this.bgCtx!;
    const c = this.bgCanvas!;
    const w = c.width, h = c.height;
    const t = this.bgT;

    ctx.fillStyle = 'rgba(9,9,11,0.055)';
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 5) {
      const y = this.bgThreshold(x, t);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    for (const p of this.bgParticles) {
      const angle = this.bgField(p.x, p.y, t);
      p.x += Math.cos(angle) * this.BG_SPEED;
      p.y += Math.sin(angle) * this.BG_SPEED;
      p.age++;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      if (p.age > p.maxAge) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.age = 0;
        p.maxAge = 60 + Math.random() * 100;
      }

      const fadeIn = Math.min(1, p.age / 20);
      const fadeOut = Math.max(0, 1 - p.age / p.maxAge);
      const alpha = fadeIn * fadeOut * 0.55;

      const thresh = this.bgThreshold(p.x, t);
      const dist = Math.abs(p.y - thresh);
      const band = 22;
      let r: number, g: number, b: number;

      if (dist < band) {
        const mix = dist / band;
        if (p.y < thresh) {
          r = Math.round(140 + (245 - 140) * mix);
          g = Math.round(140 + (158 - 140) * mix);
          b = Math.round(145 + (11 - 145) * mix);
        } else {
          r = Math.round(140 + (99 - 140) * mix);
          g = Math.round(140 + (102 - 140) * mix);
          b = Math.round(145 + (241 - 145) * mix);
        }
      } else if (p.y < thresh) {
        r = 245; g = 158; b = 11;
      } else {
        r = 99; g = 102; b = 241;
      }

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.6, 1.6);
    }

    this.bgT += 0.004;
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
