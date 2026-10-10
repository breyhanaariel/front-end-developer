# Portfolio resumes — review-only GitHub staging

This branch is a **staging anchor**, not the central `portfolio-resumes` repository. The six live websites and all default branches remain unchanged.

## Approved inputs
- Public name: Brianna Dickenson
- Location: Clearwater, Florida; omit phone
- Employer: Ad Caffeine Marketing, Full Stack Developer Intern, April 2021–Present; internship
- Responsibilities: WordPress development; debugging/testing; accessibility/SEO; UI/UX; branding/graphic design
- Kenzie Academy and W3C credentials completed; exact wording provisional
- University of Michigan: completed individual courses
- Skills: only claims supported by project evidence or confirmed work
- Publication scope: staging; **no public deployment approval**

## Files in this branch
- `data/profile.json`, `data/education.json`, `data/approval.json` hold review metadata.
- `.github/workflows/resume-preview.yml` is a **workflow template only**. Because it is nested under `resume-system/`, it is not an active GitHub Actions workflow.
- `review-status.json` is the original staging record; `data/approval.json` is the newer approval state.

The complete generator, six specialty configurations, PDFs and publishing scripts remain in the downloadable Milestone 3 local package, **not** this GitHub branch. The dedicated `breyhanaariel/portfolio-resumes` repository has not been created. A functioning GitHub preview or publishing automation has therefore **not** been activated.

## Next steps
1. Create the dedicated `portfolio-resumes` repository.
2. Import the complete package into it, placing workflows at repository-root `.github/workflows/`.
3. Verify PDF output and review exact credential titles.
4. Configure required-reviewer environment and scoped secrets.
5. Request explicit separate approval before any PDF publication or site CTA changes.

**Do not merge staging into main or modify the six sites without approval.**
