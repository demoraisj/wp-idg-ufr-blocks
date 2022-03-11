async function ufrSetTopNews(params) {
	const {
		imgWidth,
		imgHeight,
		showTitle,
		showExcerpt,
		cols,
		showShareBtn,
		topnewsID,
		useCard,
		useImage,
		jumpPosts,
		showCategory,
	} = params;

	const postsUrl = window.ufrGlobals.siteUrl + `/wp-json/ufr/featured-news?quantity=${cols}&jump=${jumpPosts}`;

	const wrapper = document.getElementById(topnewsID);

	const boxOne = wrapper.querySelector('.top-news-number-1');
	const boxTwo = wrapper.querySelector('.top-news-number-2');
	const boxThree = wrapper.querySelector('.top-news-number-3');

	const elements = [boxOne, boxTwo, boxThree].map((box) => (
		{
			theCol: box,

			boxContent: box.querySelector('.content'),
			boxCategory: box.querySelector('.category'),
			boxTitle: box.querySelector('.title'),
			boxExcerpt: box.querySelector('.excerpt'),

			boxImgContainer: box.querySelector('.img-container'),
			boxImageBoxCol: box.querySelector('.box-col'),

			boxShareBtn: box.querySelector('.social-links'),
			boxShareFb: box.querySelector('.social-links .facebook'),
			boxShareTt: box.querySelector('.social-links .twitter'),
			boxShareWpp: box.querySelector('.social-links .whatsapp'),

			boxShareToggle: box.querySelector('.toggle-social-links'),
		}
	));

	try {
		const posts = await fetch(postsUrl).then(res => res.json());

		if (!Array.isArray(posts) || posts.length === 0) {
			wrapper.innerHTML = '<div class="not-found">Nenhum post encontrado.</div>';

			return;
		}

		function strip(string) {
			if (!string) return '';

			string = string.replaceAll(/(<p>|<\/p>)/gm, '');
			string = string.replaceAll(/(&lt;p>|&lt;\/p>)/gm, '');
			string = string.replaceAll(/\n/gm, ' ');

			return string;
		}

		elements.forEach((col, idx) => {
			let img = window.ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';

			const { permalink, thumbnail, post_title, post_excerpt, categories } = posts[idx];

			const category = categories.length > 0 ? categories[0] : null;

			if (thumbnail && typeof thumbnail === 'string' && thumbnail.length > 0) img = thumbnail;

			col.theCol.onclick = () => window.open(permalink, '_self');
			col.theCol.onauxclick = () => window.open(permalink, '_blank');

			if (useImage) {
				col.boxImgContainer.innerHTML = `<img src="${img}" alt="${post_title}" />`;

				col.boxImgContainer.style.width = imgWidth;
				col.boxImgContainer.style.height = imgHeight;
				col.boxImgContainer.style.padding = useCard ? '10px' : '';
			}

			col.boxTitle.innerHTML = (showTitle && post_title) ? post_title : '';
			col.boxExcerpt.innerHTML = (showExcerpt && post_excerpt) ? strip(post_excerpt) : '';
			col.boxCategory.innerHTML = (showCategory && category) ? category.name : '';

			col.boxCategory.style.margin = !useImage ? '10px 0' : '';
			col.boxContent.style.display = showTitle || showExcerpt ? '' : 'none';
			col.boxContent.style.display = useCard ? '5px 10px' : '';

			col.theCol.style.width = imgWidth;
			col.theCol.style.padding = '0';

			const shareLinks = {
				facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(permalink)}`,
				twitter: `https://twitter.com/intent/tweet?url=${encodeURI(permalink)}&text=${encodeURI('Veja este interessante artigo: ' + post_title)}`,
				whatsapp: `https://api.whatsapp.com/send?text=${encodeURI(post_title + '\n' + permalink)}`,
			};

			if (showShareBtn) {
				col.boxShareToggle.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();

					if (col.boxShareBtn.classList.contains('open')) {
						col.boxShareBtn.classList.remove('open');
					} else {
						col.boxShareBtn.classList.add('open');
					}
				})

				const shareFn = (e, link) => {
					e.preventDefault();
					e.stopPropagation();

					window.open(link, '_blank')
				}

				col.boxShareFb.onclick = (e) => shareFn(e, shareLinks.facebook);
				col.boxShareTt.onclick = (e) => shareFn(e, shareLinks.twitter);
				col.boxShareWpp.onclick = (e) => shareFn(e, shareLinks.whatsapp);

				col.boxShareFb.onauxclick = (e) => shareFn(e, shareLinks.facebook);
				col.boxShareTt.onauxclick = (e) => shareFn(e, shareLinks.twitter);
				col.boxShareWpp.onauxclick = (e) => shareFn(e, shareLinks.whatsapp);
			}

			col.theCol.classList.remove('hidden');
		});

		if (wrapper.nextElementSibling) wrapper.nextElementSibling.classList.remove('loading');
	} catch (e) {
		console.error(e);
	}
}
