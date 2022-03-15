window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const banners = document.querySelectorAll('.banner-container');

    banners.forEach((banner) => {
        const containerWidth = container.clientWidth;
        const originalWidth = banner.getAttribute('data-width');
        const originalHeight = banner.getAttribute('data-height');

        if (originalWidth > containerWidth) {
            const percentage = (containerWidth * 100) / originalWidth;
            const newHeight = (originalHeight * percentage) / 100;

            banner.style.width = `${containerWidth - 20}px`;
            banner.style.height = `${newHeight}px`;
        } else {
            banner.style.width = `${originalHeight}px`;
            banner.style.width = `${originalWidth}px`;
        }

        banner.style.display = 'flex';
    })
})
