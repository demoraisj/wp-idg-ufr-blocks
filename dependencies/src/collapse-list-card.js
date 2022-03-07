window.addEventListener('load', () => {
    function toggleCollapse() {
        const headings = document.querySelectorAll('.wp-block-create-block-ufr-collapse-list-card .heading');

        headings.forEach((element) => {
            if (element.nextElementSibling.classList.contains('closed')) {
                element.nextElementSibling.classList.remove('closed');
            } else {
                element.nextElementSibling.classList.add('closed');
            }

            if (element.querySelector('.arrow i').classList.contains('fa-chevron-down')) {
                element.querySelector('.arrow i').classList.remove('fa-chevron-down');
                element.querySelector('.arrow i').classList.add('fa-chevron-up');
            } else {
                element.querySelector('.arrow i').classList.remove('fa-chevron-up');
                element.querySelector('.arrow i').classList.add('fa-chevron-down');
            }
        })
    }

    document.querySelectorAll('.wp-block-create-block-ufr-collapse-list-card .heading').forEach((el) => {
        el.addEventListener('click', toggleCollapse);
    });
})
