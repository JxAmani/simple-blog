const BASE_URL = "http://localhost:3000/posts";

// Run once DOM is loaded
document.addEventListener("DOMContentLoaded", main);

function main() {
  displayPosts();
  setupAddPostButton();
  handleNewPostSubmit();
}
function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = posts.map(post =>
        `<div class="post-item" data-id="${post.id}">${post.title}</div>`
      ).join("");
      // Attach event listeners after rendering
      document.querySelectorAll(".post-item").forEach(item => {
        item.addEventListener("click", () => {
          const id = item.dataset.id;
          const post = posts.find(p => p.id == id);
          showPostDetails(post);
        });
      });
    });
}


