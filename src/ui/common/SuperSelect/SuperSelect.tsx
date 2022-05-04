import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import style from './SuperSelect.module.scss'
import selectIcon from './select_icon.svg'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {

    const styleSelector = {
        backgroundImage: `url(${selectIcon})`,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
    }

    const mappedOptions: JSX.Element[] | undefined = options?.map((o, i) => {

        return <option key={i}>{o}</option>
    });

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value)

        onChange && onChange(e)
    }

    return (
        <select onChange={onChangeCallback} {...restProps}
                className={style.selector} style={styleSelector}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
