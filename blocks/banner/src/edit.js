import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRInput, UFRCheckbox, UFRTextarea, UFRGaleryBtn } from '../../components/dist/index.modern';
import { Fragment } from 'react';
import { useState, useEffect } from '@wordpress/element';
import Render from "./render";
import fontList from '../assets/gfonts.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({ attributes, setAttributes, isSelected }) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const {
		position,
		backgroundImage,
		text,
		textPositionX,
		textPositionY,
		textColor,
		textSize,
		width,
		height,
		useCard,
		font,
		fontVariant,
		padding,
		link,
	} = attributes;

	const [fontOptions, setFontOptions] = useState([]);
	const [fontVariantOptions, setFontVariantOptions] = useState([]);
	const [loadingFonts, setLoadingFonts] = useState(true);

	/**
	 * Opções para configuração de posição do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const positioningOptions = [
		{ label: 'Esquerda', value: 'start' },
		{ label: 'Centro', value: 'center' },
		{ label: 'Direita', value: 'end' },
	];

	const textPositionXOptions = [
		{ label: 'Esquerda', value: 'left' },
		{ label: 'Centro', value: 'center' },
		{ label: 'Direita', value: 'right' },
	];

	const textPositionYOptions = [
		{ label: 'Topo', value: 'top' },
		{ label: 'Meio', value: 'middle' },
		{ label: 'Baixo', value: 'bottom' },
	];

	useEffect(() => {
		window.setBannerSizeAndVisibility();
	});

	useEffect(() => {
		const parseFontOptions = () => new Promise((resolve) => {
			const options = fontList.map(font => ({
				label: font.family,
				value: font.family,
			}));

			resolve(options);
		});

		parseFontOptions().then((options) => {
			setFontOptions(options);
			setLoadingFonts(false);
		});
	}, []);

	useEffect(() => {
		if (font && font.length > 0) {
			const findedFont = fontList.find(({ family }) => family === font);

			if (findedFont) {
				const fontVariants = findedFont.variants.map((variant) => ({
					label: variant,
					value: variant,
				}));

				setFontVariantOptions(fontVariants);
				setAttributes({ fontVariant: fontVariants[0].value });
			}
		}
	}, [font]);

	useEffect(() => {
		if (fontVariant && fontVariant.length > 0) {
			const fontObject = fontList.find(({ family }) => family === font);
			const fontUrl = fontObject ? fontObject.files[fontVariant] : '';

			setAttributes({ fontUrl });
		}
	}, [font, fontVariant]);


	/**
	 * Renderiza o conteúdo. Esconde as configurações do bloco quando ele não está selecionado.
	 *
	 * @param { boolean } selected
	 * @return {JSX.Element} Elemento principal condicional
	 */
	function ConditionalMainContentRender(selected) {
		return selected ? (
			// Visuzalização quando selecionado
			<div
				{...useBlockProps({
					className: 'edit block-responsive ufr-block-component',
				})}
			>
				<div className="row align-items-center">
					<div className="col config">
						<UFRBlockHeader
							title="Banner"
						/>

						<UFRGaleryBtn
							text="Selecionar Imagem de Fundo"
							icon="fa fa-picture-o"
							allowedTypes={['image']}
							value={backgroundImage}
							attr={'backgroundImage'}
							setter={setAttributes}
						/>

						<UFRInput
							label="Largura do Banner (pixels)"
							type="number"
							value={width}
							attr="width"
							setter={setAttributes}
						/>

						<UFRInput
							label="Altura do Banner (pixels)"
							type="number"
							value={height}
							attr="height"
							setter={setAttributes}
						/>

						<UFRInput
							label="Link"
							value={link}
							attr="link"
							setter={setAttributes}
						/>

						<UFRTextarea
							label="Texto principal (Multiplas linhas)"
							rows="5"
							value={text}
							attr="text"
							setter={setAttributes}
						/>

						<UFRSelect
							label="Posição Horizintal do Texto"
							options={textPositionXOptions}
							value={textPositionX}
							attr="textPositionX"
							setter={setAttributes}
						/>

						<UFRSelect
							label="Posição Vertical do Texto"
							options={textPositionYOptions}
							value={textPositionY}
							attr="textPositionY"
							setter={setAttributes}
						/>

						{loadingFonts ? (
							<>
								<br/>
								<span>Carregando Fontes...</span>
								<br/>
							</>
						): (
							<>
								<UFRSelect
									label="Fonte"
									options={fontOptions}
									value={font}
									attr="font"
									setter={setAttributes}
								/>

								{font && font.length > 0 && (
									<UFRSelect
										label="Variante da Fonte"
										options={fontVariantOptions}
										value={fontVariant}
										attr="fontVariant"
										setter={setAttributes}
									/>
								)}
							</>
						)}

						<UFRInput
							label="Cor da Fonte"
							type="color"
							value={textColor}
							attr="textColor"
							setter={setAttributes}
						/>

						<UFRInput
							label="Tamanho da Fonte"
							value={textSize}
							attr="textSize"
							setter={setAttributes}
						/>

						<UFRInput
							label="Margem (topo direita base esquerda)"
							value={padding}
							attr="padding"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Usar Cartão"
							checked={useCard}
							attr="useCard"
							setter={setAttributes}
						/>
					</div>
				</div>
			</div>
		) : (
			// Visuzalização quando não selecionado
			<div
				{...useBlockProps({
					className: 'show block-responsive ufr-block-component',
				})}
			>
				<div className="row">
					<div
						className={`col-12 d-flex justify-content-${position}`}
					>
						<Render attributes={attributes} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			<InspectorControls key="setting">
				<div id="ufrControls">
					<fieldset>
						<UFRSelect
							label="Posição Horizontal do Banner"
							options={positioningOptions}
							value={position}
							attr="position"
							setter={setAttributes}
						/>
					</fieldset>
				</div>
			</InspectorControls>

			{ConditionalMainContentRender(isSelected)}
		</Fragment>
	);
}
