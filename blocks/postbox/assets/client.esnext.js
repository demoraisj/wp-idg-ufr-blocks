async function ufrSetPostBox(params) {
	const {
		postType,
		postCategory,
		postTag,
		showExcerpt,
		boxID,
		postSelection,
		showTitle,
		showShareBtn,
		post,
	} = params;

	/**
	 * Faz o request e busca os posts baseado na escola de tipo, categoria e tag;
	 *
	 * @param postType
	 * @param postCategory
	 * @param postTag
	 * @param postSelection
	 * @return {Promise<any>}
	 */
	async function getPosts(postType, postCategory, postTag, postSelection) {
		const postsUrl = ufrGlobals.siteUrl + `/wp-json/wp/v2/posts?_embed=&_locale=user&per_page=1`

		switch (postType) {
			case 'all':
				switch (postSelection) {
					case 'first':
						return (await fetch(postsUrl)).json();

					case 'last':
						return (await fetch(postsUrl + '&order=asc')).json();
				}
				break;

			case 'most-seen':
				switch (postSelection) {
					case 'first':
						return (await fetch(ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=1`)).json();

					case 'last':
						return (await fetch(ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=1&order=asc`)).json();
				}
				break;

			case 'category':
				switch (postSelection) {
					case 'first':
						return (await fetch(postsUrl + `&categories=${postCategory}&quantity=1`)).json();

					case 'last':
						return (await fetch(postsUrl + `&categories=${postCategory}&quantity=1&order=asc`)).json();
				}
				break;

			case 'tag':
				switch (postSelection) {
					case 'first':
						return (await fetch(postsUrl + `&tags=${postTag}&quantity=1`)).json();

					case 'last':
						return (await fetch(postsUrl + `&tags=${postTag}&quantity=1&order=asc`)).json();
				}
				break;
		}
	}

	const box = document.getElementById(boxID).querySelector('.box');
	const boxTitle = box.querySelector('.title');
	const boxExcerpt = box.querySelector('.excerpt');
	const boxContent = box.querySelector('.content');
	const boxShareFb = box.querySelector('.fa-facebook-f');
	const boxShareTt = box.querySelector('.fa-twitter');
	const boxShareWpp = box.querySelector('.fa-whatsapp');

	let targetPost = post ?? (await getPosts(postType, postCategory, postTag, postSelection))[0];

	if (!targetPost) {
		box.innerHTML = '<div class="not-found">Nenhum post encontrado.</div>';

		return;
	}

	const { link, _embedded, thumbnail } = targetPost;
	let { excerpt, title } = targetPost;

	// Placeholder
	let img = ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';

	const embeddedImg = _embedded ? _embedded['wp:featuredmedia']?.[0]?.source_url : undefined;

	/**
	 * Existe uma diferença entre os dados obtidos, alguns atributos mudam quando obtidos por 'mais vistos' ou outro modo.
	 * Estas condicionais garante que pagamos os atributos certos em cada caso. Seja verificando o caso ou verificando a existencia deles.
	 */
	if (embeddedImg) img = embeddedImg;
	if (thumbnail) img = thumbnail;
	if (!(postType === 'most-seen') && !post) {
		title = title.rendered;
		excerpt = excerpt.rendered;
	}

	function strip(string) {
		if (!string) return '';

		string = string.replaceAll(/(<p>|<\/p>)/gm, '');
		string = string.replaceAll(/(&lt;p>|&lt;\/p>)/gm, '');
		string = string.replaceAll(/\n/gm, ' ');

		return string;
	}

	const shareLinks = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(link)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURI(link)}&text=${encodeURI('Veja este interessante artigo: ' + title)}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeURI(title + '\n' + link)}`,
	}

	box.style.backgroundImage = `url(${img})`;
	boxTitle.innerHTML = (showTitle && title) ? title : '';
	boxExcerpt.innerHTML = (showExcerpt && excerpt) ? strip(excerpt) : '';

	/**
	 * Padroniza os tamanhos dos boxes em relação a imagem de fundo.
	 *
	 * @type {string}
	 */
	box.style.height = `${box.clientWidth}px`;

	/**
	 * Atribui a altura do boxContent para a altura total disponível do box, subtraindo o tamanho do botão de
	 * compartilhar quando este estiver sendo usado.
	 * Esta ação combinada com style.css fazem com que o texto fique no final (bottom) do box.
	 *
	 * @type {string}
	 */
	boxContent.style.height = `${box.clientWidth - (showShareBtn ? 57 : 0)}px`;

	if (showShareBtn) {
		boxShareFb.onclick = () => window.open(shareLinks.facebook, '_blank');
		boxShareTt.onclick = () => window.open(shareLinks.twitter, '_blank');
		boxShareWpp.onclick = () => window.open(shareLinks.whatsapp, '_blank');

		boxShareFb.onauxclick = () => window.open(shareLinks.facebook, '_blank');
		boxShareTt.onauxclick = () => window.open(shareLinks.twitter, '_blank');
		boxShareWpp.onauxclick = () => window.open(shareLinks.whatsapp, '_blank');
	}
}
