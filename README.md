# Nick Shubin — One-page Tutor Site

Files:
- index.html
- style.css
- script.js

## Replace site on GitHub (beta)
1. Open your repo on GitHub.
2. Click "Add file" → "Upload files".
3. Upload these three files (and any updated README).
   - On iPhone: unzip the package first (tap the zip), then select the files or drag them into the upload area.
   - If you prefer, delete existing files first from the GitHub web UI, then upload the new files.
4. Commit changes with message "Update: full site".
5. Enable GitHub Pages for the main branch (Settings → Pages → Branch: main / Folder: root).
6. Open the Pages URL to preview.

## Notes
- The contact form uses Netlify Forms (`data-netlify="true"`) — it will NOT send submissions on GitHub Pages preview. To receive messages, deploy to Netlify.
- To edit prices: change the `prices` object in `script.js` or edit values in HTML.
- To add real photos: replace the `.photo-placeholder` block with `<img src="images/portrait.jpg" alt="Nick">` and upload the image file.
