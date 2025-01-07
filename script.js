let inactivityTimeout; // Variable to hold the timeout
const inactivityDuration = 5000; // Duration before redirecting (in milliseconds)
const redirectURL = "https://tingrubato.github.io/ps-cv/"; // Redirect URL
let isScrolling = false; // Flag to track user interaction

// Function to randomly scroll to a list item
function randomScroll() {
  const listItems = document.querySelectorAll("ul[aria-hidden='true'] li");
  if (listItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * listItems.length); // Pick a random index
    const randomItem = listItems[randomIndex];
    randomItem.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Function to handle inactivity
function handleInactivity() {
  randomScroll(); // Perform a random scroll

  setTimeout(() => {
    if (!isScrolling) {
      // If no user interaction, redirect to the URL
      window.location.href = redirectURL;
    }
  }, inactivityDuration); // Redirect after the inactivity duration
}

// Function to reset inactivity timer
function resetInactivityTimer() {
  isScrolling = true; // Set interaction flag
  clearTimeout(inactivityTimeout); // Clear existing timeout
  inactivityTimeout = setTimeout(() => {
    isScrolling = false; // Reset interaction flag
    handleInactivity(); // Check inactivity
  }, inactivityDuration);
}

// Event listeners for user interaction
window.addEventListener("mousemove", resetInactivityTimer);
window.addEventListener("keydown", resetInactivityTimer);
window.addEventListener("scroll", resetInactivityTimer);

// Initial timer setup
resetInactivityTimer();