import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; 

const MainForm = () => {
    const [formData, setFormData] = useState({
        sexe: "Homme", 
        age: "",
        poids: "",
        taille: "",
        activiteId: ""
    });
    
    const [activityList, setActivityList] = useState([]); 
    const [error, setError] = useState(""); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/tatings")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur de chargement des activités");
                }
                return response.json();
            })
            .then(data => {
                setActivityList(data);
            })
            .catch(err => {
                console.error("Erreur API:", err);
                setError("Impossible de charger les niveaux d'activité.");
            });
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const calculerResultats = () => {
        const { sexe, age, poids, taille, activiteId } = formData;
        

        if (!age || !poids || !taille || !activiteId) {
            setError("Veuillez remplir tous les champs.");
            return false;
        }
        
        // Trouver le facteur d'activité correspondant à l'ID sélectionné
        const selectedActivity = activityList.find(act => act.id === parseInt(activiteId));
        if (!selectedActivity) {
            setError("Niveau d'activité invalide.");
            return false;
        }

        // Conversion en nombres pour les calculs
        const ageNum = parseFloat(age);
        const poidsNum = parseFloat(poids);
        const tailleNum = parseFloat(taille);
        
        let bmrCalcule = 0;
        
        if (sexe === "Homme") {
            bmrCalcule = (10 * poidsNum + 6.25 * tailleNum - 5 * ageNum + 5) / 41;
        } else { 
            const bmrBase = 10 * poidsNum + 6.25 * tailleNum - 5 * ageNum + 5;
            bmrCalcule = (bmrBase * 10 + poidsNum * 6.25 + tailleNum * 5 - ageNum * 16) / 44;
        }

        const tdeeCalcule = bmrCalcule * selectedActivity.factor;

        dispatch({ type: "SET_BMR", payload: bmrCalcule });
        dispatch({ type: "SET_TDEE", payload: tdeeCalcule });

        setError(""); 
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        calculerResultats();
    };

    return (
        <>
        <div>
            <h2>Formulaire Principal</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Sexe : </label>
                    <label>
                        <input
                            type="radio"
                            name="sexe"
                            value="Homme"
                            checked={formData.sexe === "Homme"}
                            onChange={handleChange}
                        />
                        Homme
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sexe"
                            value="Femme"
                            checked={formData.sexe === "Femme"}
                            onChange={handleChange}
                        />
                        Femme
                    </label>
                </div>
                <div>
                    <label>Âge : </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Poids (kg) : </label>
                    <input
                        type="number"
                        name="poids"
                        value={formData.poids}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Taille (cm) : </label>
                    <input
                        type="number"
                        name="taille"
                        value={formData.taille}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Niveau d'activité : </label>
                    <select name="activiteId" value={formData.activiteId} onChange={handleChange}>
                        <option value="">Sélectionnez</option>
                        {activityList.map(activite => (
                            <option key={activite.id} value={activite.id}>
                                {activite.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Calculer</button>
            </form>
        </div>
        </>
    );
};

export default MainForm;