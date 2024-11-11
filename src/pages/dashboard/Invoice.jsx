import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    logo: "",
    logoImage: null,
    companyInfo: "Your Company Name\nAddress Line 1\nAddress Line 2",
    invoiceDate: new Date().toLocaleDateString(),
    invoiceNumber: "0001",
    clientDetails: "Client Name\nClient Address\nCity, State, Zip",
    items: [{ description: "", quantity: "", rate: "", amount: "" }],
    taxRate: 0,
    paymentInfo: "Bank Account Details or Payment Instructions",
    terms: "Terms & Conditions go here.",
    signature: "",
    signatureImage: null,
    isCompanyInfoEditable: true,
    isClientDetailsEditable: true,
    isPaymentInfoEditable: true,
    isTermsEditable: true,
  });

  // Handlers
  const handleInputChange = (e, field) => {
    setInvoiceData({ ...invoiceData, [field]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({ ...invoiceData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRow = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: "", quantity: "", rate: "", amount: "" },
      ],
    });
  };

  const handleRemoveRow = (index) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleItemChange = (e, index, field) => {
    const updatedItems = invoiceData.items.map((item, i) =>
      i === index ? { ...item, [field]: e.target.value } : item
    );
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  // Calculations
  // Calculations
// Calculations
const calculateSubtotal = () =>
  invoiceData.items.reduce(
    (total, item) =>
      total + (parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)),
    0
  );

const calculateTax = () => {
  const taxRate = parseFloat(invoiceData.taxRate) || 6;
  return calculateSubtotal() * (taxRate / 100);
};

const calculateTotal = () => calculateSubtotal() + calculateTax();


  // Toggle editable state
  const toggleEditable = (field) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const downloadPDF = () => {
    const invoiceElement = document.getElementById("invoice");
  
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };
  

  // JSX layout
  return (
    <div id="invoice" className="p-4 sm:p-6 md:p-8 bg-white max-w-3xl mx-auto shadow-lg rounded-lg border border-gray-300">
      {/* Header with Logo and Company Info */}
      <div className="flex flex-col sm:flex-row items-center border-b border-gray-300 pb-4 mb-4">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">Company Info</h3>
          {invoiceData.isCompanyInfoEditable ? (
            <textarea
              value={invoiceData.companyInfo}
              onChange={(e) => handleInputChange(e, "companyInfo")}
              placeholder="Company Info"
              className="w-full text-sm text-gray-700 bg-gray-50 p-2 rounded-md focus:bg-white focus:border focus:border-blue-500 focus:outline-none transition-colors"
            />
          ) : (
            <p
              onClick={() => toggleEditable("isCompanyInfoEditable")}
              className="w-full text-sm text-gray-700"
            >
              {invoiceData.companyInfo}
            </p>
          )}
        </div>
        <div className="flex-1 text-center mb-4 sm:mb-0">
          {invoiceData.logoImage ? (
            <div
              className="cursor-pointer"
              onClick={() =>
                setInvoiceData({ ...invoiceData, logoImage: null })
              }
            >
              <img
                src={invoiceData.logoImage}
                alt="Logo"
                className="w-24 h-24 object-contain mx-auto"
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={invoiceData.logo}
                onChange={(e) => handleInputChange(e, "logo")}
                placeholder="Logo Text"
                className="text-2xl font-bold text-gray-800"
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "logoImage")}
                className="mt-2 text-sm"
              />
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/3 text-right flex flex-col items-end">
          <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
          <input
            type="date"
            value={invoiceData.invoiceDate}
            onChange={(e) => handleInputChange(e, "invoiceDate")}
            className="text-sm text-gray-600 mt-2 w-full sm:w-auto"
          />
          <input
            type="text"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInputChange(e, "invoiceNumber")}
            placeholder="Invoice Number"
            className="text-sm text-gray-600 mt-2 w-full sm:w-auto text-right"
          />
        </div>
      </div>

      {/* Client Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Bill To:</h3>
        {invoiceData.isClientDetailsEditable ? (
          <textarea
            value={invoiceData.clientDetails}
            onChange={(e) => handleInputChange(e, "clientDetails")}
            placeholder="Client Details"
            className="w-full text-sm text-gray-700 bg-gray-50 p-2 rounded-md focus:bg-white focus:border focus:border-blue-500 focus:outline-none transition-colors"
          />
        ) : (
          <p
            onClick={() => toggleEditable("isClientDetailsEditable")}
            className="w-full text-sm text-gray-700"
          >
            {invoiceData.clientDetails}
          </p>
        )}
      </div>

      {/* Invoice Items */}
      <div>
      <div className="w-full overflow-x-auto mb-6 border border-gray-300 rounded-md">
  <table className="min-w-full text-sm text-left text-gray-700">
    <thead className="bg-gray-100 text-gray-800">
      <tr>
        <th className="py-2 px-4">Description</th>
        <th className="py-2 px-4 text-right">Quantity</th>
        <th className="py-2 px-4 text-right">Rate</th>
        <th className="py-2 px-4 text-right">Amount</th>
        <th className="py-2 px-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {invoiceData.items.map((item, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <td className="py-2 px-4">
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleItemChange(e, index, "description")}
              className="w-full p-1 border rounded focus:border-blue-500 focus:outline-none"
            />
          </td>
          <td className="py-2 px-4 text-right">
            <input
              type="text"
              value={item.quantity}
              onChange={(e) => handleItemChange(e, index, "quantity")}
              className="w-full p-1 text-right border rounded focus:border-blue-500 focus:outline-none"
            />
          </td>
          <td className="py-2 px-4 text-right">
            <input
              type="number"
              value={item.rate}
              onChange={(e) => handleItemChange(e, index, "rate")}
              className="w-full p-1 text-right border rounded focus:border-blue-500 focus:outline-none"
            />
          </td>
          <td className="py-2 px-4 text-right">
            ${(item.quantity * item.rate || 0).toFixed(2)}
          </td>
          <td className="py-2 px-4 text-right">
            <button
              onClick={() => handleRemoveRow(index)}
              className="text-red-500 font-extrabold hover:text-red-700"
            >
              &minus;
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <div className="flex justify-end">
          <button
            onClick={handleAddRow}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <span className="text-xl font-bold mr-1">+</span> Add Item
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="text-right mb-6">
  <div className="py-1">
    <span className="font-semibold text-gray-800">Subtotal:</span> $
    {calculateSubtotal().toFixed(2)}
  </div>
  <div className="py-1">
    <span className="font-semibold text-gray-800">Tax:</span> $
    {calculateTax().toFixed(2)}
  </div>
  <div className="py-2 text-lg font-bold border-t border-gray-300 mt-2">
    <span>Total:</span> ${calculateTotal().toFixed(2)}
  </div>
