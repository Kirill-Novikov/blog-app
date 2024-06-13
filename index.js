const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.getElementById("validationMessage");

newPostBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();
});

postTitleInputNode.addEventListener("input", validation);

postTextInputNode.addEventListener("input", validation);

function validation() {
  const titleLen = postTitleInputNode.value.length;
  const textLen = postTextInputNode.value.length;

  if (titleLen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hiden");
    return;
  }

  if (textLen > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hiden");
    return;
  }

  validationMessage.classList.add("validationMessage_hiden");
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  return {
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  const currentDate = new Date();
  const dt = `${currentDate.getUTCDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  posts.push({
    dt,
    title,
    text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
    <div class = 'post'>
      <p class = 'post_date'>${post.dt}</p>
      <p class = 'post_title'>${post.title}</p>
      <p class = 'post_text'>${post.text}</p>
    </div>
    `;
  });

  postsNode.innerHTML = postsHTML;
}
