async function ufrSetNewsPanel(params) {
	const {
		postType,
		postCategory,
		postTag,
		showExcerpt,
		showShareBtn,
		panelID,
		wpPostType,
	} = params;

	async function getPosts(postType, postCategory, postTag, wpPostType) {
		const postsUrl =
			window.ufrGlobals.siteUrl +
			`/wp-json/wp/v2/${wpPostType}?_embed=&_locale=user&per_page=5`;

		switch (postType) {
			case 'most-recent':
				return (await fetch(postsUrl)).json();

			case 'most-seen':
				return (
					await fetch(
						window.ufrGlobals.siteUrl +
						`/wp-json/ufr/most-seen-posts?quantity=5`
					)
				).json();

			case 'category':
				return (
					await fetch(postsUrl + `&categories=${postCategory}`)
				).json();

			case 'tag':
				return (await fetch(postsUrl + `&tags=${postTag}`)).json();
		}
	}

	const posts = await getPosts(postType, postCategory, postTag, wpPostType);

	function populateTheBox() {
		const panelBox = document
			.querySelector(`[data-panel='${panelID}']`)
			.querySelector('.panel-box');
		const panelBoxTitle = panelBox.querySelector('.title');
		const panelBoxExcerpt = panelBox.querySelector('.excerpt');
		const panelBoxContent = panelBox.querySelector('.content');
		const panelBoxShareFb = panelBox.querySelector('.fa-facebook-f');
		const panelBoxShareTt = panelBox.querySelector('.fa-twitter');
		const panelBoxShareWpp = panelBox.querySelector('.fa-whatsapp');

		if (!posts || posts.length === 0) {
			panelBox.innerHTML =
				'<div class="not-found">Nenhum post encontrado.</div>';

			return;
		}
		if (window.ufrGlobals.isMobile) {
			panelBox.style.width = '90vw';
			panelBox.style.height =
				((panelBox.clientWidth * 60.9) / 100).toString() + 'px';
		} else {
			panelBox.style.width = '750px';
			panelBox.style.height = '390px';
		}

		const { link, _embedded, thumbnail } = posts[0];
		let { excerpt, title } = posts[0];

		// Placeholder
		let img = window.ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';

		const embeddedImg = _embedded
			? _embedded['wp:featuredmedia']?.[0]?.source_url
			: undefined;

		/**
		 * Existe uma diferença entre os dados obtidos, alguns atributos mudam quando obtidos por 'mais vistos' ou outro modo.
		 * Estas condicionais garante que pegamos os atributos certos em cada caso. Seja verificando o caso ou verificando a existencia deles.
		 */
		if (embeddedImg) img = embeddedImg;
		if (thumbnail) img = thumbnail;
		if (!(postType === 'most-seen')) {
			title = title?.rendered;
			excerpt = excerpt?.rendered;
		}

		function strip(string) {
			if (!string) return '';

			string = string.replaceAll(/(<p>|<\/p>)/gm, '');
			string = string.replaceAll(/(&lt;p>|&lt;\/p>)/gm, '');
			string = string.replaceAll(/\n/gm, ' ');

			return string;
		}

		const shareLinks = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
				link.replace('&#038;', '&')
			)}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodeURI(
				link.replace('&#038;', '&')
			)}&text=${encodeURI('Veja este interessante artigo: ' + title)}`,
			whatsapp: `https://api.whatsapp.com/send?text=${encodeURI(
				title + '\n' + link.replace('&#038;', '&')
			)}`,
		};

		panelBox.style.backgroundImage = `url(${img})`;
		panelBoxTitle.innerHTML = title ?? '';
		panelBoxExcerpt.innerHTML =
			showExcerpt && excerpt ? strip(excerpt) : '';

		if (showShareBtn) {
			panelBoxShareFb.onclick = () =>
				window.open(shareLinks.facebook, '_blank');
			panelBoxShareTt.onclick = () =>
				window.open(shareLinks.twitter, '_blank');
			panelBoxShareWpp.onclick = () =>
				window.open(shareLinks.whatsapp, '_blank');

			panelBoxShareFb.onauxclick = () =>
				window.open(shareLinks.facebook, '_blank');
			panelBoxShareTt.onauxclick = () =>
				window.open(shareLinks.twitter, '_blank');
			panelBoxShareWpp.onauxclick = () =>
				window.open(shareLinks.whatsapp, '_blank');
		}

		panelBox.onclick = () =>
			window.open(link.replace('&#038;', '&'), '_self');
		panelBox.onauxclick = () =>
			window.open(link.replace('&#038;', '&'), '_blank');
	}

	function populateTheList() {
		const panelList = document
			.querySelector(`[data-panel='${panelID}']`)
			.querySelector('.panel-list');

		if (!posts || posts.length === 0) {
			panelList.innerHTML =
				'<div class="not-found">Nenhum post encontrado.</div>';

			return;
		}

		posts.forEach(({ link, title, _embedded, excerpt }, index) => {
			if (index === 0) return (panelList.innerHTML += '<hr/>');

			if (!(postType === 'most-seen')) {
				title = title?.rendered;
				excerpt = excerpt?.rendered;
			}

			const renderedExcerpt =
				showExcerpt && excerpt
					? `
			<div class="col-12 excerpt">
				<span>${excerpt}</span>
			</div>`
					: '';

			const shareLinks = {
				facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
					link
				)}`,
				twitter: `https://twitter.com/intent/tweet?url=${encodeURI(
					link
				)}&text=${encodeURI(
					'Veja este interessante artigo: ' + title
				)}`,
				whatsapp: `https://api.whatsapp.com/send?text=${encodeURI(
					title + '\n' + link
				)}`,
			};

			const shareBtn = `
			<div class="col-2 btn-col">
				<div class="btn_wrap">
        			<span>Compartilhar</span>
        			<div class="container">
            			<i class="fab fa-facebook-f"
            			   onclick="window.open('${shareLinks.facebook}', '_blank')"
            			   onauxclick="window.open('${shareLinks.facebook}', '_blank')"
            			></i>

            			<i class="fab fa-twitter"
            			   onclick="window.open('${shareLinks.twitter}', '_blank')"
            			   onauxclick="window.open('${shareLinks.twitter}', '_blank')"
            			></i>

            			<i class="fab fa-whatsapp"
            			   onclick="window.open('${shareLinks.whatsapp}', '_blank')"
            			   onauxclick="window.open('${shareLinks.whatsapp}', '_blank')"
            			></i>
        			</div>
        			<!-- credits: dribbble.com/YancyMin -->
    			</div>
			</div>
		`;

			panelList.innerHTML += `
				<div class="col-12 box"
					 title="Clique para ler mais"
					 onclick="window.open('${link}', '_self')"
					 onauxclick="window.open('${link}', '_blank')"
				>
					<div class="row">
						<div class="col">
							<div class="row">
								<div class="col-12 title">
									<div class="row">
										<div class="col">
											<span class="title">
												${title ?? ''}
											</span>
										</div>

										${window.ufrGlobals.isMobile ? '' : shareBtn}
									</div>
								</div>

								${renderedExcerpt}
							</div>
						</div>
					</div>
				</div>

				<hr />
		`;
		});
	}

	populateTheBox();
	populateTheList();
}