</div>


      {/* Payment Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Payment Info:</h3>
        {invoiceData.isPaymentInfoEditable ? (
          <textarea
            value={invoiceData.paymentInfo}
            onChange={(e) => handleInputChange(e, "paymentInfo")}
            placeholder="Payment Info"
            className="w-full text-sm text-gray-700 bg-gray-50 p-2 rounded-md focus:bg-white focus:border focus:border-blue-500 focus:outline-none transition-colors"
          />
        ) : (
          <p
            onClick={() => toggleEditable("isPaymentInfoEditable")}
            className="w-full text-sm text-gray-700"
          >
            {invoiceData.paymentInfo}
          </p>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
  <div className="md:w-1/2 w-full">
    <h3 className="text-lg font-semibold text-gray-800">Terms & Conditions:</h3>
    {invoiceData.isTermsEditable ? (
      <textarea
        value={invoiceData.terms}
        onChange={(e) => handleInputChange(e, "terms")}
        className="w-full text-sm text-gray-700 bg-gray-50 p-2 rounded-md focus:bg-white focus:border focus:border-blue-500 focus:outline-none transition-colors"
      />
    ) : (
      <p
        onClick={() => toggleEditable("isTermsEditable")}
        className="w-full text-sm text-gray-700"
      >
        {invoiceData.terms}
      </p>
    )}
  </div>

  <div className="md:w-1/3 w-full mt-4 md:mt-0 text-right">
    <h3 className="text-lg font-semibold text-gray-800">Signature:</h3>
    {invoiceData.signatureImage ? (
      <div
        className="cursor-pointer"
        onClick={() => setInvoiceData({ ...invoiceData, signatureImage: null })}
      >
        <img
          src={invoiceData.signatureImage}
          alt="Signature"
          className="w-24 h-12 object-contain mx-auto"
        />
      </div>
    ) : (
      <div>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "signatureImage")}
          className="mt-2 text-sm"
        />
      </div>
    )}
  </div>
</div>
<div className="flex justify-end">
<button
  onClick={downloadPDF}
  className="bg-[#00796B] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
>
  Download PDF
</button>
</div>


    </div>
  );
};

export default Invoice;
