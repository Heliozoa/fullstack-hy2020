interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h != 0).length;
    const success = hours.map(h => h >= target).reduce((acc, curr) => acc && curr);
    const average = hours.reduce((acc, curr) => acc + curr) / hours.length;

    let rating;
    let ratingDescription;
    if (success) {
        rating = 3;
        ratingDescription = "you met the target!";
    } else if (trainingDays > periodLength * 0.8) {
        rating = 2;
        ratingDescription = "you almost met the target";
    } else {
        rating = 1;
        ratingDescription = "you did not meet the target";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

const target: number = Number(process.argv[2])
const hours: Array<number> = process.argv.slice(3).map(a => Number(a));

if (target && hours.map(h => !isNaN(h)).reduce((acc, curr) => acc && curr)) {
    console.log(calculateExercises(hours, target));
} else {
    console.log("invalid parameters");
}
