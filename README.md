# My Portfolio - Setup Instructions

## How to Run (Simple Static Site)

### Option 1: Open Directly in Browser
Simply open `index.html` in your browser:
- Double-click `index.html` to open it locally
- Or drag and drop `index.html` into your browser

### Option 2: Local Development Server

If you want to test with a local server, use Python:

```bash
cd C:\temp\MyPortFolio
python -m http.server 3000
```

Then go to: `http://localhost:3000`

## Project Structure

```
MyPortFolio/
├── index.html              # Main website
├── style.css               # Styles
├── script.js               # JavaScript (100% vanilla)
├── Profile.jpg             # Profile picture
├── appriciations/          # Folder with all appreciation images and PDFs
│   ├── 01.jpg to 04.jpg    # Image files
│   └── 05.pdf to 15.pdf    # PDF files
└── README.md               # This file
```

## Features

✅ **No dependencies** - Pure HTML, CSS, JavaScript  
✅ **Dynamic appreciation file loading** - All 15 files displayed  
✅ **Full-page modal viewer** with zero white spaces  
✅ **Support for images and PDFs**  
✅ **Responsive design** for all devices  
✅ **Keyboard navigation** - Arrow keys to navigate  
✅ **Previous/Next buttons** with disabled states  
✅ **GitHub Pages Compatible** - Deploy as-is!

## Usage

1. Click **"View All Appreciations & Certificates"** button
2. Use **Previous/Next** buttons to navigate
3. Press **Esc** or click outside to close
4. Use **Arrow Keys** (← →) for keyboard navigation

## Deployment to GitHub Pages

1. Create a GitHub repository
2. Push all files to the repository
3. Go to **Settings → Pages**
4. Select **Deploy from a branch** (main/master)
5. Your portfolio will be live at `https://yourusername.github.io/repo-name`

That's it! No server configuration needed.

## Troubleshooting

**Problem:** Images/PDFs not showing in popup

**Solution:** Make sure:
1. All files are in the `appriciations/` folder (note the spelling)
2. File names match exactly (01.jpg, 02.jpg, etc.)
3. You're opening via http:// not file:// (for PDF display)

**Problem:** Want to add more files?

**Solution:** 
1. Add your new files to the `appriciations/` folder
2. Edit `script.js` and add the file paths to the array
3. That's it!

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## File Naming Convention

Files are sorted numerically, so use:
- `01.jpg`, `02.jpg`, ... 
- NOT `1.jpg`, `2.jpg`

This ensures correct ordering in the gallery.
