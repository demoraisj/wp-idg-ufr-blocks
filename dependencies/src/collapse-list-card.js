window.addEventListener('load', () => {
    const headings = document.querySelectorAll('.wp-block-create-block-ufr-collapse-list-card .heading');

    headings.forEach((heading) => {
        heading.addEventListener('click', () => {
            if (heading.nextElementSibling.classList.contains('closed')) {
                heading.nextElementSibling.classList.remove('closed');
            } else {
                heading.nextElementSibling.classList.add('closed');
            }

            if (heading.querySelector('.arrow i').classList.contains('fa-chevron-down')) {
                heading.querySelector('.arrow i').classList.remove('fa-chevron-down');
                heading.querySelector('.arrow i').classList.add('fa-chevron-up');
            } else {
                heading.querySelector('.arrow i').classList.remove('fa-chevron-up');
                heading.querySelector('.arrow i').classList.add('fa-chevron-down');
            }
        });
    });
})
