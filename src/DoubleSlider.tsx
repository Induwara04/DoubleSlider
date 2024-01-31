import Slider from "@mui/material-next/Slider";
import { FC, useState } from "react";
import { sliderStyle1, sliderStyle2, titleStyle, amountStyle, undervalueStyle } from './SliderStyle';

const App: FC = () => {
  const [value1, setValue1] = useState<number>(40); // Initial value for Slider 1
  const [value2, setValue2] = useState<number>(20); // Initial value for Slider 2
  const [isHover1, setIsHover1] = useState<boolean>(false);
  const [isHover2, setIsHover2] = useState<boolean>(false);

  const maxSliderValue = 200;
  const minSliderValue = 20;

  const handleSlider1Change = (event: Event, newValue: number | number[]) => {
    setValue1(newValue as number);
  };

  const handleSlider2Change = (event: Event, newValue: number | number[]) => {
    const newValueNumber = newValue as number;
    if (newValueNumber <= value1) {
      setValue2(newValueNumber);
    } else {
      setValue2(value1);
    }
  };

  const calculatePosition = (value: number) => {
    const range = maxSliderValue - minSliderValue;
    const relativeValue = value - minSliderValue;
    const percentage = (relativeValue / range) * 100;
    return `calc(${percentage}% - 12px)`;
  };

  return (
    <div className="App">
      <h6>Range Slider</h6>
      <div className="container" style={{ padding: "30px" }}>
        <span className="title" style={titleStyle}>Title</span>
        <span className="amount" style={amountStyle}>Amount</span>
        <div
          className="slider-container"
          style={{
            position: "absolute",
            width: "300px",
          }}
        >
          <Slider
            max={maxSliderValue}
            min={minSliderValue}
            size="medium"
            value={value1}
            onChange={handleSlider1Change}
            valueLabelDisplay="auto"
            onMouseEnter={() => setIsHover1(true)}
            onMouseLeave={() => setIsHover1(false)}
            sx={sliderStyle1}
          />

          {isHover1 && (
            <div className="undervalue" style={{ ...undervalueStyle, position: "absolute", top: "40px", left: calculatePosition(value1) }}>
              <span className="number1">Limit</span>
            </div>
          )}

          <Slider
            max={maxSliderValue}
            min={minSliderValue}
            size="medium"
            value={value2}
            onChange={handleSlider2Change}
            valueLabelDisplay="auto"
            onMouseEnter={() => setIsHover2(true)}
            onMouseLeave={() => setIsHover2(false)}
            sx={sliderStyle2}
          />

          {isHover2 && (
            <div className="undervalue" style={{ ...undervalueStyle, position: "absolute", top: "40px", left: calculatePosition(value2), }}>
              <span className="number2">Value</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
