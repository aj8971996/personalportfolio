// resume.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDownloadService } from '../../services/resume-download.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  
  constructor(private resumeDownloadService: ResumeDownloadService) {}
  
  /**
   * Handles the resume download button click for visual PDF
   */
  downloadResume(): void {
    // Show a loading indicator
    this.showLoading(true);
    
    // Use setTimeout to allow UI to update before starting the heavy PDF generation
    setTimeout(async () => {
      try {
        // Pass the ID of the resume section to the service
        await this.resumeDownloadService.downloadResume('resume-content', 'pdf');
      } catch (error) {
        console.error('Failed to download resume:', error);
        alert('There was an error generating your resume. Please try again.');
      } finally {
        // Hide loading indicator
        this.showLoading(false);
      }
    }, 100);
  }
  
  /**
   * Handles downloading the ATS-friendly resume
   */
  downloadATSResume(): void {
    // Show a loading indicator
    this.showLoading(true);
    
    setTimeout(async () => {
      try {
        // Download the ATS-friendly resume
        await this.resumeDownloadService.downloadResume('', 'ats');
      } catch (error) {
        console.error('Failed to download ATS resume:', error);
        alert('There was an error generating your ATS resume. Please try again.');
      } finally {
        // Hide loading indicator
        this.showLoading(false);
      }
    }, 100);
  }
  
  /**
   * Shows or hides a loading indicator
   */
  private showLoading(show: boolean): void {
    const loadingEl = document.getElementById('loading-indicator');
    if (loadingEl) {
      loadingEl.style.display = show ? 'flex' : 'none';
    }
  }
}