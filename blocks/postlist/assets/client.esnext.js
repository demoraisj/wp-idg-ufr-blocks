async function ufrSetUpPostLists(params) {
	const {
		showThumbnail,
		postType,
		postCategory,
		listID,
		postsQuantity,
		postTag,
		useContainer,
		containerColor,
		useBorder,
		showExcerpt,
		margin,
		useCard,
		wpPostType,
	} = params;

	async function getPosts(postType, postCategory, postTag, postsQuantity, wpPostType) {
		const postsUrl = ufrGlobals.siteUrl + `/wp-json/wp/v2/${wpPostType}?_embed=&_locale=user&per_page=${postsQuantity}`

		switch (postType) {
			case 'most-recent':
				return (await fetch(postsUrl)).json();

			case 'most-seen':
				return (await fetch(ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=${postsQuantity}`)).json();

			case 'category':
				return (await fetch(postsUrl + `&categories=${postCategory}`)).json();

			case 'tag':
				return (await fetch(postsUrl + `&tags=${postTag}`)).json();
		}
	}

	function strip(html){
		let doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent.replaceAll('\n', ' ') || "";
	}

	function blackOrWhite(bgColor) {
		const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
		const r = parseInt(color.substring(0, 2), 16);
		const g = parseInt(color.substring(2, 4), 16);
		const b = parseInt(color.substring(4, 6), 16);
		const uicolors = [r / 255, g / 255, b / 255];
		const c = uicolors.map((col) => {
			if (col <= 0.03928) {
				return col / 12.92;
			}
			return Math.pow((col + 0.055) / 1.055, 2.4);
		});
		const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
		return (L > 0.179) ? '#000' : '#fff';
	}

	const list = document.getElementById(listID);

	const posts = await getPosts(postType, postCategory, postTag, postsQuantity, wpPostType);

	if (!posts || posts.length === 0) {
		list.innerHTML = '<div class="not-found">Nenhum post encontrado.</div>';

		return;
	}

	posts.forEach(({ link, title, _embedded, thumbnail, excerpt }) => {
		let img = ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';

		const embeddedImg = _embedded ? _embedded['wp:featuredmedia']?.[0]?.source_url : undefined;

		if (embeddedImg) img = embeddedImg;
		if (thumbnail) img = thumbnail;
		if (!(postType === 'most-seen')) {
			title = title?.rendered;
			excerpt = excerpt?.rendered;
		}

		const renderedExcerpt = showExcerpt && excerpt ? `
			<div class="col-12 excerpt">
				<span>${excerpt}</span>
			</div>` : '';

		const renderedThumbnail = showThumbnail ? `
			<div class="col-2 thumbnail"
				 style="background-image: url('${img}');"
			></div>` : '';

		const boxStyle = `
				padding: ${((useContainer || useBorder) && !showThumbnail && !showExcerpt) ? '10px 10px 25px' : '10px'};
				border-radius: ${useCard ? '' : '5px'};
				background-color: ${useContainer ? containerColor : ''};
				border: ${useBorder ? '1px solid #1351B4;' : ''};
				color: ${useContainer ? blackOrWhite(containerColor) : '#000000'};
				margin: ${margin} 0;
				${!useCard ? 'box-shadow: none;' : ''}
		`;

		const shareLinks = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(link)}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodeURI(link)}&text=${encodeURI('Veja este interessante artigo: ' + title)}`,
			whatsapp: `https://api.whatsapp.com/send?text=${encodeURI(title + '\n' + link)}`,
		}

		list.innerHTML += `
				<div class="col-12 box"
					 style="${boxStyle.replace('\n', '')}"
					 title="Clique para ler mais"
					 onclick="window.open('${link}', '_self')"
					 onauxclick="window.open('${link}', '_blank')"
				>
					<div class="row">
						${renderedThumbnail}

						<div class="col">
							<div class="row">
								<div class="col-12 title">
									<span class="title" style="${(!showExcerpt && showThumbnail) && 'line-height: 80px;'}">
										${title ?? ''}
									</span>

									<div class="btn_wrap">
        								<span>Compartilhar</span>
        								<div class="container">
            								<i class="fab fa-facebook-f"
            								   onclick="window.open('${shareLinks.facebook}', '_blank')"
            								></i>

            								<i class="fab fa-twitter"
            								   onclick="window.open('${shareLinks.twitter}', '_blank')"
            								></i>

            								<i class="fab fa-whatsapp"
            								   onclick="window.open('${shareLinks.whatsapp}', '_blank')"
            								></i>
        								</div>
        								<!-- credits: dribbble.com/YancyMin -->
    								</div>
								</div>

								${renderedExcerpt}
							</div>
						</div>
					</div>
				</div>
		`;
	})
}
