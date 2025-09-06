import { useContext } from "react";
import { Context } from "./main"


const Menubar = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error("Menubar must be used within a Context.Provider");
    }

    const { setMenu } = context;

    return (
        <div className="flex  h-14 p-4 shadow-md">
            <h1 onClick={() => setMenu("Shirt")} className="ml-40 cursor-pointer ">Shirt</h1>
            <h1 onClick={() => setMenu("Jacket")} className="ml-28  cursor-pointer">Jacket</h1>
            <h1 onClick={() => setMenu("Phones")} className="ml-28 cursor-pointer">Mobile Phones</h1>
            <h1 onClick={() => setMenu("House")} className="ml-28 cursor-pointer">House</h1>
            <h1 onClick={() => setMenu("Scooters")} className="ml-28 cursor-pointer">Scooters</h1>
            <h1 onClick={() => setMenu("Bike")} className="ml-28 cursor-pointer">Bike</h1>
            <h1 onClick={() => setMenu("Appartments")} className="ml-28 cursor-pointer">Appartments</h1>
        </div>
    )
}

export default Menubar