function setBannerSizeAndVisibility() {
    const container = document.querySelector('.container') ?? document.querySelector('.editor-styles-wrapper');
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
            banner.style.maxHeight = `${newHeight}px`;
        } else {
            banner.style.width = `${originalWidth}px`;
            banner.style.height = `${originalHeight}px`;
            banner.style.maxHeight = `${originalHeight}px`;
        }

        banner.style.display = 'flex';
    });
}

window.setBannerSizeAndVisibility = setBannerSizeAndVisibility;
window.addEventListener('DOMContentLoaded', setBannerSizeAndVisibility);
