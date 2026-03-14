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
        <a href="${href}" class="nav-link px-2${isActive ? ' active' : ''}" >${label}</a>
      </li>`;
    //.join('') is called on the array returned by to concat into a single string (to replace)
  }).join('');

  // Inject the full navbar HTML into the #navbar placeholder element
  document.getElementById('navbar').innerHTML =
  `
    <header class="p-3 mb-3 border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
            <i class="bi bi-arrow-through-heart-fill" width="40" height="32" role="img" aria-label="Bootstrap"></i>
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" id="nav-items">
            ${items}
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" disabled>
          </form>

          <div class="dropdown text-end">
            <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>



      </div>
    </div>
  `;
}


