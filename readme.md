# Raunak Raj — Portfolio Website
## Beginner-Friendly Version

---

## 📁 File Structure

```
portfolio/
├── index.html    ← The webpage content (structure)
├── style.css     ← How everything looks (colors, layout, fonts)
├── script.js     ← Interactive behavior (form, scroll effects)
└── README.md     ← This file (explains everything)
```

---

## 🧠 What Each File Does

### `index.html` — The Structure
- Think of this as the **skeleton** of the page
- It contains all the text, headings, buttons, and sections
- It links to `style.css` and `script.js` so they all work together
- Every section is clearly labeled with comments like:
  ```html
  <!-- ========== HERO SECTION ========== -->
  ```

### `style.css` — The Appearance
- Think of this as the **clothing and makeup** of the page
- Controls colors, fonts, spacing, layout, hover effects
- Uses **CSS Variables** at the top (`:root { }`) to save colors
- Every section has beginner-friendly comments explaining what each rule does

### `script.js` — The Behavior
- Think of this as the **brain** of the page
- Makes the contact form work and validate inputs
- Highlights the correct nav link as you scroll
- Animates the skill bars when they come into view

---

## 🚀 How to Open the Website

1. Put all 3 files in the **same folder**
2. Double-click `index.html`
3. It opens in your browser — done!

No server needed. No installation required.

---

## ✏️ How to Customize

### Change your name:
Search for "Raunak Raj" in `index.html` and replace it.

### Change colors:
Open `style.css`, find the `:root { }` block at the top, and change the color values.

### Add your photo:
In `index.html`, find the About section and add:
```html
<img src="your-photo.jpg" alt="Raunak Raj" style="width:220px; border-radius:8px;" />
```

### Add your resume link:
Search for `onclick="alert('Replace"` in `index.html` and replace the `href="#"` with your actual PDF link.

---

## 🔰 Key Concepts for Beginners

| Term | Meaning |
|------|---------|
| `class=""` | Gives an element a name so CSS/JS can style it |
| `id=""` | Gives a unique name (used by JavaScript and anchor links) |
| `href=""` | Where a link goes |
| `#section` | Links to a section with that id on the same page |
| `display: flex` | Puts elements side by side in a row |
| `display: grid` | Puts elements in rows and columns |
| `var(--green)` | Uses the saved color named `--green` |
| `@media (max-width: 900px)` | Rules that only apply on small screens |