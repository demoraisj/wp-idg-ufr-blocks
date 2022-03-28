/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({ attributes }) {
	const {
		backgroundImage,
		text,
		textPositionX,
		textPositionY,
		textColor,
		textSize,
		width,
		height,
		font,
		fontUrl,
		padding,
		link,
	} = attributes;

	let justifyContent = '';
	let alignItems = '';
	let textAlign = '';

	switch (textPositionX) {
		case 'left':
			justifyContent = 'flex-start';
			textAlign = 'left';
			break;
		case 'center':
			justifyContent = 'center';
			textAlign = 'center';
			break;
		case 'right':
			justifyContent = 'flex-end';
			textAlign = 'right';
			break;
		default:
			justifyContent = 'center';
			textAlign = 'center';
			break;
	}

	switch (textPositionY) {
		case 'top':
			alignItems = 'flex-start';
			break;
		case 'center':
			alignItems = 'center';
			break;
		case 'bottom':
			alignItems = 'flex-end';
			break;
		default:
			alignItems = 'center';
			break;
	}

	const style = {
		container: {
			backgroundImage: `url(${backgroundImage?.url})`,
			justifyContent,
			alignItems,
			textAlign,
			padding,
		},

		text: {
			color: textColor,
			fontFamily: font,
			fontSize: textSize,
		},
	}

	return (
		<>
			<style>{`@font-face { font-family: ${font}; src: url(${fontUrl}); }`}</style>

			<a href={link} target="_blank" rel="noopener">
				<div
					className="banner-container"
					style={style.container}
					data-width={width}
					data-height={height}
				>
					<div className="text">
						<span className="main-text" style={style.text}>{text}</span>
					</div>
				</div>
			</a>
		</>
	);
}
