import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import "./main.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

const images = [img1, img2, img3, img4, img5];
const background = document.getElementById("background");
const carousel = document.getElementById("carousel");
const circles = document.querySelectorAll(".nav-circle");

let canSlide = true;

const setCircle = (index) => {
  circles.forEach((circle) => {
    circle.children[0].classList.remove("fa-solid");
    circle.children[0].classList.add("fa-regular");
  });
  circles[index].children[0].classList.add("fa-solid");
  circles[index].children[0].classList.remove("fa-regular");
};

const setBackgroundImage = (image) => {
  background.style.background = `url(${image})`;
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.backgroundRepeat = "no-repeat";
};

const setImage = (image) => {
  carousel.style.background = `url(${image})`;
  carousel.style.backgroundSize = "cover";
  carousel.style.backgroundPosition = "center";
  carousel.style.backgroundRepeat = "no-repeat";
};

const initCircles = () => {
  circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      const imageIndex = currentImage();
      setBackgroundImage(images[index]);
      setCircle(index);
      if (index > imageIndex) {
        slideRight(images[index]);
      } else if (index < imageIndex) {
        slideLeft(images[index]);
      }
    });
  });
};

const slideRight = (image) => {
  carousel.animate(
    [
      {
        transform: "translateX(0)",
        easing: "ease",
        offset: 0.15,
      },
      {
        transform: "translateX(100%)",
        easing: "step-end",
      },
    ],
    {
      duration: 3000,
      iterations: 1,
    }
  );
  setTimeout(() => {
    setImage(image);
    canSlide = true;
  }, 2900);
};

const slideLeft = (image) => {
  carousel.animate(
    [
      {
        transform: "translateX(0)",
        easing: "ease",
        offset: 0.15,
      },
      {
        transform: "translateX(-100%)",
        easing: "step-end",
      },
    ],
    {
      duration: 3000,
      iterations: 1,
    }
  );
  setTimeout(() => {
    setImage(image);
    canSlide = true;
  }, 2900);
};

const currentImage = () => {
  const currentImage = carousel.style.background.split('"')[1];
  return images.indexOf(currentImage);
};

const initArrows = () => {
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  leftArrow.addEventListener("click", () => {
    if (canSlide) {
      canSlide = false;
      const index = currentImage();
      if (index == 0) {
        setBackgroundImage(img5);
        setCircle(4);
        slideLeft(img5);
      } else {
        setBackgroundImage(images[index - 1]);
        setCircle(index - 1);
        slideLeft(images[index - 1]);
      }
    }
  });

  rightArrow.addEventListener("click", () => {
    if (canSlide) {
      canSlide = false;
      const index = currentImage();
      if (index == 4) {
        setBackgroundImage(img1);
        setCircle(0);
        slideRight(img1);
      } else {
        setBackgroundImage(images[index + 1]);
        setCircle(index + 1);
        slideRight(images[index + 1]);
      }
    }
  });
};

const initApp = (() => {
  initArrows();
  initCircles();
  setImage(img1);
  setCircle(0);
})();
