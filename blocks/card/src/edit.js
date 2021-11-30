import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { UFRBlockHeader } from 'wp-idg-ufr__block-components';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({ isSelected }) {
	const template = [
		['core/spacer', { height: 30 }],
		['create-block/ufr-avatar', { type: 'img', text: 'Fulano de Tal' }],
		['core/spacer', { height: 30 }],
		[
			'core/paragraph',
			{
				content:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore perferendis nam porro atque ex at, numquam non optio ab eveniet error vel ad exercitationem, earum et fugiat recusandae harum? Assumenda.',
			},
		],
		[
			'create-block/ufr-button',
			{ text: 'ver currículo', style: '', position: 'end' },
		],
	];

	return (
		<div
			{...useBlockProps({
				className: `ufr-block-component ${isSelected ? 'edit' : ''}`,
			})}
		>
			<div className="row align-items-center">
				<div className="col">
					<div
						className="config"
						style={{ display: isSelected ? '' : 'none' }}
					>
						<UFRBlockHeader
							title="Cartão"
							description="Dentro deste cartão você pode editar, remover e adicionar outros blocos como desejar."
						/>
					</div>

					<div className="br-card mt-5">
						<div className="card-content">
							<InnerBlocks template={template} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
