"use client";

export default function Home() {
    function updateslots(event) {
        event.preventDefault();
        console.log("Updating slots!");
        // Your logic to update slots
    }

    function handleSelectChange(event) {
        console.log("Select changed!");
        // If you want to submit the form automatically when selection changes
        // you can call updateslots here or implement your logic directly
        updateslots(event);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="items-center">
                <form onSubmit={updateslots}>
                    <label htmlFor="elesvalasztoform" className="fontcolor">Add meg, hogy hány éles töltény legyen egy körön:</label>
                    <select id="elesvalasztoform" name="elesvalasztoform" onChange={handleSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </form>
            </div>
            <div className="flex flex-row bg-center justify-center flex-nowrap slots-border m-9">
                <p key="1">Test</p>
                <p key="2">Test</p>
                <p key="3">Test</p>
            </div>
        </main>
    );
}

