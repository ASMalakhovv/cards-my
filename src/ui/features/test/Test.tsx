import SuperButton from "../../common/SuperButton/SuperButton";
import SuperCheckbox from "../../common/SuperCheckbox/SuperCheckbox";
import SuperDoubleRange from "../../common/SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../common/SuperInputText/SuperInputText";
import SuperRadio from "../../common/SuperRadio/SuperRadio";
import SuperRange from "../../common/SuperRange/SuperRange";
import SuperSelect from "../../common/SuperSelect/SuperSelect";
import s from "./Test.module.scss"
import SuperEditableSpan from "../../common/SuperEditableSpan/SuperEditableSpan";

export function Test() {
    return (
        <div className={s.testBlock}>
            <div className={s.customComponent}>
                <div className={s.button}>
                    <SuperButton>
                        Button
                    </SuperButton>
                    <SuperButton disabled>
                        disabled
                    </SuperButton>
                    <SuperButton red>
                        Error
                    </SuperButton>
                </div>
                <div className={s.checkBox}>
                    <SuperCheckbox>
                        click me
                    </SuperCheckbox>
                    <SuperEditableSpan value='...enter text'/>
                </div>
                <div className={s.range}>
                    <SuperRange/>
                    <SuperDoubleRange value={[0, 100]}/>
                </div>
                <div className={s.input}>
                    <SuperInputText/>
                    <SuperInputText
                        style={{borderBottom: "3px solid rgb(0 117 255)"}} // проверьте, рабоет ли смешивание классов
                    />
                </div>
                <div className={s.select}>
                    <SuperRadio options={['dark', 'red', 'some']} name='themes' value='dark'/>
                    <SuperSelect options={['dark', 'red', 'some']}/>
                </div>
            </div>
        </div>
    );
}

