import { Fragment } from "react";

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
		showExcerpt,
		showTitle,
		postSelection,
		showShareBtn,
		post,
		boxID,
	} = attributes;

	return (
		<Fragment>
			<div className="row" id={boxID}>
				<div className="col">
					<div className="br-card box">
						{showShareBtn &&
							<div className="btn_wrap">
								<span>Compartilhar</span>
								<div className="container">
									<i className="fab fa-facebook-f" />
									<i className="fab fa-twitter" />
									<i className="fab fa-whatsapp" />
								</div>
							</div>
						}
						<div className="content">
							<span className="text">
								<span className="title" />
								<br/>
								<span className="excerpt" />
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* @see assets/client.esnext.js */}
			<script>
				{`
					document.addEventListener('DOMContentLoaded', function() {
						ufrSetPostBox({
							postType: '${postType}',
							postCategory: '${postCategory}',
							postTag: '${postTag}',
							boxID: '${boxID}',
							showTitle: ${showTitle},
							showExcerpt: ${showExcerpt},
							showShareBtn: ${showShareBtn},
							postSelection: '${postSelection}',
							post: ${post},
						})
					});
				`}
			</script>
		</Fragment>
	);
}
