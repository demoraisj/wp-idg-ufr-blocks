import React from 'react'

export default function Input({ attr, label, type, value, className, setter }) {
  const methods = {
    /**
     * Executa ao entrar dados no input, e atualiza a propriedade indicada do bloco com estes dados
     * @param event
     */
    onChange(event) {
      const attributes = {}

      attributes[attr] = event.target.value
      setter(attributes)
    }
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <label htmlFor={attr}>{label}</label> <br />
      <input
        name={attr}
        id={attr}
        type={type ?? 'text'}
        value={value}
        onChange={methods.onChange}
        className={className}
      />
    </div>
  )
}
