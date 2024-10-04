import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the steps with fields
const steps = [
    {
        title: "Hall for Exhibition",
        fields: [
            { label: "Dimension of the hall (LxB in meters)", required: true, type: "text", helperText: "Dimension of the hall (LxB in meters) As large as possible (Min 15mx15m) Size available : 15m X 10m" },
            { label: "Is it an enclosed hall?", required: true, type: "text", helperText: "Enclosed hall required for safety" },
            { label: "Can the hall be darkened with curtains?", required: true, type: "text", helperText: "Hall should be dark to be able to see plasma properly." },
            { label: "Does the hall have A/C or fans?", required: true, type: "text", helperText: "Cooling is required to keep working models cool" },
            { label: "Is it on the ground floor?", required: true, type: "text", helperText: "Preferably on ground floor." },
            { label: "Is there a storage space for empty exhibit boxes?", required: true, type: "text", helperText: "Storage is preferred for easy access." },
            { label: "No. of 230V (5/15A) power outlets in the hall", required: true, type: "text", helperText: "We will need a minimum of 30 no’s of 230V/5A grounded power outlets." },
            { label: "Tables for placing the exhibits", required: true, type: "text", helperText: "Sturdy tables needed." },
            { label: "Space for VR", required: true, type: "text", helperText: "Min 3m x 3m for one VR exhibit." },
            { label: "WiFi Access", required: true, type: "text", helperText: "WiFi access to all IPR team members." }
        ]
    },
    {
        title: "Hall for lectures/quiz/Tokotoy competition",
        fields: [
            { label: "Area of the hall", required: true, type: "text", helperText: "Should be able to comfortably seat." },
            { label: "Seating capacity", required: true, type: "text", helperText: "Should be able to comfortably seat minimum 50 people." },
            { label: "Does the hall have A/V facilities", required: true, type: "text", helperText: "Requires digital projector and audio system." },
            { label: "Distance of lecture hall from exhibition hall", required: true, type: "text", helperText: "As close to exhibition hall as possible." }
        ]
    },
    {
        title: "Logistics and Accommodation Requirements for the IPR Team",
        fields: [
            { label: "Accommodation for IPR team (8 rooms, A/C, single occupancy)", required: true, type: "text", helperText: "With the new government order stipulating..." },
            { label: "Local transportation for IPR team (Min. 8 people)", required: true, type: "text", helperText: "Host will have to provide airport/railway station pickup/drop." },
            { label: "Secure parking space for IPR truck", required: true, type: "text", helperText: "Preferably within the campus." },
            { label: "Manpower for loading/unloading the exhibits", required: true, type: "text", helperText: "At least FOUR persons will be needed." }
        ]
    },
    {
        title: "Details for the Event Poster",
        fields: [
            { label: "Name of the contact person", required: true, type: "text", helperText: "These details will appear on the event poster." },
            { label: "Mobile Number", required: true, type: "text", helperText: "These details will appear on the event poster." },
            { label: "E-mail", required: true, type: "text", helperText: "These details will appear on the event poster." },
            { label: "Location of the venue", required: true, type: "text", helperText: "Full address of the venue." }
        ]
    },
    {
        title: "Teacher Training Program",
        fields: [
            { label: "Invitation to teachers", required: true, type: "text", helperText: "Minimum number – 25. Maximum number – 50." },
            { label: "Registration", required: true, type: "text", helperText: "Minimum number – 25. Maximum number – 50." },
            { label: "Providing them with writing pad/pen etc", required: true, type: "text", helperText: "Minimum number – 25. Maximum number – 50." },
            { label: "Providing them with tea/lunch", required: true, type: "text", helperText: "Minimum number – 25. Maximum number – 50." }
        ]
    },
    {
        title: "Quiz Programme",
        fields: [
            { label: "Quiz is meant for school students (8-12 classes)", required: true, type: "text", helperText: "Minimum teams 10." },
            { label: "Selection and registration of teams", required: true, type: "text", helperText: "Minimum teams 10." },
            { label: "Arrangements for organizing the quiz", required: true, type: "text", helperText: "Minimum teams 10." },
            { label: "Providing refreshment to participants", required: true, type: "text", helperText: "Minimum teams 10." }
        ]
    }
];

const IPRExForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleInputChange = (index, value) => {
        const updatedFormData = {
            ...formData,
            [`step${currentStep}`]: {
                ...formData[`step${currentStep}`],
                [index]: value,
            },
        };
        setFormData(updatedFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentFields = steps[currentStep].fields;

        // Validate current step
        const isValid = currentFields.every((field, index) => {
            if (field.required && !formData[`step${currentStep}`]?.[index]) {
                alert(`${field.label} is required.`);
                return false;
            }
            return true;
        });

        if (!isValid) return;

        // Proceed to the next step or submit the form
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final validation check for the entire form
            const isFinalValid = steps.every((step, stepIndex) => {
                return step.fields.every((field, fieldIndex) => {
                    if (field.required && !formData[`step${stepIndex}`]?.[fieldIndex]) {
                        alert(`${field.label} is required.`);
                        return false;
                    }
                    return true;
                });
            });

            if (isFinalValid) {
                console.log("Form submitted:", formData);
                navigate('/submit'); // Adjust the path as needed
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="bg-gray-100 p-12 flex justify-center items-center h-full w-auto">
            <div className="bg-white p-8 border border-blue-500 rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Exhibition Form for IPR Scientific Visit</h1>

                {/* Stepper */}
                <ol className="flex justify-between items-center w-full text-sm text-gray-500 font-medium sm:text-base mt-8 mb-8 relative">
                    {[...Array(steps.length)].map((_, index) => (
                        <li key={index} className={`relative ${index === currentStep ? 'text-blue-700' : 'text-gray-600'}`}>
                            <span className={`w-10 h-10 flex justify-center items-center ${index <= currentStep ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'} border border-gray-200 rounded-full`}>
                                {index + 1}
                            </span>
                            {index < steps.length - 1 && (
                                <span className={`absolute rounded-xl h-0.5 ml-12 top-1/2 transform -translate-y-1/2 ${index < currentStep ? 'bg-blue-700' : 'bg-gray-300'} transition-all duration-300`}
                                    style={{ width: '500%' }}></span>
                            )}
                        </li>
                    ))}
                </ol>

                <h1 className="text-xl rounded-lg bg-blue-600 p-2 mb-2 font-bold text-white text-left">{steps[currentStep].title}</h1>

                <form onSubmit={handleSubmit}>
                    {steps[currentStep].fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                            <input
                                type={field.type}
                                value={formData[`step${currentStep}`]?.[index] || ""}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                                required={field.required}
                            />
                            <small className="text-gray-500">{field.helperText}</small>
                        </div>
                    ))}

                    <div className="flex justify-between">
                        <button type="button" onClick={handlePrevious} className="mt-4 text-blue-500 hover:text-blue-700">Previous</button>
                        <button type="submit" className="mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded py-2 px-4">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPRExForm;