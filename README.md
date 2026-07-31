# My Portfolio Website

My website which contains information about my expertise, background and projects. it is bilingual with dark/light theme support.

View website at: https://lelouc01101000.github.io/MyPortfolio/

## File Structure

```
├── index.html        
├── styles.css          
├── script.js           # application logic
└── assets/
    ├── images/         # project thumbnails, profile photo, favicon
    └── videos/         # project demonstration videos
```

## Features

- **Bilingual support**: English (EN) and Georgian (KA).
- **Theme switching**: Dark and light modes.
- **Responsive layout**: Desktop, tablet, and mobile breakpoints.
- **Video modal**: Click project thumbnails to play demonstration videos.
- **Playback speed control**: 0.5×, 0.75×, 1×, 1.5×, 2× buttons inside the modal.
- **Skill tooltips**: Hover over skill tags to read descriptions.
- **Smooth scrolling**: Navigation links scroll to sections.
- **Scroll-to-top button**: Appears after scrolling 500 pixels.
- **Version Control**: `?v=` query string appended to all assets via `window.SITE_VERSION`.

## Architecture

### Theming

CSS custom properties define colors for dark mode in `:root`. Light mode overrides are stored in `[data-theme="light"]`. The active theme is set on the `<html>` element. The choice is persisted in `localStorage`.

### Localization

All translatable strings live in the `translations` object inside `script.js`. Each key maps to English and Georgian values. The `switchLanguage()` function updates all elements with a matching `data-key` attribute, then re-renders skills and projects.

### Dynamic Rendering

Skills and project cards are generated at runtime by Vanilla JavaScript. This keeps the HTML markup minimal and allows language switching without page reload.

- `renderSkillTags()` reads from `skillsTranslation` and injects `<span class="skill-tag">` elements.
- `renderProjectCards()` reads from `projectsTranslation` and injects full card markup including thumbnails, badges, and links.

### Video Modal

The modal is a fixed-position overlay. `openVideoModal(src, title)` sets the `<video>` source and displays the overlay. The modal pauses and resets on close. Autoplay is attempted; browsers may block it.

### Mobile Navigation

A hamburger button toggles a dropdown menu. The menu closes on outside clicks, Escape key presses, or link clicks.

## Data Structures

### Skill Tag

```javascript
{
  name: "Skill Name",
  desc: "Description shown in tooltip"
}
```

### Project

```javascript
{
  name: "Project Name",
  filename_image: "assets/images/Project_Name",
  filename_video: "assets/videos/Project_Name",
  lang: "Python",
  langClass: "lang-python",
  description: "Project summary.",
  link: "https://example.com",
  linkPlaceholder: true,
  githubLink: "https://github.com/user/repo",
  links: {
    project: { show: true, position: "left" },
    github: { show: true, position: "right" }
  }
}
```

File extensions (`.jpg`, `.mp4`) are appended during rendering. The `links` object controls visibility and placement of the external link and GitHub button.

## Asset Versioning

`window.SITE_VERSION` is defined once in `index.html`. Both the stylesheet and script are loaded with `document.write` so the version query string is injected before the browser parses them. The same version is appended to image and video sources in JavaScript.

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| ≤ 1024 px | Contact grid switches to 2 columns. About grid gap shrinks. |
| ≤ 768 px | Desktop nav hides. Hamburger appears. Single-column layouts for about, projects, contact. |
| ≤ 480 px | Reduced padding on containers and cards. |

## Accessibility

- Focus-visible outlines on interactive elements.
- `aria-label` attributes on icon-only buttons.
- `prefers-reduced-motion` media query disables animations.
- Semantic HTML elements (`nav`, `section`, `button`).

## Credits

Most images were sourced from Pinterest or Google:

| Asset | Artist / Source |
|---|---|
| Trasheow.jpg | amtitus |
| Caleow.jpg | Kira_Culufin |
| Auto_Clicker.jpg | Xoxqueen |
| Hexagonal_Chess.jpg | Manuel |
| Space_Shooter.jpg | Tsukumizu |
| Tab_Logo.png | pixeleart on magnific.com |
| Typeow.jpg | gigazine.net |
| placeholder.mp4 | BBC |

The following assets are unused and their artists I could not track:

- Tab_Logo2.png
- placeholder.jpg
- Auto_Clicker2.jpg
