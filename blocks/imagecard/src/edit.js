import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRInput, UFRGaleryBtn } from '../../components/dist/index.modern';
import { Fragment } from 'react';
import Render from "./render";
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
	const { position, img, height, text, fontColor, link } = attributes;

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
							title="Cartão com Imagem"
						/>

						<UFRGaleryBtn
							text="Selecionar Imagem de Fundo"
							icon="fa fa-picture-o"
							allowedTypes={['image']}
							value={img}
							attr="img"
							setter={setAttributes}
						/>

						<UFRInput
							label="Texto"
							value={text}
							attr="text"
							setter={setAttributes}
						/>

						<UFRInput
							label="Link"
							value={link}
							attr="link"
							setter={setAttributes}
						/>

						<UFRInput
							label="Altura do Cartão"
							value={height}
							attr="height"
							setter={setAttributes}
						/>

						<UFRInput
							label="Texto"
							type="color"
							value={fontColor}
							attr="fontColor"
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
					<div className="col">
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
							label="Posição Horizontal do Cartão com Imagem"
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
