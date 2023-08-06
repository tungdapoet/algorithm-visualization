import React, { useState, useEffect } from 'react';
import './SortVisualization.css';

interface SortVisualizationProps {
    arrayLength: number;
    algorithm: string;
}

const SortVisualization: React.FC<SortVisualizationProps> = ({ arrayLength, algorithm }) => {
    const [data, setData] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [delay, setDelay] = useState(100);
    const [steps, setSteps] = useState<string[]>([]);

    useEffect(() => {
        generateRandomArray();
    }, [arrayLength]);

    const generateRandomArray = () => {
        const newArray = [];
        for (let i = 0; i < arrayLength; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setData(newArray);
        setSorting(false);
        setSteps([]);
    };

    const bubbleSort = async () => {
        setSorting(true);
        const sortedData = [...data];
        const bubbleSteps: string[] = [];

        for (let i = 0; i < sortedData.length - 1; i++) {
            for (let j = 0; j < sortedData.length - i - 1; j++) {
                bubbleSteps.push(`Comparing ${sortedData[j]} and ${sortedData[j + 1]}`);
                if (sortedData[j] > sortedData[j + 1]) {
                    bubbleSteps.push(`Swapping ${sortedData[j]} and ${sortedData[j + 1]}`);
                    await sleep(delay);
                    swap(sortedData, j, j + 1);
                    setData([...sortedData]);
                }
            }
        }
        setSorting(false);
        setSteps(bubbleSteps);
    };

    const insertionSort = async () => {
        setSorting(true);
        const sortedData = [...data];
        const insertionSteps: string[] = [];

        for (let i = 1; i < sortedData.length; i++) {
            const key = sortedData[i];
            let j = i - 1;

            while (j >= 0 && sortedData[j] > key) {
                insertionSteps.push(`Moving ${sortedData[j]} to the right`);
                sortedData[j + 1] = sortedData[j];
                j--;
            }

            insertionSteps.push(`Inserting ${key} into correct position`);
            sortedData[j + 1] = key;
            setData([...sortedData]);
            await sleep(delay);
        }

        setSorting(false);
        setSteps(insertionSteps);
    };

    const selectionSort = async () => {
        setSorting(true);
        const sortedData = [...data];
        const selectionSteps: string[] = [];

        for (let i = 0; i < sortedData.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < sortedData.length; j++) {
                if (sortedData[j] < sortedData[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                selectionSteps.push(`Swapping ${sortedData[i]} and ${sortedData[minIndex]}`);
                await sleep(delay);
                swap(sortedData, i, minIndex);
                setData([...sortedData]);
            }
        }

        setSorting(false);
        setSteps(selectionSteps);
    };

    const swap = (arr: number[], i: number, j: number) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSort = () => {
        setSteps([]);
        if (algorithm === 'bubble') {
            bubbleSort();
        } else if (algorithm === 'insertion') {
            insertionSort();
        } else if (algorithm === 'selection') {
            selectionSort();
        }
    };
    return (
        <div className="container">
            <div className="element-container">
                {data.map((value, index) => (
                    <div key={index} className={`element ${sorting ? 'sorting' : ''}`}>
                        <div className="element-content" style={{ height: `${value * 3}px` }} />
                        <div className="element-value-below">{value}</div>
                    </div>
                ))}
            </div>
            <textarea
                value={steps.join('\n')}
                readOnly
                rows={10}
            />
            <div className="buttons">
                <input
                    type="range"
                    value={delay}
                    min="50"
                    max="1000"
                    step="50"
                    onChange={(e) => setDelay(Number(e.target.value))}
                />
                <button onClick={generateRandomArray} disabled={sorting}>
                    Generate New Array
                </button>
                <button onClick={handleSort} disabled={sorting}>
                    Sort
                </button>
            </div>
        </div>
    );
};

export default SortVisualization;