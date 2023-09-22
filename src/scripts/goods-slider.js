;(function () {
   const sliderContainer = document.querySelector('.slider__container');
   const sliderList = document.querySelector('.slider__list');
   const sliderItems = document.querySelectorAll('.slider__item');
   const sliderThumbs = document.querySelector('.slider__thumb-list');
   const sliderThumbItems = document.getElementsByClassName('slider__thumb-item');
   
   let lastIndex = sliderItems.length - 1,
       currentIndex = 0;

   let xDown = null,
       yDown = null;

   generateThumbs();

   sliderContainer.addEventListener('touchstart', handleTouchStart, false);
   sliderContainer.addEventListener('touchmove', handleTouchMove, false);
   sliderThumbs.addEventListener('click', handleClick, false);

   function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY; 
   };

   function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) return;

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if ( Math.abs(xDiff) > Math.abs(yDiff)) {
         ( xDiff > 0 ) ? currentIndex++ : currentIndex--;
      }

      moveSlide();
      
      xDown = null;
      yDown = null;
   };

   function handleClick(evt) {
      const thumbItem = evt.target.closest('.slider__thumb-item');
      currentIndex = Array.from(sliderThumbItems).indexOf(thumbItem);

      moveSlide();
   };
   
   function moveSlide() {
      if (currentIndex < 0) currentIndex = lastIndex;
      if (currentIndex > lastIndex) currentIndex = 0;
      
      sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
      coloringThumbs(currentIndex);
   };

   function generateThumbs() {
      sliderItems.forEach(el => {
         const srcImg = el.firstElementChild.getAttribute('src');
         const sliderThumb = document.createElement('li');
         sliderThumb.className = "slider__thumb-item";
         sliderThumb.innerHTML = `<img src="${srcImg}" alt="goods image" class="slider__thumb-img">`;
         sliderThumbs.append(sliderThumb);
         
         sliderThumbs.firstElementChild.classList.add('slider__thumb-item--active');
      });
   }; 
    
   function coloringThumbs(index) {
      [].forEach.call(sliderThumbs.children, el => {
         if (el.classList.contains('slider__thumb-item--active')) {
            el.classList.remove('slider__thumb-item--active');
         }
      });
      
      sliderThumbs.children[index].classList.add('slider__thumb-item--active');
   };
})()