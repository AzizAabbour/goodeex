import { useSelector } from "react-redux";

const ResultSummary = () => {
    const bmr = useSelector(state => state.bmr);
    const tdee = useSelector(state => state.tdee);

    return (
        <>
        <h3>
            Resume des Resultats 
        </h3>

        <p><strong>BMR :</strong>{bmr.toFixed(2)} Kcal</p>
        <p><strong>TDEE :</strong>{tdee.toFixed(2)} Kcal</p>
        </>
    )
}

export default ResultSummary;