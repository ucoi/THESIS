import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelapseRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Calories Burned",
    icon: <LocalFireDepartmentRounded />,
    value: (data) => data?.totalCaloriesBurnt || 0, // 👈 Changed to function
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded />,
    value: (data) => data?.totalWorkouts || 0, // 👈 Changed to function
  },
  {
    name: "Average Duration",
    icon: <TimelapseRounded />,
    value: (data) => {
      const avgMinutes = data?.avgCaloriesBurntPerWorkout || 0;
      return `${avgMinutes.toFixed(0)} min`;
    }, // 👈 Changed to function
  },
];
