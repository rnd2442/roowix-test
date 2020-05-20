import { Schema } from "rsuite";
const { NumberType } = Schema.Types;

const whole = /^\d+$/;
const wholeDecimal = /^\d*(\.\d+)?$/;
const negativeWhole = /^-?\d+$/;
const negativeWholeDecimal = /^-?\d*(\.\d+)?$/;

const errText = "Некорректное значение";
export const model = Schema.Model({
  directionAngle: NumberType().pattern(negativeWhole, errText).range(-360, 360),
  viewAngle: NumberType().pattern(whole, errText).range(1, 179),
  viewRange: NumberType().pattern(wholeDecimal, errText),
  latDeg: NumberType().pattern(negativeWhole, errText),
  latMin: NumberType().pattern(negativeWholeDecimal, errText).range(0, 60),
  lngDeg: NumberType().pattern(negativeWhole, errText),
  lngMin: NumberType().pattern(negativeWholeDecimal, errText).range(0, 60),
});
