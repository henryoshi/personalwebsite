# Assets Folder

## Structure

```
assets/
├── images/          # Put your images here (.jpg, .png, .svg, etc.)
├── pdfs/           # Put your PDFs here (like resume.pdf)
└── README.md       # This file
```

## How to Use

### **Adding Images**

1. Place your image in `assets/images/`
2. Reference it in HTML:

```html
<!-- Profile photo -->
<img src="assets/images/profile.jpg" alt="Your Name">

<!-- Project screenshot -->
<img src="assets/images/project1-screenshot.png" alt="Project 1">
```

### **Adding PDFs**

1. Place your PDF in `assets/pdfs/`
2. The resume page already references `assets/pdfs/resume.pdf`
3. **Just add your resume PDF file there!**

### **Example: Adding a Profile Photo to About Me**

In `index.html`, add before or after the content:

```html
<div class="profile-photo">
    <img src="assets/images/profile.jpg" alt="Your Name">
</div>
```

Then style it in `styles.css`:

```css
.profile-photo {
    text-align: center;
    margin: 30px 0;
}

.profile-photo img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #3498db;
}
```
