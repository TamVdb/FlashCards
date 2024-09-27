/**
 * ? Theme switcher
 * Check local storage for theme or OS preferences & set the correct theme
 **/

// Check local storage for theme
let localS = localStorage.getItem('theme');
let themeToSet = localS;

// If local storage is not set, we check the OS preferences
if (!localS) {
   themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set the correct theme
document.documentElement.setAttribute('data-theme', themeToSet);

/**
 * ? Theme switcher
 * Function which switch the theme
 **/
const switchTheme = () => {
   // Get root element (HTML) & data-theme value
   const HTML = document.documentElement;
   let dataTheme = HTML.getAttribute('data-theme');

   // Declare the new theme
   let newTheme;

   // Set the new theme based on the data-theme
   newTheme = dataTheme === 'light' ? 'dark' : 'light'; // Ternaire

   // Set the new HTML attribute
   HTML.setAttribute('data-theme', newTheme);

   // Set the new local storage item
   localStorage.setItem('theme', newTheme);
};

// Add event listener for theme switcher
document.getElementById('theme-switcher').addEventListener('click', switchTheme);

/**
 * ? Copyright
 * Function which add the current year in the copyright
 **/

// Get the year
const yearCopyrights = () => {
   const TODAY = new Date();
   return TODAY.getFullYear();
};

// Set the year
document.getElementById('year').textContent = yearCopyrights();
