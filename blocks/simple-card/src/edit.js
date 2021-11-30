import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRInput, UFRTextarea, UFRIconPicker, UFRCheckbox } from 'wp-idg-ufr__block-components';
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
	const { position, title, description, icon, link, target } = attributes;

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
							title="Cartão Simples"
							description="Configure a aparenência do Cartão Simples abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRInput
							label="Título"
							value={title}
							attr="title"
							setter={setAttributes}
						/>

						<UFRInput
							label="Link para navegar ao clicar (opcional)"
							value={link}
							attr="link"
							setter={setAttributes}
						/>

						<UFRTextarea
							label="Descrição"
							value={description}
							attr="description"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Abrir link em uma nova aba?"
							checked={target}
							valWhenChecked="_blank"
							valWhenUnchecked="_self"
							attr="target"
							setter={ setAttributes }
						/>

						<UFRIconPicker setter={setAttributes} value={icon} />
					</div>

					<div className="row preview">
						<Render attributes={attributes} />
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
							label="Posição Horizontal do Cartão Simples"
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
