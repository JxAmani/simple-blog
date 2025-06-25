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

// 3. Show the new post form when button is clicked
function setupAddPostButton() {
  const btn = document.getElementById("add-post-btn");
  const form = document.getElementById("new-post-form");

  btn.addEventListener("click", () => {
    form.classList.toggle("hidden");
  });
}
// 4. Handle new post form submission
function handleNewPostSubmit() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      title: document.getElementById("title").value,
      image: document.getElementById("image").value,
      content: document.getElementById("content").value
    };

    // Send to backend
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(post => {
      displayPosts();       // refresh list
      showPostDetails(post); // show the new post
      form.reset();         // clear form
      form.classList.add("hidden"); // hide form again
    });
  });
}
