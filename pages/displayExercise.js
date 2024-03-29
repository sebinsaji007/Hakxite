
import Exercises from "../components/services/servicesdata/Exercises";
import { useState } from "react";
import Navbar from "../components/navbar";
import SearchExercises from "../components/services/servicesdata/SearchExercises";

import styles from "../styles/Home.module.scss"
import { Box } from "@mui/material";
const DisplayExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  return (
<div className={styles.wrapper}>
        <div className={styles.wrapper_padding}>
          <Navbar />
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">

      <section className={styles.services}>
        <div>
          <h2>Let Us Find The Perfect Workout For You!</h2>
          <SearchExercises
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
          <Exercises
            setExercises={setExercises}
            exercises={exercises}
            bodyPart={bodyPart}
          />
        </div>
      </section>
    </Box>
    </div>
    </div>
  );
};

export default DisplayExercise;
