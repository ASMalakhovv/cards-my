import React, {ReactNode, useState} from "react";
import {ModalQuestion} from "./ModalQuestion";

type ModalQuestionContainerPropsType = {
    nameButton: string
    children?: ReactNode
    onClickYes: () => void
}
export const ModalQuestionContainer = (
    {
        nameButton,
        children,
        onClickYes,
        ...props
    }: ModalQuestionContainerPropsType) => {
    const [show, setShow] = useState<boolean>(false)
    const setTrue = () => {
        setShow(true)
    }
    const setFalse = () => {
        setShow(false)
    }
    const modalOnClickYes = () => {
        onClickYes();
        setFalse();
    }
    return (
        <>
            <div>
                <button onClick={setTrue}>{nameButton}</button>
            </div>
            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={setFalse}

                width={500}
                height={200}
                children={children}
                modalOnClickYes={modalOnClickYes}
            />
        </>
    )
}