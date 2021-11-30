<?php
/**
 * Plugin Name:       Blocos WP-IDG-UFR - Dependências
 * Description:       Dependências dos blocos do tema WP-IDG-UFR
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            UFR
 * Text Domain:       blocks-dependencies
 */


function initialize() {
    /**
     * Concatena endereços na raiz do plugin
     *
     * @param $path
     */
	function uri($path) {
		return plugins_url() . '/wp-idg-ufr__block-dependencies' . $path;
	}

    /**
     * Adiciona atributo type = module na tag <script> de 'ufr-idg-blocks.js'
     *
     * @param $tag String da Tag
     * @param $handle Nome do script
     * @param $src Endereço
     */
	function add_type_attribute($tag, $handle, $src) {
        if ('ufr-idg-blocks-dependencies.js' !== $handle) {
            return $tag;
        }

        $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
        return $tag;
    }

    function block_editor_assets() {
        wp_enqueue_style('ufr-block-editor.css', uri('/assets/css/ufr-blocks-editor.css'));
        wp_enqueue_script('dsgov.js', uri('/assets/js/dsgov-base.js'), NULL, '1.0', true);
        wp_enqueue_style('fontawesome', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');
        wp_enqueue_style('dsgov.css', uri('/assets/css/dsgov.css'));
        wp_enqueue_style('font-Rawline', uri('/assets/fonts/rawline/css/rawline.css'));
        wp_enqueue_style('font-Raleway', '//fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900');
    }

    function block_assets() {
        wp_enqueue_script('regenerator-runtime.js', uri('/node_modules/regenerator-runtime/runtime.js'), NULL, '1.0', true);
        wp_enqueue_script('ufr-idg-blocks-dependencies.js', uri('/index.js'), NULL, '1.0', true);
    }

    // Carrega scripts apenas no editor de blocos
    add_action( 'enqueue_block_editor_assets', 'block_editor_assets' );
    // Carrega scripts no front end e no editor de blocos
    add_action( 'enqueue_block_assets', 'block_assets' );

    add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
}

add_action('init', 'initialize');
