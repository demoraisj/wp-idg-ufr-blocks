import React from 'react'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'

/**
 * Componente Botão para acesso a galeria wordpress
 *
 * @param text
 * @param icon
 * @param allowedTypes
 * @param attr
 * @param setter
 * @uses @wordpress/block-editor
 * @returns {JSX.Element}
 * @constructor
 */
export default function GaleryBtn({
  text,
  icon,
  allowedTypes,
  multiple,
  value,
  setter,
  attr
}) {
  const methods = {
    /**
     * Executa quando selecionado um item da galeria e atualiza o valor do atributo do bloco
     * @param selected
     */
    onSelect(selected) {
      const attributes = {}

      attributes[attr] = selected
      setter(attributes)
    }
  }

  return (
    <MediaUploadCheck>
      <MediaUpload
        onSelect={methods.onSelect}
        allowedTypes={allowedTypes}
        value={
          !multiple
            ? value.id
            : value.reduce((acc, curr) => [curr.id, ...acc], [])
        }
        multiple={multiple}
        render={({ open }) => (
          <button id='galeryBtn' className='big-btn' onClick={open}>
            <i className={icon ?? 'fas fa-photo-video'} />
            {text ?? 'Selecione a mídia'}
          </button>
        )}
      />
    </MediaUploadCheck>
  )
}
