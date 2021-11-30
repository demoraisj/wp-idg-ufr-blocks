import { useBlockProps } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRCheckbox, UFRInput } from 'wp-idg-ufr__block-components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Fragment } from 'react';
import Render from "./render";
import './editor.scss';
import { v1 as uuid } from "uuid";

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
		listID,
		useContainer,
		containerColor,
		postsQuantity,
		showThumbnail,
		useBorder,
		useCard,
		showExcerpt,
		margin,
	} = attributes;

	const [categoryOptions, setCategoryOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const postTypeOptions = [
		{ label: 'Mais recentes', value: 'most-recent' },
		{ label: 'Mais visitados', value: 'most-seen' },
		{ label: 'Por categoria', value: 'category' },
		{ label: 'Por tag', value: 'tag' },
	];

	if (!listID) setAttributes({ listID: `list-${uuid()}` });

	useEffect(() => {
		const optionsToGet = [
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
				const options = res.map((item) => ({
					label: item.name,
					value: item.id,
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
			// @see assets/client.esnext.js
			window.ufrSetUpPostLists({
				postType,
				postCategory,
				postTag,
				postsQuantity,
				showThumbnail,
				useContainer,
				containerColor,
				useBorder,
				useCard,
				showExcerpt,
				listID,
				margin,
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
							title="Lista de Postagens"
							description="Configure a aparenência do postlist abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRSelect
							label="Tipo de Postagens"
							options={postTypeOptions}
							value={postType}
							attr="postType"
							setter={setAttributes}
						/>

						<UFRInput
							label="Quantidade de Postagens"
							value={postsQuantity}
							attr="postsQuantity"
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

						<h3>Configurações Opcionais</h3>

						<UFRInput
							label="Espaço Entre os Items"
							value={margin}
							attr="margin"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Imagem de Destaque"
							checked={showThumbnail}
							attr="showThumbnail"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Resumo da Postagem"
							checked={showExcerpt}
							attr="showExcerpt"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver item com um Cartão"
							checked={useCard}
							attr="useCard"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver item com uma Borda"
							checked={useBorder}
							attr="useBorder"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver item em um Bloco Colorido"
							checked={useContainer}
							attr="useContainer"
							setter={setAttributes}
						/>

						{useContainer &&
							<UFRInput
								label="Cor de Fundo do Bloco Envolvente"
								value={containerColor}
								type="color"
								attr="containerColor"
								setter={setAttributes}
							/>
						}
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
