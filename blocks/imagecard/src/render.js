/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({ attributes }) {
	const { height, img, text, link, fontColor } = attributes;

	const style = {
		tile: {
			height,
			maxHeight: height,
		},

		img: {
			height: height,
		},

		txt: {
			color: fontColor,
		},
	};

	return (
		<div className="tile" style={style.tile}>
			<a href={link}  target="_blank" rel="noopener">
				<p style={style.txt}>{text}</p>
			</a>

			<a href={link} target="_blank" rel="noopener">
				<img
					src={img?.url}
					alt={img?.alt ?? img?.caption ?? img?.description ?? img?.title ?? img?.name ?? 'Imagem do Bloco'}
					style={style.img}
				/>
			</a>
		</div>
	);
}
