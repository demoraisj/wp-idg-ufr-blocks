import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const { icon, type, style, size, text, link, position, blank } = attributes;

	/**
	 * Classe do ícone do botão. Contem margem quando o ícone é acompanhado de texto
	 *
	 * @type {string}
	 */
	const iconClassName = `${ icon } ${ text.length !== 0 ? 'mr-1' : '' }`;

	return (
		<div { ...useBlockProps.save() }>
			<div className="row">
				<div
					className={ `col-12 d-flex justify-content-${ position }` }
				>
					{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
					<a
						className={ `br-button ${ type } ${ style } ${ size }` }
						type="button"
						target={ blank ? '_blank' : '_self' }
						rel="noreferrer noopener"
						href={
							link.toLowerCase().startsWith( 'http' )
								? link.toLowerCase()
								: link
								? `//${ link.toLowerCase() }`
								: '#'
						}
					>
						<i className={ iconClassName } />
						{ text }
					</a>
				</div>
			</div>
		</div>
	);
}
