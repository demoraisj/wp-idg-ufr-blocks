import {Fragment} from "react";

/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({ preview, attributes }) {
	const {
		postType,
		postCategory,
		postTag,
		listID,
		useContainer,
		containerColor,
		postsQuantity,
		showThumbnail,
		useBorder,
		showExcerpt,
		useCard,
		margin,
	} = attributes;

	return (
		<Fragment>
			<div className="row" id={listID} />

			{/* @see assets/client.esnext.js */}
			<script>
				{`
					document.addEventListener('DOMContentLoaded', function(){
						ufrSetUpPostLists({
							postType: '${postType}',
							postCategory: '${postCategory}',
							postTag: '${postTag}',
							listID: '${listID}',
							postsQuantity: ${postsQuantity},
							showThumbnail: ${showThumbnail},
							useContainer: ${useContainer},
							containerColor: '${containerColor}',
							useBorder: ${useBorder},
							showExcerpt: ${showExcerpt},
							margin: '${margin}',
							useCard: ${useCard},
						})
					});
				`}
			</script>
		</Fragment>
	);
}
