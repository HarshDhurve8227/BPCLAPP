import React, { useState } from 'react';
import './AS10.css'; // Assuming your CSS file is named `ChecklistForm.css`

const ChecklistFormss = () => {
  const [formData, setFormData] = useState({
    // Page 1 - Tank Truck Checks
    tankTruck: {
      sparkArrestor: false,
      properFittings: false,
      extinguishers: false,
      manifoldValve: false,
      noVisibleDent: false,
    },
    // Page 1 - Electricals
    electricals: {
      junctionBoxes: false,
      looseWiring: false,
      wiringInsulated: false,
      selfStarting: false,
      masterSwitch: false,
      dipoleWiring: false,
    },
    // Page 1 - Tank Fittings
    tankFittings: {
      leakage: false,
    },
    // Page 2 - Loading Memo
    loadingMemo: {
      heightBarrier: false,
      fuelTankGuard: false,
      paintBullet: false,
      firstAidKit: false,
    },
    // Page 3 - Random Checks
    randomChecks: {
      fireExtinguishers: false,
      tremCard: false,
      routeMap: false,
      cceLicence: false,
      rtoPermits: false,
      rlwUlw: false,
      hazchemSign: false,
      externalCorrosion: false,
    },
    // Page 3 - Tank Fittings (Random)
    randomTankFittings: {
      excessFlowCheck: false,
      vaporLinesAnchored: false,
      safetyFittings: false,
      operativeFittings: false,
    },
    // Page 3 - Available in Tank Truck
    availableInTankTruck: {
      flangesBendPipe: false,
      toolsForFittings: false,
      cautionBoards: false,
      defectsCorrected: false,
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit the form data to an API or process it here
  };

  return (
    <div className="checklist-form-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">CHECK LIST FOR BULK LPG TANK TRUCKS AT UNLOADING LOCATION</h3>
        
        {/* Page 1 - Tank Truck Checks */}
        <fieldset className="form-group">
          <legend>On the Tank Truck</legend>
          {Object.keys(formData.tankTruck).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.tankTruck[key] === true}
                  onChange={() => handleChange('tankTruck', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.tankTruck[key] === false}
                  onChange={() => handleChange('tankTruck', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Page 1 - Electricals */}
        <fieldset className="form-group">
          <legend>Electricals</legend>
          {Object.keys(formData.electricals).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.electricals[key] === true}
                  onChange={() => handleChange('electricals', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.electricals[key] === false}
                  onChange={() => handleChange('electricals', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Page 1 - Tank Fittings */}
        <fieldset className="form-group">
          <legend>Tank Fittings</legend>
          <div>
            <label>
              Leakage from any fittings or joints:
              <input
                type="checkbox"
                checked={formData.tankFittings.leakage === true}
                onChange={() => handleChange('tankFittings', 'leakage', true)}
              />
              Yes
              <input
                type="checkbox"
                checked={formData.tankFittings.leakage === false}
                onChange={() => handleChange('tankFittings', 'leakage', false)}
              />
              No
            </label>
          </div>
        </fieldset>

        {/* Page 2 - Loading Memo */}
        <h3 className="form-heading">Page 2: Checks Required Before Issuing Loading Memo</h3>
        <fieldset className="form-group">
          <legend>Tank Truck</legend>
          {Object.keys(formData.loadingMemo).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.loadingMemo[key] === true}
                  onChange={() => handleChange('loadingMemo', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.loadingMemo[key] === false}
                  onChange={() => handleChange('loadingMemo', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Page 2 - General */}
        <fieldset className="form-group">
          <legend>General</legend>
          <div>
            <label>
              First aid kit is available: 
              <input
                type="checkbox"
                checked={formData.loadingMemo.firstAidKit === true}
                onChange={() => handleChange('loadingMemo', 'firstAidKit', true)}
              />
              Yes
              <input
                type="checkbox"
                checked={formData.loadingMemo.firstAidKit === false}
                onChange={() => handleChange('loadingMemo', 'firstAidKit', false)}
              />
              No
            </label>
          </div>
        </fieldset>

        {/* Page 3 - Random Checks */}
        <h3 className="form-heading">Page 3: Random Checks (Minimum One Day, Once a Month)</h3>
        <fieldset className="form-group">
          <legend>Random Checks</legend>
          {Object.keys(formData.randomChecks).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.randomChecks[key] === true}
                  onChange={() => handleChange('randomChecks', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.randomChecks[key] === false}
                  onChange={() => handleChange('randomChecks', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Page 3 - Tank Fittings (Random) */}
        <fieldset className="form-group">
          <legend>Tank Fittings (Random)</legend>
          {Object.keys(formData.randomTankFittings).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.randomTankFittings[key] === true}
                  onChange={() => handleChange('randomTankFittings', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.randomTankFittings[key] === false}
                  onChange={() => handleChange('randomTankFittings', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Page 3 - Available in Tank Truck */}
        <fieldset className="form-group">
          <legend>Available in Tank Truck</legend>
          {Object.keys(formData.availableInTankTruck).map((key) => (
            <div key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: 
                <input
                  type="checkbox"
                  checked={formData.availableInTankTruck[key] === true}
                  onChange={() => handleChange('availableInTankTruck', key, true)}
                />
                Yes
                <input
                  type="checkbox"
                  checked={formData.availableInTankTruck[key] === false}
                  onChange={() => handleChange('availableInTankTruck', key, false)}
                />
                No
              </label>
            </div>
          ))}
        </fieldset>

        {/* Submit Button */}
        <div className="no-print">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChecklistFormss;
