import React, { useState } from 'react';
// import './App.css';
import SortVisualization from './SortVisualization';

function App() {
    const [algorithm, setAlgorithm] = useState('bubble');
    const [arrayLength, setArrayLength] = useState(10);

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(event.target.value);
    };

    const handleArrayLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArrayLength(parseInt(event.target.value));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sorting Algorithm Visualization</h1>
                <div className="algorithm-select">
                    <label>Choose an algorithm: </label>
                    <select value={algorithm} onChange={handleAlgorithmChange}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="selection">Selection Sort</option>
                    </select>
                </div>
                <div className="array-length">
                    <label>Array Length: </label>
                    <input
                        type="number"
                        value={arrayLength}
                        min="1"
                        max="20"
                        onChange={handleArrayLengthChange}
                    />
                </div>
            </header>
            <SortVisualization arrayLength={arrayLength} algorithm={algorithm} />
        </div>
    );
}

export default App;
