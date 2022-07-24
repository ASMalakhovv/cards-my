import React, {CSSProperties, ReactNode} from "react";
import {Modal} from "../Modal";

type ModalQuestionPropsType = {
    show: boolean;

    setTrue: () => void;
    setFalse: () => void;
    buttonStyles?: CSSProperties;
    trueStyles?: CSSProperties;
    falseStyles?: CSSProperties;
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    modalOnClickYes: () => void;
    children?: ReactNode;
}
export const ModalQuestion: React.FC<ModalQuestionPropsType> = (
    {
        setTrue,
        setFalse,
        buttonStyles,
        trueStyles,
        falseStyles,
        buttonTrue = 'Yes',
        buttonFalse = 'No',

        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {
        },

        width,
        height,
        modalStyle,
        modalOnClick = () => {
        },

        show,
        children,
        modalOnClickYes,
    }
) => {

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={backgroundOnClick}
            backgroundStyle={backgroundStyle}

            width={width}
            height={height}
            modalOnClick={modalOnClick}
            modalStyle={modalStyle}

            show={show}
        >
            {children ? children : 'question Modal'}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    ...buttonStyles,
                }}
            >
                <button onClick={() => modalOnClickYes && modalOnClickYes()} style={{...trueStyles}}>{buttonTrue}</button>
                <button onClick={setFalse} style={{...falseStyles}}>{buttonFalse}</button>
            </div>
        </Modal>
    )
}