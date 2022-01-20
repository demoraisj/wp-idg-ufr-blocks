import { useBlockProps } from '@wordpress/block-editor';
import Render from "./render";
import {Fragment} from "react";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const {
		postType,
		postCategory,
		postTag,
		panelID,
		showExcerpt,
		wpPostType,
		showShareBtn,
	} = attributes;

	return (
		<Fragment>
			<div {...useBlockProps.save()}>
				<div className="row">
					<div className="col-12">
						<Render attributes={attributes} />
					</div>
				</div>
			</div>

			{/* @see assets/client.esnext.js */}
			<script>
				{`
					document.addEventListener('DOMContentLoaded', function(){
						ufrSetNewsPanel({
							postType: '${postType}',
							postCategory: '${postCategory}',
							postTag: '${postTag}',
							panelID: '${panelID}',
							showExcerpt: ${showExcerpt},
							wpPostType: '${wpPostType}',
							showShareBtn: ${showShareBtn},
						})
					});
				`}
			</script>
		</Fragment>
	);
}
