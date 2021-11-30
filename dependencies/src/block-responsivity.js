window.addEventListener('load', () => {
    const editor = document.getElementById('editor');

    if (editor) {
        editor.addEventListener('DOMSubtreeModified', () => {
            const blocks = document.getElementsByClassName('block-responsive');

            for (const block of blocks) {
                let width = getComputedStyle(block).width;
                width = width.replace('px', '');
                width = Number(width);

                if (width < 600 && !block.classList.contains('small')) block.classList.add('small');
                if (width < 200 && !block.classList.contains('very-small')) block.classList.add('very-small');
            }
        })
    }
})
