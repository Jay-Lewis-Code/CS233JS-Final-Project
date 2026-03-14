/*
  Jason Lewis
  CS233JS W26 Lab 07
  03/10/2026

  JS for the Navigation Bar
    - used across all pages

*/

// Add new navigation links here
const navLinks = [
  { label: 'Home',   href: './' },
];

export default function navBar () {
  // Build an array of <li> strings from navLinks, then join into one string
  const items = navLinks.map(({ label, href }) => {
    // Get the current page's URL path (e.g. "/lab-07/about.html")
    const path = window.location.pathname;

    // Determine if this link matches the current page
    // Home is a special case: its href is './' which would match everything if used with endsWith
    let isActive;
    if (href === './') {
      isActive = path.endsWith('/') || path.endsWith('index.html');  // Home: match root or index.html
    } else {
      isActive = path.endsWith(href.replace('./', '')); // Others: match by filename (e.g. "about.html")
    }

    // Return the <li> for this link, adding the 'active' class if it matches the current page
    return `
      <li class="nav-item">
        <a class="nav-link${isActive ? ' active' : ''}" href="${href}">${label}</a>
      </li>`;
    //.join('') is called on the array returned by to concat into a single string (to replace)
  }).join('');

  // Inject the full navbar HTML into the #navbar placeholder element
  document.getElementById('navbar').innerHTML =
  `
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-arrow-through-heart-fill"></i>
          Board Game Cats!
        </a>
        <ul class="navbar-nav ms-auto">
          ${items}
        </ul>
      </div>
    </nav>
  `;
}