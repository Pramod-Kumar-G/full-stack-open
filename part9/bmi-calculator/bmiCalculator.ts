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
const parseArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  }
  throw new Error("Provided values were not numbers!");
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
