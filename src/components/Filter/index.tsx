import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const Filter = () => {
  const initialSliderValue = [0, 1000];
  const [value, setValue] = useState<number[]>(initialSliderValue);
  const [checkboxValues, setCheckboxValues] = useState({
    discount: false,
    installment: false,
    freeDelivery: false,
  });

  const handleSlider = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleReset = () => {
    setValue(initialSliderValue);
    setCheckboxValues({
      discount: false,
      installment: false,
      freeDelivery: false,
    });
  };

  return (
    <div className="filter">
      <div className="filter-price">
        <div className="filter-price__top">
          <Typography>{value[0]}</Typography>
          <Typography>{value[1]}</Typography>
        </div>
        <Slider
          getAriaLabel={() => "Диапазон цен"}
          value={value}
          onChange={handleSlider}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </div>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.discount}
              onChange={handleCheckboxChange}
              name="discount"
            />
          }
          label="Со скидкой"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.installment}
              onChange={handleCheckboxChange}
              name="installment"
            />
          }
          label="0% рассрочка"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.freeDelivery}
              onChange={handleCheckboxChange}
              name="freeDelivery"
            />
          }
          label="С бесплатной доставкой"
        />
      </FormGroup>
      <div className="filter-bottom__btn">
        <MyButton onClick={handleReset}>Сброс</MyButton>
        <MyButton>Фильтр</MyButton>
      </div>
    </div>
  );
};

export default Filter;
