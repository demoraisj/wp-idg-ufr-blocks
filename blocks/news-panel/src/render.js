/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({preview, attributes}) {
	const { panelID, showShareBtn } = attributes;

	return (
		<div className="br-card p-2" data-panel={panelID}>
			<div className="row d-flex align-items-center h-100">
				<div className="col-lg-7 col-sm-12">
					<div className="panel-box">
						{showShareBtn &&
							<div className="btn_wrap share-btn-box">
								<span>Compartilhar</span>
								<div className="container">
									<i className="fab fa-facebook-f"/>
									<i className="fab fa-twitter"/>
									<i className="fab fa-whatsapp"/>
								</div>
							</div>
						}
						<div className="content">
							<span className="text">
								<span className="title"/>
								<br/>
								<span className="excerpt"/>
							</span>
						</div>
					</div>
				</div>

				<div className="col-lg-5 col-sm-12">
					<div className="row d-flex align-items-center h-100">
						<div className="panel-list" />
					</div>
				</div>
			</div>
		</div>
	);
}
