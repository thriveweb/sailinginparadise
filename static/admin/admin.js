var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

document.addEventListener("DOMContentLoaded", function() {

if ("IntersectionObserver" in window) {
  let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;

        if(lazyImage.dataset.src) {
          if(lazyImage.classList.contains('BackgroundImage')) {
            lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
          }  else {
            lazyImage.src = lazyImage.dataset.src;
          }

          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      }
    });
  });

  lazyImages.forEach(function(lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
}

})