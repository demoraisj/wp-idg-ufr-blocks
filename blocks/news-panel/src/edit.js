import { useBlockProps } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRCheckbox } from '../../../components/dist/index.modern';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Fragment } from 'react';
import Render from "./render";
import { v1 as uuid } from "uuid";
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
		postType,
		postCategory,
		postTag,
		panelID,
		showExcerpt,
		wpPostType,
		showShareBtn,
	} = attributes;

	const [wpPostTypeOptions, setWpPostTypeOptions] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const postTypeOptions = [
		{ label: 'Mais recentes', value: 'most-recent' },
		{ label: 'Mais visitados', value: 'most-seen' },
		{ label: 'Por categoria', value: 'category' },
		{ label: 'Por tag', value: 'tag' },
	];

	if (!panelID) setAttributes({ panelID: `panel-${uuid()}` });

	useEffect(() => {
		const optionsToGet = [
			{
				attr: 'wpPostType',
				path: '/wp/v2/types',
				set: setWpPostTypeOptions,
			},
			{
				attr: 'postCategory',
				path: '/wp/v2/categories',
				set: setCategoryOptions,
			},
			{
				attr: 'postTag',
				path: '/wp/v2/tags',
				set: setTagOptions,
			},
		];

		optionsToGet.forEach(({ path, set, attr }) => {
			apiFetch({ path }).then((res) => {
				if (!Array.isArray(res)) {
					const exclude = ['attachment', 'page', 'wp_block', 'wp_template'];

					res = Object.values(res).filter((item) => !exclude.includes(item?.slug));
				}

				const options = res.map((item) => ({
					label: item.name === 'post' ? 'posts' : item.name,
					value: item?.id ?? item?.slug,
				}));

				set(options);
			})
		});
	}, [postType]);

	useEffect(() => {
		if (postType === 'category' && !postCategory) setAttributes({ postCategory: categoryOptions[0].value });
		if (postType === 'tag' && !postTag) setAttributes({ postTag: tagOptions[0].value });
	}, [postType, categoryOptions, tagOptions]);

	useEffect(() => {
		if (!isSelected) {
			console.log(postType)
			// @see assets/client.esnext.js
			window.ufrSetNewsPanel({
				postType,
				postCategory,
				postTag,
				panelID,
				showExcerpt,
				wpPostType,
				showShareBtn,
			});
		}
	}, [isSelected])

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
							title="Painel de Notícias"
							description="Configure a aparenência do Painel de Notícias abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRSelect
							label="Tipo de Postagens"
							options={wpPostTypeOptions}
							value={wpPostType}
							attr="wpPostType"
							setter={setAttributes}
						/>

						<UFRSelect
							label="Selecionar Postagens Por"
							options={postTypeOptions}
							value={postType}
							attr="postType"
							setter={setAttributes}
						/>

						{/* Nos selects abaixo, por alguma razão os componentes do pacote 'wp-idg-ufr__block-components' causam problemas e foram substituídos por lógica local. */}

						{postType === 'category' &&
							<select value={postCategory} onChange={(e) => setAttributes({ postCategory: e.target.value })}>
								{categoryOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
							</select>
						}

						{postType === 'tag' &&
							<select value={postTag} onChange={(e) => setAttributes({ postTag: e.target.value })}>
								{tagOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
							</select>
						}

						<UFRCheckbox
							label="Mostrar Botão de Compartilhar"
							checked={showShareBtn}
							attr="showShareBtn"
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

	return (
		<Fragment>
			{ConditionalMainContentRender(isSelected)}
		</Fragment>
	);
}
