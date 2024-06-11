"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
    const [revealed, setRevealed] = useState([false, false, false]);

    const handleReveal = (index) => {
        setRevealed(prev => prev.map((item, i) => (i === index ? true : item)));
    };

    const handleReset = () => {
        setRevealed([false, false, false]);
    };

    function handleSelectChange(event) {
        console.log("Select changed!");
        RandomizeSlots();
    }

    function RandomizeSlots(){
        const slotnumber = 1 + Math.floor(Math.random() * 10/2);
        const elessaferatio = document.getElementById("elesvalasztoform").value;
        console.log(slotnumber);
        let picid;
        if (slotnumber > elessaferatio) {
            picid = 1;
        } else {
            picid = 2;
        }
        return picid;
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="items-center mb-4">
                <form>
                    <label htmlFor="elesvalasztoform" className="fontcolor">
                        Add meg, hogy hány éles töltény legyen egy körön:
                    </label>
                    <select id="elesvalasztoform" name="elesvalasztoform" onChange={handleSelectChange}>
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
                                    src={`/../../public${RandomizeSlots()}.png`}
                                    alt={`Image ${index + 1}`}
                                    layout="responsive"
                                />
                            ) : (
                                <div className="cover-up">Image {index + 1}</div>
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
