/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({attributes}) {
	const {
		showShareBtn,
		topnewsID,
		showExcerpt,
		showTitle,
		cols,
		imgWidth,
		imgHeight,
		useCard,
		useImage,
		jumpPosts,
		showCategory,
	} = attributes;

	let columns = [];

	for (let i = 1; i < Number(cols) + 1; i++) {
		columns.push(
			<>
				<div className={`col-sm-12 col-md-auto ${useCard ? 'br-card' : ''} topnews hidden top-news-number-${i}`}>
					<div className="row">
						<div className="col-12 box-col">
							{useImage && <div className="img-container" />}

							{showShareBtn &&
								<div className="social-links">
									<a className="option facebook" title="Facebook">
										<span className="fab fa-facebook-f"/>
									</a>
									<a className="option twitter" title="Twitter">
										<span className="fab fa-twitter"/>
									</a>
									<a className="option whatsapp" title="Whatsapp">
										<span className="fab fa-whatsapp"/>
									</a>

									<a href="#" className="toggle-social-links">
										<span className="fas fa-share-alt"/>
										<span className="fas fa-times"/>
									</a>
								</div>
							}
						</div>
					</div>

					<div className="row content">
						<div className="col-12">
							<p className="category" />
							<p className="title" style={useImage ? {} : { width: '80%', textAlign: 'justify' }} />
							<p className="excerpt" />
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="row d-flex justify-content-center" id={topnewsID}>
				{columns}

				{/* @see assets/client.esnext.js */}
				<script>
					{`
					document.addEventListener('DOMContentLoaded', function() {
						ufrSetTopNews({
							topnewsID: '${topnewsID}',
							showTitle: ${showTitle},
							showExcerpt: ${showExcerpt},
							showShareBtn: ${showShareBtn},
							cols: ${cols},
							imgWidth: '${imgWidth}',
							imgHeight: '${imgHeight}',
							useCard: ${useCard},
							useImage: ${useImage},
							jumpPosts: ${jumpPosts},
							showCategory: ${showCategory},
						})
					});
				`}
				</script>
			</div>

			<div className="loading text-center" />
		</>
	);
}
