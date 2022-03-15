import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRInput, UFRCheckbox } from '../../../components/dist/index.modern';
import { useEffect } from '@wordpress/element';
import { Fragment } from 'react';
import Render from "./render";
import {v1 as uuid} from "uuid";
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
		imgWidth,
		imgHeight,
		showTitle,
		showExcerpt,
		cols,
		showShareBtn,
		useCard,
		topnewsID,
		useImage,
		jumpPosts,
		showCategory,
	} = attributes;

	if (!topnewsID) setAttributes({ topnewsID: `topnews-${uuid()}` });

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

	useEffect(() => {
		if (!isSelected) {
			// @see assets/client.esnext.js
			void window.ufrSetTopNews({
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
			});
		}
	})

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
							title="Destaques"
						/>

						<UFRInput
							label="Largura da Imagem de Destaque"
							value={imgWidth}
							attr="imgWidth"
							setter={setAttributes}
						/>

						<UFRInput
							label="Altura da Imagem de Destaque"
							value={imgHeight}
							attr="imgHeight"
							setter={setAttributes}
						/>

						<UFRInput
							label="Colunas (quantidade de destaques)"
							type="number"
							value={cols}
							attr="cols"
							setter={setAttributes}
						/>

						<UFRInput
							label="Pular posts"
							type="number"
							value={jumpPosts}
							attr="jumpPosts"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar botão de compartilhamento"
							checked={showShareBtn}
							attr="showShareBtn"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar título"
							checked={showTitle}
							attr="showTitle"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar resumo"
							checked={showExcerpt}
							attr="showExcerpt"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar categoria"
							checked={showCategory}
							attr="showCategory"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Imagem"
							checked={useImage}
							attr="useImage"
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
							label="Posição Horizontal do Destaques"
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
