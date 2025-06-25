const BASE_URL = "http://localhost:3000/posts";

// Run once DOM is loaded
document.addEventListener("DOMContentLoaded", main);

function main() {
  displayPosts();
  setupAddPostButton();
  handleNewPostSubmit();
}


