/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
import { Fragment } from 'react';

export default function Render({ attributes }) {
	const { items, single } = attributes;

	const renderedItems = items
		? JSON.parse(items).map(({ text, link, children }) => (
				<Fragment>
					<div className="item">
						<button className="header" type="button">
							<span className="icon">
								<i className="fas fa-angle-down" />
							</span>
							<span className="title">{text}</span>
						</button>
					</div>
					<div className="content">
						{link && (
							<div className="img">
								<img src={link} alt="" />
							</div>
						)}

						{children.map((child) => (
							<div className="child">
								{child.link && (
									<div className="img">
										<img src={child.link} alt="" />
									</div>
								)}

								<p>{child.text}</p>
							</div>
						))}
					</div>
				</Fragment>
		  ))
		: '';

	return (
		<div className="br-accordion" single={single}>
			{renderedItems}
		</div>
	);
}
