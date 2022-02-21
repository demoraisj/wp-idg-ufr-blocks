import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	UFRBlockHeader,
	UFRInput,
	UFRSelect,
	UFRIconPicker,
	UFRCheckbox,
} from '../../../components/dist/index.modern';
import './editor.scss';
import { Fragment } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit( { attributes, setAttributes, isSelected } ) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const { type, style, size, text, icon, position, link, blank } = attributes;

	/**
	 * Classe do ícone do botão. Contem margem quando o ícone é acompanhado de texto
	 *
	 * @type {string}
	 */
	const iconClassName = `${ icon } ${ text.length !== 0 ? 'mr-1' : '' }`;

	/**
	 * Opções para a seleção de um tipo de botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const typeOptions = [
		{
			label: 'Padrão',
			value: '',
		},
		{
			label: 'Circular',
			value: 'circle',
		},
		{
			label: 'Bloco (Ocupa todo o espaço horizontal disponível)',
			value: 'block',
		},
	];

	/**
	 * Opções para a seleção de um estilo de botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const styleOptions = [
		{
			label: 'Cores Principais',
			value: 'primary',
		},
		{
			label: 'Cores Secundárias',
			value: 'secondary',
		},
		{
			label: 'Fundo Transparente',
			value: '',
		},
	];

	/**
	 * Opções para a seleção do tamanho do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const sizeOptions = [
		{
			label: 'Médio',
			value: '',
		},
		{
			label: 'Pequeno',
			value: 'small',
		},
		{
			label: 'Grande',
			value: 'large',
		},
	];

	/**
	 * Opções para configuração de posição do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const positioningOptions = [
		{
			label: 'Esquerda',
			value: 'start',
		},
		{
			label: 'Centro',
			value: 'center',
		},
		{
			label: 'Direita',
			value: 'end',
		},
	];

	/**
	 * Renderiza o conteúdo. Esconde as configurações do bloco quando ele não está selecionado.
	 *
	 * @param { boolean } selected
	 * @return {JSX.Element} Elemento principal condicional
	 */
	function ConditionalMainContentRender( selected ) {
		return selected ? (
			// Visuzalização quando selecionado
			<div
				{ ...useBlockProps( {
					className: 'edit block-responsive ufr-block-component',
				} ) }
			>
				<div className="row align-items-center">
					<div className="col config">
						<UFRBlockHeader
							title="Botão"
						/>

						<UFRSelect
							label="Escolha o Tipo do Botão"
							options={ typeOptions }
							value={ type }
							attr="type"
							setter={ setAttributes }
						/>

						<UFRSelect
							label="Escolha o Estilo do Botão"
							options={ styleOptions }
							value={ style }
							attr="style"
							setter={ setAttributes }
						/>

						<UFRSelect
							label="Escolha o Tamanho do Botão"
							options={ sizeOptions }
							value={ size }
							attr="size"
							setter={ setAttributes }
						/>

						<UFRInput
							label="Texto do Botão"
							value={ text }
							attr="text"
							setter={ setAttributes }
						/>

						<UFRInput
							label="Link para Navegar ao Clicar"
							value={ link }
							attr="link"
							setter={ setAttributes }
						/>

						<UFRCheckbox
							label="Abrir link em uma nova página?"
							checked={ blank }
							attr="blank"
							setter={ setAttributes }
						/>

						<UFRIconPicker
							setter={ setAttributes }
							value={ icon }
						/>
					</div>
				</div>
			</div>
		) : (
			// Visuzalização quando não selecionado
			<div
				{ ...useBlockProps( {
					className: 'show block-responsive ufr-block-component',
				} ) }
			>
				<div className="row">
					<div
						className={ `col-12 d-flex justify-content-${ position }` }
					>
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							className={ `br-button ${ type } ${ style } ${ size }` }
							type="button"
							href="javascript:void(0)"
						>
							<i className={ iconClassName } />
							{ text }
						</a>
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
							label="Posição Horizontal do Botão"
							options={ positioningOptions }
							value={ position }
							attr="position"
							setter={ setAttributes }
						/>
					</fieldset>
				</div>
			</InspectorControls>

			{ ConditionalMainContentRender( isSelected ) }
		</Fragment>
	);
}
