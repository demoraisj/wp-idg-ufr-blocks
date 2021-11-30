import React from 'react'

export default function Checkbox({
  attr,
  label,
  checked = false,
  valWhenChecked = true,
  valWhenUnchecked = false,
  setter
}) {
  const methods = {
    /**
     * Executa ao entrar dados no input, e atualiza a propriedade indicada do bloco com estes dados
     */
    onChange() {
      const input = document.getElementById(attr)
      const attributes = {}

      attributes[attr] = input.checked ? valWhenChecked : valWhenUnchecked
      setter(attributes)
    }
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        name={attr}
        id={attr}
        type='checkbox'
        checked={checked}
        onChange={methods.onChange}
      />
      <label htmlFor={attr}>{label}</label>
    </div>
  )
}
