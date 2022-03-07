/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({preview, attributes}) {
	const { collapsed, items, title, icon, target } = attributes;

	const parsedItem = JSON.parse(items);

	return (
		<div className="br-card w-100">
			<div className="row heading py-1">
				<div className="col" />

				<div className="col title text-nowrap text-center font-weight-bold">
					<i className={`mr-3 ${icon}`} />
					<span>{title}</span>
				</div>

				<div className="col arrow d-flex justify-content-end align-items-center">
					<i className={`float-right mr-3 fas ${collapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`} />
				</div>
			</div>

			<div className={`row content mt-2 ${collapsed ? 'closed' : ''}`}>
				<div className="col">
					<div className="br-list" role="list">
						{parsedItem.map((item, index) => (
							<>
								<div
									className="align-items-center br-item py-3"
									role="listitem"
									onclick={`window.open('${item.link}', '${target}')`}
									onauxclick={`window.open('${item.link}', '_blank')`}
								>
									<div className="row align-items-center">
										<div className="col-auto number">{index + 1}</div>
										<div className="col">{item.text}</div>
										<div className="col-auto" />
									</div>
								</div>

								<span className="br-divider" />
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
