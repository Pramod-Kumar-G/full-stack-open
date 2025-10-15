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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));
