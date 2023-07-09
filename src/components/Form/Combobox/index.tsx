import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import { Content, Field, Menu } from './styles'

import { useEffect, useState } from 'react'

interface Option {
  name: string
  value: string
}

interface ComboboxRootProps {
  placeholder?: string
  name: string
  onSelect: (option: Option) => void
  options: Option []
}

export function Combobox ({ options, onSelect, ...rest }: ComboboxRootProps) {
  const [showMenu, setShowMenu] = useState(true)
  const [value, setValue] = useState('')
  const [optionsFiltered, setOptionsFiltered] = useState<Option[]>(options)

  useEffect(() => {
    setOptionsFiltered(options.filter(option =>
      option.name.toLocaleUpperCase()
        .search(value.toLocaleUpperCase()) >= 0
    ))
  }, [value])

  useEffect(() => {
    if (optionsFiltered.length === 0) setShowMenu(false)
  }, [optionsFiltered])

  return (
    <Content>

      <Field name={rest.name}>
        <div>
          <Form.Label>{rest.name}</Form.Label>
        </div>
        <div>
          <Form.Control asChild>
            <input
              type="text"
              placeholder={rest.placeholder}
              value={ value }
              onChange={(e) => {
                setValue(e.target.value)
                e.target.value.length > 0
                  ? setShowMenu(true)
                  : setShowMenu(false)
              }}
              onBlur={() => { setTimeout(() => { setShowMenu(false) }, 100) }}
            />
          </Form.Control>
          <MagnifyingGlassIcon/>
        </div>
      </Field>

      {showMenu &&
        <Menu>
          {optionsFiltered.map(option => (
            <button
              type='button'
              key={option.name}
              onClick={() => {
                onSelect(option)
                setValue(option.name)
              }}
            >
              {option.name}
            </button>
          ))}
        </Menu>
      }

    </Content>
  )
}
