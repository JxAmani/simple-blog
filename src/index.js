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
// 2. Display post details in section-3
function showPostDetails(post) {
  const detailDiv = document.getElementById("post-detail");
  detailDiv.innerHTML = `
    <h3>${post.title}</h3>
    <img src="${post.image}" alt="${post.title}" />
    <p>${post.content}</p>
  `;
}

