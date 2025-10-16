interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (
  dailyExerciseHours: number[],
  target: number,
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce(
    (trainingDays, todayHours) =>
      todayHours !== 0 ? trainingDays + 1 : trainingDays,
    0,
  );
  const totalExerciseHours = dailyExerciseHours.reduce(
    (acc, val) => acc + val,
    0,
  );

  const average = totalExerciseHours / periodLength;
  const success = average >= target;
  const rating = average >= target ? 3 : target - average <= 1 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "great, target is reached"
      : rating === 2
        ? "not too bad, but could be better"
        : "too bad, have to be better";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argValues = args.slice(2).map((x) => {
    if (isNaN(Number(x))) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(x);
  });
  return { target: argValues[0], dailyExerciseHours: argValues.slice(1) };
};

try {
  const { target, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happended. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
export {};
