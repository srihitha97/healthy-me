import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Column } from '../grid/Column';
import { H1, H2 } from '../typography/Headings';
import { Divider } from '../layout/Divider';
import { Box } from '../grid/Box';
import { Row } from '../grid/Row';
import { TextInput } from '../forms/TextInput';
import { Copy } from '../typography/Copy';
import { Button } from '../buttons/Button';
import { postWorkout as postWorkoutAction } from '../../actions/workout';
import { setAlert as setAlertAction } from '../../actions/alert';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
  @media (max-width: 768px) {
    padding: 12px 6px;
  }
`;

const FormContainer = styled(Box)`
  background-color: ${({ theme }) => theme.darkestGrey};
  border-radius: 5px;
  padding: 24px;
  margin: 24px;
  width: calc(100% - 48px);
`;

const InputRow = styled(Row)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 12px;
`;

const StyledRow = styled(Row)`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NumberCopy = styled(Copy)`
  color: ${({ theme, color }) => color || theme.darkestGrey};
`;

const RoutineNumberSegment = styled(Box)`
  width: 50px;
  height: 50px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 25px;
  text-align: center;
  justify-content: center;
  margin-top: 6px;

  ${({ small }) =>
    small &&
    css`
      width: 30px;
      height: 30px;
      border-radius: 0px;
      font-size: 12px;
      background-color: ${({ theme }) => theme.grey};
    `}
`;

const RoutineSegment = styled(Box)`
  width: 90%;
  padding: 6px 0px 12px 0px;
`;

const RoutineRow = styled(Row)`
  display: flex;
  justify-content: space-around;
  padding: 12px;
  background-color: ${({ index, theme }) =>
    index % 2 === 0 && theme.darkerGrey};
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const RoutineContainer = styled(Box)`
  width: 50px;
`;

const RoutineDetailsContainer = styled(Row)`
  width: calc(95% - 50px);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoutineDetailContainer = styled(Box)`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 0px 24px;
  }
`;

const ButtonRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

const CreateWorkout = ({ postWorkout, history, setAlert }) => {
  const initialState = {
    name: '',
    description: '',
    caloriesBurned: 0,
    exercises: [{ name: '', routine: [{ reps: 0, weight: 0, set: 1 }] }],
  };
  const [formData, setFormData] = useState(initialState);
  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const { name, description, caloriesBurned, exercises } = formData;

  const addAnotherExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...exercises,
        { name: '', routine: [{ reps: 0, weight: 0, set: 1 }] },
      ],
    });
  };

  const addAnotherSet = exerciseIndex => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].routine = [
      ...newExercises[exerciseIndex].routine,
      {
        reps: 0,
        weight: 0,
        set: newExercises[exerciseIndex].routine.length + 1,
      },
    ];
    setFormData({ ...formData, exercises: newExercises });
  };

  const updateExerciseName = ({ target }, exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].name = target.value;
    setFormData({ ...formData, exercises: newExercises });
  };

  const updateExerciseRoutine = (
    { target: { value } },
    exerciseIndex,
    routineIndex,
    type
  ) => {
    const newFormData = { ...formData };
    _.set(
      newFormData,
      `exercises[${exerciseIndex}].routine[${routineIndex}][${type}]`,
      value
    );
    // exerciseToUpdate[exerciseIndex].routine[routineIndex][type] = value;
    // const routineToUpdate = exerciseToUpdate.routine[routineIndex];
    // routineToUpdate[type] = target.value;
    // exerciseToUpdate.routine[routineIndex] = routineToUpdate;
    // console.log({ exercises, newFormData });
    setFormData(newFormData);
  };

  const onSubmit = () => {
    if (!name || !description || !caloriesBurned) {
      setAlert('Invalid Data', 'danger', 2000);
    } else {
      postWorkout(formData, history);
    }
  };
  return (
    <Container>
      <Column>
        <H1 color="primary">Create Workout</H1>
        <Divider color="grey" />
      </Column>
      <FormContainer>
        <InputRow>
          <TextInput
            type="text"
            id="name"
            label="Name"
            value={name}
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <TextInput
            type="text"
            id="description"
            label="Description"
            value={description}
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <TextInput
            type="number"
            id="caloriesBurned"
            label="Calories Burned"
            value={caloriesBurned}
            onChange={onChange}
          />
        </InputRow>
        <Row>
          <Box>
            <H2>Exercises</H2>
            <Divider color="grey" />
          </Box>
        </Row>
        <Row>
          {exercises.map(({ routine, name: exerciseName }, exerciseIndex) => (
            <StyledRow>
              <RoutineNumberSegment>
                <NumberCopy large>{exerciseIndex + 1}</NumberCopy>
              </RoutineNumberSegment>
              <RoutineSegment>
                <InputRow>
                  <TextInput
                    type="text"
                    id={`exercise${exerciseIndex + 1}`}
                    label="Exercise Name"
                    value={exerciseName}
                    onChange={e => updateExerciseName(e, exerciseIndex)}
                  />
                </InputRow>
                {routine.map(({ reps, weight }, routineIndex) => (
                  <>
                    <RoutineRow index={routineIndex + 2}>
                      <RoutineContainer>
                        <RoutineNumberSegment small>
                          <NumberCopy color="white">
                            {routineIndex + 1}
                          </NumberCopy>
                        </RoutineNumberSegment>
                      </RoutineContainer>
                      <RoutineDetailsContainer>
                        <RoutineDetailContainer>
                          <TextInput
                            type="number"
                            id={`exercise${exerciseIndex +
                              1}-routine${routineIndex + 1}-reps`}
                            label="Reps"
                            value={reps}
                            onChange={e =>
                              updateExerciseRoutine(
                                e,
                                exerciseIndex,
                                routineIndex,
                                'reps'
                              )
                            }
                          />
                        </RoutineDetailContainer>
                        <RoutineDetailContainer>
                          <TextInput
                            type="number"
                            id={`exercise${exerciseIndex +
                              1}-routine${routineIndex + 1}-weight`}
                            label="Weight"
                            value={weight}
                            onChange={e =>
                              updateExerciseRoutine(
                                e,
                                exerciseIndex,
                                routineIndex,
                                'weight'
                              )
                            }
                          />
                        </RoutineDetailContainer>
                      </RoutineDetailsContainer>
                    </RoutineRow>
                  </>
                ))}
                <RoutineRow>
                  <Button primary onClick={() => addAnotherSet(exerciseIndex)}>
                    Another Set
                  </Button>
                </RoutineRow>
              </RoutineSegment>
            </StyledRow>
          ))}
          <ButtonRow>
            <Button onClick={addAnotherExercise}>Another Exercise</Button>
          </ButtonRow>
        </Row>
        <InputRow>
          <Button onClick={onSubmit}>Add Workout</Button>
        </InputRow>
      </FormContainer>
    </Container>
  );
};

CreateWorkout.propTypes = {
  postWorkout: PropTypes.func,
  history: PropTypes.object,
  setAlert: PropTypes.func,
};

export default connect(null, {
  postWorkout: postWorkoutAction,
  setAlert: setAlertAction,
})(CreateWorkout);
