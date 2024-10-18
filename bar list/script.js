'use strict';

const carouselItems = document.querySelectorAll('.carousel__item');
console.log(carouselItems)
let currentItem = document.querySelector('.carousel__item--main');
const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');

function toggleActiveState(item) {
    item.classList.toggle('active');
}

function handleInteraction(item) {
    toggleActiveState(item);
    setTimeout(() => toggleActiveState(item), 3000); // Remove active state after 3 seconds
}

carouselItems.forEach(item => {
    item.addEventListener('mouseenter', () => handleInteraction(item));
    item.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        handleInteraction(item);
    });
});

rightBtn.addEventListener('click', function() {
    currentItem = document.querySelector('.carousel__item--right');
    const leftItem = document.querySelector('.carousel__item--main');
    carouselItems.forEach((item,i) => {
        item.classList = 'carousel__item';
    });
    currentItem.classList.add('carousel__item--main');
    leftItem.classList.add('carousel__item--left');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const rightItem = currentId === carouselItems.length -1 ? carouselItems[0] : carouselItems[currentId +1];
    rightItem.classList.add('carousel__item--right');
});

leftBtn.addEventListener('click', function() {
    currentItem = document.querySelector('.carousel__item--left');
    const rightItem = document.querySelector('.carousel__item--main');
    carouselItems.forEach((item,i) => {
        item.classList = 'carousel__item';
    });
    currentItem.classList.add('carousel__item--main');
    rightItem.classList.add('carousel__item--right');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const leftItem = currentId === 0 ? carouselItems[carouselItems.length-1] : carouselItems[currentId-1];
    leftItem.classList.add('carousel__item--left');
});

function shiftRight() {
    // ... existing code ...
    carouselItems.forEach(item => item.classList.remove('active'));
}

function shiftLeft() {
    // ... existing code ...
    carouselItems.forEach(item => item.classList.remove('active'));
}