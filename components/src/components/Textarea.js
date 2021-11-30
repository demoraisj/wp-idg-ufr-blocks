import React from 'react'

export default function Textarea({ attr, label, value, className, setter }) {
  const methods = {
    /**
     * Executa ao entrar dados no input, e atualiza a propriedade indicada do bloco com estes dados
     * @param event
     */
    onInput(event) {
      const attributes = {}

      attributes[attr] = event.target.value
      setter(attributes)
    }
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <label htmlFor={attr}>{label}</label> <br />
      <textarea
        name={attr}
        id={attr}
        onInput={methods.onInput}
        className={className}
      >
        {value}
      </textarea>
    </div>
  )
}
