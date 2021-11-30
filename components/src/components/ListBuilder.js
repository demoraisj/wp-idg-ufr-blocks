import React, { Fragment, useState } from 'react'

/**
 *
 * @param {string}   items  // Parsed JSON like: { text: string, link: string, children: { text: string, link: string }[] }[]
 * @param {Function} setter
 * @param {string}   attr
 * @param {function} useState
 * @return {JSX.Element|*} Gerador de Lista
 */
export default function ListBuilder({ items, setter, attr }) {
  const model = Object.freeze({ text: '', link: '' })
  const [error, setError] = useState(false)
  const [crudStatus, setCrudStatus] = useState('creating')
  const [parentText, setParentText] = useState('')
  const [editingItemIndex, setEditingItemIndex] = useState(null)
  const [nestedIndex, setNestedIndex] = useState(null)
  const [editingItem, setEditingItem] = useState(model)

  /**
   * A lista vem como string. Aqui é feito o parse.
   *
   * @type {{text: string, link: string, children: {text: string, link: string}[]}[]}
   */
  const itemsList = JSON.parse(items)

  /**
   * Métodos para adicionar, editar e remover items da lista.
   *
   * @type {Readonly<{new(): void, edit(): void, save(): void, remove(): void}>}
   */
  const crud = Object.freeze({
    /**
     * Prepara para criar um novo item
     *
     * @param {null | object} parentItem
     * @return {void}
     */
    new(parentItem = null) {
      if (parentItem) {
        const parentItemIndex = itemsList.findIndex((i) => i === parentItem)

        setParentText(parentItem.text)
        setEditingItemIndex(parentItemIndex)
      }

      setEditingItem(model)
      setCrudStatus(parentItem ? 'creating-nested' : 'creating')
      setError(false)
    },

    /**
     * Prepara para editar um item
     *
     * @param {{ text: string, link: string }}        item
     * @param {null | { text: string, link: string }} nestedItem
     * @return {void}
     */
    edit(item, nestedItem = null) {
      setEditingItemIndex(itemsList.findIndex((i) => i === item))

      if (nestedItem) {
        const editingItemIndexAlt = itemsList.findIndex((i) => {
          return i === item
        })

        setNestedIndex(
          itemsList[editingItemIndexAlt].children.findIndex(
            (i) => i === nestedItem
          )
        )

        setEditingItem(nestedItem)
      } else {
        setEditingItem(item)
      }

      setCrudStatus(nestedItem ? 'editing-nested' : 'editing')
      setError(false)
    },

    /**
     * Remove um item
     *
     * @param {{ text: string, link: string }}        item
     * @param {null | { text: string, link: string }} nested
     * @return {void}
     */
    remove(item, nested = null) {
      const attributes = {}
      const itemIndex = itemsList.findIndex((i) => i === item)

      if (nested) {
        const childIndex = itemsList[itemIndex].children.findIndex(
          (i) => i === item
        )

        itemsList[itemIndex].children.splice(childIndex, 1)
      } else {
        itemsList.splice(itemIndex, 1)
      }

      setCrudStatus('creating')
      setEditingItem(model)
      setError(false)

      attributes[attr] = JSON.stringify(itemsList)
      setter(attributes)
    },

    /**
     * Salva a edição, criando ou editando item.
     *
     * @return {*} Salva programaticamente
     */
    save() {
      const attributes = {}

      if (editingItem.text.length === 0) return setError(true)

      switch (crudStatus) {
        case 'creating':
          editingItem.children = []
          editingItem.isChild = false
          itemsList.push(editingItem)
          break

        case 'creating-nested':
          editingItem.isChild = true
          itemsList[editingItemIndex].children.push(editingItem)
          break

        case 'editing':
          itemsList[editingItemIndex] = { ...editingItem }
          break

        case 'editing-nested':
          itemsList[editingItemIndex].children[nestedIndex] = {
            ...editingItem
          }
          break
      }

      setEditingItem(model)
      setCrudStatus('creating')
      setError(false)

      attributes[attr] = JSON.stringify(itemsList)
      setter(attributes)
    }
  })

  /**
   * Renderiza a lista
   *
   * @return {*[]} JSX Lista de items
   */
  function RenderList({ list }) {
    const listToRender = []

    list.forEach((item) => {
      function RenderChildren() {
        const childrenListToRender = []

        item.children.forEach((child) => {
          childrenListToRender.push(
            <Fragment>
              <div
                className='item'
                onClick={() => crud.edit(item, child)}
                role='button'
              >
                <span>{child.text}</span>

                <div className='float-right'>
                  <i
                    role='button'
                    className='fas fa-trash delete'
                    onClick={(e) => {
                      e.stopPropagation()
                      crud.remove(item, child)
                    }}
                  />
                </div>
              </div>
            </Fragment>
          )
        })

        return childrenListToRender
      }

      listToRender.push(
        <div
          className={`root-item ${
            item.children.length > 0 ? 'has-children' : ''
          }`}
        >
          <div className='item' onClick={() => crud.edit(item)} role='button'>
            <span>{item.text}</span>

            <div className='float-right'>
              {!item.isChild && (
                <i
                  role='button'
                  className='fas fa-sign-in-alt nest'
                  onClick={(e) => {
                    e.stopPropagation()
                    crud.new(item)
                  }}
                />
              )}

              <i
                role='button'
                className='fas fa-trash delete'
                onClick={(e) => {
                  e.stopPropagation()
                  crud.remove(item)
                }}
              />
            </div>
          </div>

          <div className='children-group'>
            <RenderChildren />
          </div>
        </div>
      )
    })

    return listToRender
  }

  return (
    <div className='listBuilder'>
      <h3 className='text-center'>Items</h3>

      <div className='items'>
        <RenderList list={itemsList} />

        <div className='item new text-center'>
          <span onClick={() => crud.new()} role='button'>
            Clique para inserir novo
          </span>
        </div>
      </div>

      <div className='insert'>
        <div className='row'>
          <div className='col'>
            <span id='titleSpan'>
              {crudStatus === 'creating'
                ? 'Adicionando novo item'
                : crudStatus === 'creating-nested'
                ? `Adicionando novo item filho de "${parentText}"`
                : `Editando item "${editingItem.text}"`}
            </span>

            <div className='row fields'>
              <fieldset className='col-12'>
                <label htmlFor='listItem'>
                  Texto
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='text'
                  id='fieldText'
                  name='fieldText'
                  value={editingItem.text}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      text: e.target.value
                    })
                  }
                />
              </fieldset>

              <fieldset className='col-12'>
                <label htmlFor='listItem'> Link </label>
                <input
                  type='text'
                  id='fieldLink'
                  name='fieldLink'
                  value={editingItem.link}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      link: e.target.value
                    })
                  }
                />
              </fieldset>
            </div>
          </div>
          <div className='col-2'>
            <button onClick={crud.save} onKeyPress={(e) => e.keyCode === 13 ? crud.save() : null}>
              {crudStatus.startsWith('creating') ? '+' : '✓'}
            </button>
          </div>
        </div>
        {error && (
          <span style={{ color: 'red' }} className='float-right'>
            <br />
            Você deve inserir ao menos um texto para o item.
          </span>
        )}
      </div>
    </div>
  )
}
