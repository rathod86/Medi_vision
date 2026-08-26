import { useEffect, useState } from "react";

import "./BedOccupancy.css";
import {
  FaBed,
  FaProcedures,
  FaCheckCircle,
  FaChartPie,
} from "react-icons/fa";

import { getFullDashboard } from "../../../services/dashboardService";
import { toObject } from "../../../utils/apiHelpers";


const TOTAL_BEDS = 250;


const BedOccupancy = () => {

  const [bedData, setBedData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const load = async () => {

      try {

        const data = toObject(await getFullDashboard());
        const admitted =
            data?.admissions?.admitted ??
            data?.overview?.totalAdmissions ??
            0;

        const icuActive =
            data?.icuRecords?.active ??
            data?.icuRecords?.onVentilator ??
            0;

        const occupiedBeds = admitted + icuActive;
        const availableBeds = Math.max(TOTAL_BEDS - occupiedBeds, 0);
        const occupancyRate = `${Math.round(
          (occupiedBeds / TOTAL_BEDS) * 100
        )}%`;

        setBedData({
          totalBeds: TOTAL_BEDS,
          occupiedBeds,
          availableBeds,
          occupancyRate,
        });

      } catch (error) {

        console.error("Bed occupancy load error:", error);

      } finally {

        setLoading(false);
      }
    };

    load();

  }, []);


  if (loading) {
    return (
      <div className="bed-occupancy">
        <div className="dashboard-widget-loading">Loading bed occupancy...</div>
      </div>
    );
  }

  if (!bedData) {
    return (
      <div className="bed-occupancy">
        <p>Bed occupancy data unavailable.</p>
      </div>
    );
  }


  return (
    <div className="bed-occupancy">

      <div className="section-header">
        <FaBed className="section-icon" />
        <h3>Bed Occupancy</h3>
      </div>

      <div className="bed-grid">

        <div className="bed-card total">
          <FaBed className="bed-icon" />
          <h4>Total Beds</h4>
          <h2>{bedData.totalBeds}</h2>
        </div>

        <div className="bed-card occupied">
          <FaProcedures className="bed-icon" />
          <h4>Occupied Beds</h4>
          <h2>{bedData.occupiedBeds}</h2>
        </div>

        <div className="bed-card available">
          <FaCheckCircle className="bed-icon" />
          <h4>Available Beds</h4>
          <h2>{bedData.availableBeds}</h2>
        </div>

        <div className="bed-card rate">
          <FaChartPie className="bed-icon" />
          <h4>Occupancy Rate</h4>
          <h2>{bedData.occupancyRate}</h2>
        </div>

      </div>

    </div>
  );
};

export default BedOccupancy;
