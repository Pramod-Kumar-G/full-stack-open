const calculateBmi = (height: number, weight: number): string => {
  console.log(height, weight);
  const bmi = (weight * 10000) / (height * height);
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  }
  if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  }
  if (bmi >= 30) {
    return "Obesity";
  }
};

console.log(calculateBmi(180, 74));
