import Link from 'next/link';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

export type AutoCompleteListItem = {
  value: string;
  label: string;
}

export type AppAutoCompleteProps = {
  label?: string;
  items?: Array<AutoCompleteListItem>;
  isOpen: boolean
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
>

export default function AppAutoComplete(props: AppAutoCompleteProps) {
  const {
    items, label, id, isOpen,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownState, setDropdownState] = useState<boolean>(isOpen);

  const mappedProps = { ...props };
  delete mappedProps.items;
  delete mappedProps.label;

  useEffect(() => {
    const handleInputFocus = () => setDropdownState(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownState
        && inputRef.current
        && !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownState((prev) => !prev);
      }
    };

    document.addEventListener('click', handleClickOutside);
    inputRef.current?.addEventListener('focus', handleInputFocus);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      inputRef.current?.removeEventListener('focus', handleInputFocus);
    };
  }, []);

  return (
    <>
      <label htmlFor={id ? `#${id}` : undefined} className="fw-2 fs-4 mb-2">
        {label}
      </label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label={label}
          aria-describedby="app-search-button"
          ref={inputRef}
          {...mappedProps}
        />
        <button className="btn btn-primary" type="button" id="button-addon2">Chercher</button>
      </div>
      {
        items && items.length !== 0 && (
          <ul className={`dropdown-menu${dropdownState ? ' show' : ''}`}>
            {items.map((el, key: number) => (
              <li key={`${el.value}-${key + 1}`}>
                <Link href={el.value}>
                  <a className="dropdown-item">{el.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    </>

  );
}
