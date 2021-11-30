import { useBlockProps } from '@wordpress/block-editor';
import {
	UFRBlockHeader,
	UFRListBuilder,
	UFRCheckbox,
} from 'wp-idg-ufr__block-components';
import { Fragment } from 'react';
import Render from './render';
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
	const { items, single } = attributes;

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
							title="Acordeão"
							description="Configure a aparenência do acordeão abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRListBuilder
							items={items}
							attr="items"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Permitir Abrir Mais de um Item Por Vez"
							checked={single}
							attr="single"
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
					<div className="col-12">
						<Render attributes={attributes} />
					</div>
				</div>
			</div>
		);
	}

	return <Fragment>{ConditionalMainContentRender(isSelected)}</Fragment>;
}
