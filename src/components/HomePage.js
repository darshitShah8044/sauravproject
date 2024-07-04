import React, { useState, useEffect } from "react";
import HybridDropdown from "./HybridDropdown"; // Adjust the import path as necessary

const HomePage = () => {
  const initialState = {
    num: "",
    stockID: "",
    ourStock: "",
    lab: "",
    certificate: "",
    companyName: "",
    shape: "",
    size: "",
    color: "",
    clarity: "",
    cut: "",
    pol: "",
    sym: "",
    fl: "",
    rap: "",
    bDis: "",
    bPC: "",
    bAmount: "",
    sellDis: "",
    sellPC: "",
    amount: "",
    fivePercent: "",
    labCost: "",
    otherCh: "",
    expoC: "",
    totalSell: "",
    rate: "",
    rsAmount: "",
    billAmount: "",
    expoRate: "",
    broker: "",
    expoNum: "",
    through: "",
    type: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const { rap, bDis, size, sellDis } = formData;

    const numericRap = parseFloat(rap) || 0;
    const numericBDis = parseFloat(bDis) || 0;
    const numericSize = parseFloat(size) || 0;
    const numericSellDis = parseFloat(sellDis) || 0;

    const bPC = numericRap + numericRap * (numericBDis / 100);
    const bAmount = bPC * numericSize;
    const sellPC = numericRap + numericRap * (numericSellDis / 100);
    const amount = sellPC * numericSize;
    const fivePercent = amount * 0.05;

    setFormData((prevState) => ({
      ...prevState,
      bPC: bPC.toFixed(2),
      bAmount: bAmount.toFixed(2),
      sellPC: sellPC.toFixed(2),
      amount: amount.toFixed(2),
      fivePercent: fivePercent.toFixed(2),
    }));
  }, [formData.rap, formData.bDis, formData.size, formData.sellDis]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const jsonString = JSON.stringify(formData);
      console.log("JSON Stringified data:", jsonString);

      fetch("http://localhost:5000/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(
                `Network response was not ok: ${response.statusText}, ${error.message}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // Optionally reset form state after successful submission
          setFormData(initialState);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(`There was an error submitting the form: ${error.message}`);
        });
    } catch (error) {
      console.error("Error stringifying data:", error);
      alert(`Error stringifying data: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-3xl mx-auto bg-gray-100 w-full rounded-lg shadow-md"
    >
      <div className="grid grid-cols-5 w-full">
        {Object.keys(initialState).map((key) => (
          <div key={key} className="mb-6 m-2">
            {["lab", "shape", "through", "type"].includes(key) ? (
              <HybridDropdown
                label={key.replace(/([A-Z])/g, " $1")}
                name={key}
                formData={formData}
                handleChange={handleChange}
                options={
                  key === "lab"
                    ? [
                        { value: "igi", label: "IGI" },
                        { value: "gia", label: "GIA" },
                        { value: "other", label: "Other" },
                      ]
                    : key === "shape"
                    ? [
                        { value: "round", label: "Round" },
                        { value: "oval", label: "Oval" },
                        { value: "emerald", label: "Square" },
                        { value: "heart", label: "Heart" },
                        { value: "cushion", label: "Cushion Modified" },
                      ]
                    : key === "through"
                    ? [
                        { value: "dealer", label: "Dealer" },
                        { value: "broker", label: "Broker" },
                      ]
                    : key === "type"
                    ? [
                        { value: "type1", label: "Type 1" },
                        { value: "type2", label: "Type 2" },
                      ]
                    : []
                }
              />
            ) : (
              <div>
                <label
                  htmlFor={key}
                  className="block mb-2 text-lg font-medium text-blue-600 capitalize"
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default HomePage;
