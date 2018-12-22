/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */

/**
 * WordPress dependencies
 */
( function(wp) {
	const  el = wp.element.createElement;
    const registerBlockType = wp.blocks.registerBlockType;
	const { InspectorControls, MediaUpload } = wp.editor;
	const IconButton = wp.components.IconButton;

	registerBlockType( 'mkaz/juxtapose-block', {

		title: 'Juxtapose Images',

		icon: 'image-flip-horizontal',

		category: 'layout',

		attributes: {
			images: {
				type: 'array',
				source: 'query',
				selector: 'img',
				query: {
					url: {
						type: 'string',
						source: 'attribute',
						attribute: 'src',
					}
				},
			},
		},

		edit({ attributes, setAttributes, className }) {
			return [
				el( InspectorControls, { key: 'controls' },
					el( 'div', {}, 'Start Position' )
				),
				el( 'div', { className: className },

					el( MediaUpload, {
						onSelect: function(el) { console.log( el ); },
						allowedTypes: [ 'image' ],
						render: ( { open } ) => (
							el( IconButton, {
									className: "components-toolbar__control",
									label: 'Add image',
									icon: 'edit',
									onClick: open,
								}
							)
						)
					})
				)
			];
		},

		save({ attributes }) {
			return el(
				'div',
				{ className: 'juxtapose' }, [
					el( 'img', { src: 'http://placekitten.com/600/400' }, '' ),
					el( 'img', { src: 'http://placekitten.com/600/400' }, '' )
				]
			);
		}
	});

})(window.wp);
