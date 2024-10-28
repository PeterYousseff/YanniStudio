// our work popup video
const thumbnails = document.querySelectorAll(".thumbnail");
const modalContainer = document.querySelector(".video-modal-container");
const videoIframe = document.querySelector(".video-iframe");
const closeButton = document.querySelector(".close-button");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const videoId = thumbnail.dataset.id;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    videoIframe.src = videoUrl;
    modalContainer.style.display = "flex";
  });
});

closeButton.addEventListener("click", () => {
  videoIframe.src = "";
  modalContainer.style.display = "none";
});

