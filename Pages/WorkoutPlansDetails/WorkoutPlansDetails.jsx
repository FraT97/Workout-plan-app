import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WorkoutPlansDetails.css'; 

function WorkoutPlansDetails() {
    const [workouts, setWorkouts] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('https://json-server-backend-p30d.onrender.com/workouts')
            .then(response => {
                setWorkouts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the workouts!', error);
            });
    }, []);

    const deleteWorkout = (id) => {
        axios.delete(`https://json-server-backend-p30d.onrender.com/workouts/${id}`)
            .then(() => {
                setWorkouts(workouts.filter(workout => workout.id !== id));
            })
            .catch(error => {
                console.error('Error deleting the workout!', error);
            });
    };

    const markAsCompleted = (id) => {
        const updatedWorkouts = workouts.map(workout =>
            workout.id === id ? { ...workout, completed: true } : workout
        );
    
        setWorkouts(updatedWorkouts);
    
        const completedWorkout = workouts.find(workout => workout.id === id);
        if (completedWorkout) {
            const storedProgress = JSON.parse(localStorage.getItem('completedWorkouts')) || [];
            localStorage.setItem('completedWorkouts', JSON.stringify([...storedProgress, completedWorkout]));
        }
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const filteredWorkouts = filter === 'all' ? workouts : workouts.filter(workout => workout.name.toLowerCase().includes(filter));

    return (
        <div className="workouts-container">
            <div className="filter-buttons">
                <button onClick={() => handleFilterChange('all')}>All</button>
                <button onClick={() => handleFilterChange('full-body')}>Full-Body</button>
                <button onClick={() => handleFilterChange('cardio')}>Cardio</button>
                <button onClick={() => handleFilterChange('legs')}>Legs</button>
                <button onClick={() => handleFilterChange('back + biceps')}>Back + Biceps</button>
                <button onClick={() => handleFilterChange('chest + triceps')}>Chest + Triceps</button>
            </div>
            {filteredWorkouts.map(workout => (
                <div key={workout.id} className="workout-card">
                    <h2>{workout.name}</h2>
                    {workout.image && <img src={workout.image} alt={workout.name} className="workout-image" />}
                    <ul>
                        {workout.exercises.map((exercise, index) => (
                            <li key={index}>
                                <strong>{exercise.name}</strong>: {exercise.sets} sets x {exercise.reps} reps, {exercise.weight} kg
                            </li>
                        ))}
                    </ul>
                    <div className="button-container">
                        <Link to={`/WorkoutPlansDetails/${workout.id}`}>EDIT</Link>
                        <button onClick={() => deleteWorkout(workout.id)} className="delete-button">
                            DELETE
                        </button>
                        <button onClick={() => markAsCompleted(workout.id)} className="completed-button">
                            COMPLETED
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default WorkoutPlansDetails;