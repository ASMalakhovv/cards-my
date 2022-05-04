import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import style from './SuperRadio.module.scss'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value)

        onChange && onChange(e)
    }


    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i}>
            <input
                type={'radio'}
                checked={value === o}
                onChange={onChangeCallback}
                value={o}
                name={name}
                {...restProps}
            />
            <div className={style.inputValue}>{o}</div>
        </label>
    )) : []

    return (
        <div className={style.inputRadio}>
            {mappedOptions}
        </div>
    )
}

export default SuperRadio
