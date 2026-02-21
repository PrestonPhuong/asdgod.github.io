async function loadPage() {
  const page = window.location.hash.substring(1);
  const content = document.getElementById('content');  // element must have id="content"

  if (!page) {
    content.innerHTML = '<h1>Welcome</h1><p>Select a tool above.</p>';
    return;
  }

  try {
    const response = await fetch(`${page}.html`);
    if (!response.ok) throw new Error('Not found');

    const html = await response.text();
    content.innerHTML = html;

    // Re-run scripts inside loaded HTML
    content.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
      oldScript.remove();
    });
  } catch {
    content.innerHTML = '<h1>404 - Tool Not Found</h1>';
  }
}

window.addEventListener('hashchange', loadPage);
window.addEventListener('load', loadPage);