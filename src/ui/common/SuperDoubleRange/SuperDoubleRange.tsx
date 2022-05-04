import React from 'react'
import Slider from "@mui/material/Slider/Slider";
import Box from "@mui/material/Box/Box";

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    min?: number
    max?: number
    step?: number
    disable?: boolean
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        disable, min, max,
        step
        // min, max, step, disable, ...
    }
) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (onChangeRange) {
            Array.isArray(newValue) && onChangeRange([newValue[0], newValue[1]]);
        }

    };

    return (
        <Box sx={{width: 100}}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap={disable}
                size='medium'
            />
        </Box>
    )
}

export default SuperDoubleRange
