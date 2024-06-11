"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; // Import useEffect from React

export default function Home() {
    const [revealed, setRevealed] = useState([false, false, false]);
    const [imageIds, setImageIds] = useState([1, 1, 1]); // Initialize with default image IDs
    const [formValue, setFormValue] = useState(1); // Default form value

    const handleReveal = (index) => {
        setRevealed(prev => prev.map((item, i) => (i === index ? true : item)));
    };

    const handleReset = () => {
        setRevealed([false, false, false]);
        setImageIds([RandomizeSlots(), RandomizeSlots(), RandomizeSlots()]);
    };

    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value);
        console.log("Select changed to:", value);
        setFormValue(value);
        handleReset();
    };

    function RandomizeSlots(){
        const slotnumber = 1 + Math.floor(Math.random() * 10/2);
        const elessaferatio = formValue; // Use the current form value
        console.log("Slot number:", slotnumber);
        const picid = slotnumber > elessaferatio ? 1 : 2;
        return picid;
    }
    useEffect(() => {
        setImageIds([RandomizeSlots(), RandomizeSlots(), RandomizeSlots()]);

        // Add keydown event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [formValue]); // Update image IDs when form value changes

    function handleKeyDown(event) {
        // Handle keydown events
        console.log('Key pressed:', event.key);

        // Check if all images are revealed
        const allRevealed = revealed.every(isRevealed => isRevealed);
        console.log('All images revealed:', allRevealed);

        // Example: Check if the 'm' key is pressed
        if (event.key === 'm') {
            if (!allRevealed) { // Check if all images are not revealed
                handleReset(); // Reset images

                // Delay the revealing process to ensure the reset happens first
                setTimeout(() => {
                    setRevealed([true, false, false]);
                    setTimeout(() => {
                        setRevealed([true, true, false]);
                        setTimeout(() => {
                            setRevealed([true, true, true]);
                        }, 1000); // Wait for 1 second
                    }, 1000); // Wait for 1 second
                }, 0); // Wait for next tick
            }
        }
    }













    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="items-center mb-4">
                <form>
                    <label htmlFor="elesvalasztoform" className="fontcolor">
                        Add meg, hogy hány éles töltény legyen egy körön:
                    </label>
                    <select id="elesvalasztoform" name="elesvalasztoform" value={formValue} onChange={handleSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </form>
            </div>
            <div className="slots-border mb-4 flex justify-center">
                <div className="flex flex-row items-center justify-center">
                    {revealed.map((isRevealed, index) => (
                        <div key={index} className="image-container" onClick={() => handleReveal(index)}>
                            {isRevealed ? (
                                <Image
                                    src={`/${imageIds[index]}.png`}
                                    alt={`Image ${index + 1}`}
                                    layout="fill"
                                />
                            ) : (
                                <div className="cover-up items-center">Kattints a megtekintéshez!</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleReset} className="reset-button">
                Reset
            </button>
        </main>
    );
}
