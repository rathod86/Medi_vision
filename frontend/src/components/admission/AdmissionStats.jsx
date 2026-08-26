import "./AdmissionStats.css";

const AdmissionStats = ({ admissions = [] }) => {

    // ==========================================
    // Statistics
    // ==========================================

    const totalAdmissions = admissions.length;

    const admitted = admissions.filter(
        admission => admission.status === "Admitted"
    ).length;

    const underObservation = admissions.filter(
        admission => admission.status === "Under Observation"
    ).length;

    const transferred = admissions.filter(
        admission => admission.status === "Transferred"
    ).length;

    const discharged = admissions.filter(
        admission => admission.status === "Discharged"
    ).length;

    const today = new Date().toISOString().split("T")[0];

    const todayAdmissions = admissions.filter(
        admission => admission.admissionDate === today
    ).length;

    return (

        <div className="admission-stats">

            <div className="stat-card total">

                <h3>Total Admissions</h3>

                <h2>{totalAdmissions}</h2>

            </div>

            <div className="stat-card today">

                <h3>Today's Admissions</h3>

                <h2>{todayAdmissions}</h2>

            </div>

            <div className="stat-card admitted">

                <h3>Admitted</h3>

                <h2>{admitted}</h2>

            </div>

            <div className="stat-card observation">

                <h3>Under Observation</h3>

                <h2>{underObservation}</h2>

            </div>

            <div className="stat-card transferred">

                <h3>Transferred</h3>

                <h2>{transferred}</h2>

            </div>

            <div className="stat-card discharged">

                <h3>Discharged</h3>

                <h2>{discharged}</h2>

            </div>

        </div>

    );

};

export default AdmissionStats;