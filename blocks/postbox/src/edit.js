import { useBlockProps } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRCheckbox } from 'wp-idg-ufr__block-components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Fragment } from 'react';
import Render from "./render";
import './editor.scss';
import {v1 as uuid} from "uuid";

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
		showExcerpt,
		showTitle,
		boxID,
		postSelection,
		showShareBtn,
		post,
	} = attributes;

	const [categoryOptions, setCategoryOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);
	const [postOptions, setPostOptions] = useState([]);

	const postTypeOptions = [
		{ label: 'Todos os posts', value: 'all' },
		{ label: 'Mais visitados', value: 'most-seen' },
		{ label: 'Por categoria', value: 'category' },
		{ label: 'Por tag', value: 'tag' },
	];

	const postSelectionOptions = [
		{ label: 'A postagem mais recente deste tipo', value: 'first' },
		{ label: 'A postagem mais antiga deste tipo', value: 'last' },
		{ label: 'Escolher uma postagem manualmente', value: 'pick' },
	];

	if (!boxID) setAttributes({ boxID: `box-${uuid()}` });

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
	}, []);

	useEffect(() => {
		if (postType === 'category' && !postCategory) setAttributes({ postCategory: categoryOptions[0].value });
		if (postType === 'tag' && !postTag) setAttributes({ postTag: tagOptions[0].value });
	}, [postType, categoryOptions, tagOptions]);

	useEffect(() => {
		if (postSelection === 'pick') {
			let path = '/wp/v2/posts?_embed=&_locale=user';

			switch (postType) {
				case 'most-seen':
					path = '/ufr/most-seen-posts'
					break;

				case 'category':
					path += `&categories=${postCategory}`
					break;

				case 'tag':
					path += `&tags=${postTag}`
					break;
			}

			apiFetch({ path }).then((res) => {
                const options = res.map((item) => {
	                const value = {
		                link: item.link ?? null,
		                _embedded: item._embedded ?? null,
		                thumbnail: item.thumbnail ?? null,
		                excerpt: item.excerpt?.rendered ?? item?.excerpt ?? null,
		                title: item.title?.rendered ?? item?.title ?? null,
	                };

					return {
						label: `${item.title?.rendered ?? item.title} - ${new Date(item.date).toLocaleDateString()} - ${item.status === 'publish' ? 'Publicado' : 'Não-publicado'}`,
						value: JSON.stringify(value),
					}
                });

                setPostOptions(options);

				if (!post) setAttributes({ post: options[0].value });
            })
		}
	}, [postSelection, postType, postCategory, postTag]);

	useEffect(() => {
		if (!isSelected) {
			// @see assets/client.esnext.js
			window.ufrSetPostBox({
				postType,
				postCategory,
				postTag,
				showTitle,
				showShareBtn,
				showExcerpt,
				boxID,
				postSelection,
				post: (postSelection === 'pick' && post) ? JSON.parse(post) : null,
			});
		}
	}, [isSelected]);

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
							title="Caixa de Postagem"
							description="Configure a aparenência abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRSelect
							label="Tipo de Postagens"
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

						<UFRSelect
							label="Seleção de Postagem"
							options={postSelectionOptions}
							value={postSelection}
							attr="postSelection"
							setter={setAttributes}
						/>

						{postSelection === 'pick' && <UFRSelect
							label="Selecione um Post da Lista"
							options={postOptions}
							value={post}
							attr="post"
							setter={setAttributes}
						/>}

						<h3>Configurações Opcionais</h3>

						<UFRCheckbox
							label="Mostrar título da postagem"
							checked={showTitle}
							attr="showTitle"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Resumo da Postagem"
							checked={showExcerpt}
							attr="showExcerpt"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Botão para Compartilhar"
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
