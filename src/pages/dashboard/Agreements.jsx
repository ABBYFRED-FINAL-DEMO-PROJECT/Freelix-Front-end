import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";

const Agreements= () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const componentRef = useRef(null);
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    freelancerName: "",
    freelancerCompany: "",
    freelancerAddress: "",
    startDate: "",
    endDate: "",
    budget: "",
    paymentTerms: "",
    projectDetails: "",
    deliverables: "",
    revisions: "2",
    freelancerSignature: null,
    clientSignature: null,
    date: format(new Date(), "MMMM dd, yyyy"),
  });

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Freelance_Agreement_${formData.projectName}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html, body {
          height: 100%;
        }
        .print\\:p-16 {
          padding: 4rem;
        }
        .print\\:break-after-page {
          break-after: page;
        }
        .print\\:block {
          display: block;
        }
      }
    `,
    onBeforeGetContent: () => {
      setShowPreview(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      if (!showPreview) {
        setShowPreview(false);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignatureUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const PageNumber = ({ pageNumber }) => (
    <div className="absolute bottom-8 w-full text-center text-gray-500 print:block hidden">
      Page {pageNumber}
    </div>
  );

  const pages = [
    // Page 1
    <div key="page1" className="print:p-16 p-8 bg-white relative min-h-[1056px]">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="font-bold text-xl">FREELANCE SERVICES AGREEMENT</h3>
            <p className="text-sm text-gray-600">{formData.date}</p>
          </div>
        </div>
        <div className="text-sm text-right">
          <p>{formData.freelancerAddress}</p>
          <p>Reference: {formData.projectName || '[Project Reference]'}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-6">This Freelance Services Agreement ("Agreement") is entered into by and between:</p>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="font-semibold">FREELANCER:</h4>
            <div className="space-y-2">
              <input
                type="text"
                name="freelancerName"
                value={formData.freelancerName}
                onChange={(e) => {
                    handleInputChange(e, "freelancerName");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                placeholder="Freelancer Name"
              />
              <input
                type="text"
                name="freelancerCompany"
                value={formData.freelancerCompany}
                onChange={(e) => {
                    handleInputChange(e, "freelancerCompany");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                placeholder="Company Name"
              />
              <textarea
                name="freelancerAddress"
                value={formData.freelancerAddress}
                onChange={(e) => {
                    handleInputChange(e, "freelancerAddress");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                placeholder="Address"
                rows="2"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">CLIENT:</h4>
            <div className="space-y-2">
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={(e) => {
                    handleInputChange(e, "clientName");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full  resize-none overflow-hidden focus:border-gray-500 outline-none py-1"
                placeholder="Client Name"
              />
              <input
                type="text"
                name="clientCompany"
                value={formData.clientCompany}
                onChange={(e) => {
                    handleInputChange(e, "clientCompany");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                placeholder="Company Name"
              />
              <textarea
                name="clientAddress"
                value={formData.clientAddress}
                onChange={(e) => {
                    handleInputChange(e, "clientAddress");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                placeholder="Address"
                rows="2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">1. PROJECT DETAILS</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name:</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={(e) => {
                    handleInputChange(e, "projectName");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                  className="w-full resize-none overflow-hidden focus:border-gray-500 outline-none py-1"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Project Description:</label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={(e) => {
                    handleInputChange(e, "projectDetails");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                  className="w-full  resize-none overflow-hidden focus:border-gray-500 outline-none py-1"
                  rows="4"
                  placeholder="Detailed description of the project..."
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">2. DELIVERABLES</h2>
            <textarea
              name="deliverables"
              value={formData.deliverables}
              onChange={(e) => {
                handleInputChange(e, "deliverables");
                e.target.style.height = "auto"; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
              }}
              className="w-full resize-none overflow-hidden focus:border-gray-500 outline-none py-1"
              rows="4"
              placeholder="List all project deliverables..."
            />
          </div>
        </div>
      </div>
      <PageNumber pageNumber={1} />
    </div>,

    // Page 2
    <div key="page2" className="print:p-16 p-8 bg-white relative min-h-[1056px]">
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">3. TIMELINE AND PAYMENT</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) => {
                    handleInputChange(e, "startDate");
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                    e.target.placeholder = formData.startDate;
                  }}
                  className="w-full  focus:border-gray-500 outline-none py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => {
                    handleInputChange(e, "endDate");
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                    e.target.placeholder = formData.endDate;
                  }}
                  className="w-full  focus:border-gray-500 outline-none py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Total Budget:</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => {
                    handleInputChange(e, "budget");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                  className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                  placeholder="Enter total budget"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Terms:</label>
                <input
                  type="text"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => {
                    handleInputChange(e, "paymentTerms");
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to content height
                  }}
                  className="w-full overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                  placeholder="e.g., 50% upfront, 50% upon completion"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">4. TERMS AND CONDITIONS</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">4.1 Intellectual Property Rights</h3>
              <p className="text-sm text-gray-600">
                Upon receipt of full payment, the Freelancer assigns to the Client all intellectual 
                property rights, including copyright, in the deliverables created specifically for 
                the Client under this Agreement. The Freelancer retains rights to any pre-existing 
                materials used in the deliverables.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">4.2 Confidentiality</h3>
              <p className="text-sm text-gray-600">
                Both parties agree to keep confidential all information received from the other party 
                and marked as confidential. This includes, but is not limited to, business strategies, 
                customer data, and proprietary processes.
              </p>
            </div>

            <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">4.3 Portfolio Rights</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The Freelancer may include a description of the services provided
              under this Agreement in their portfolio and marketing materials,
              unless explicitly prohibited by a separate non-disclosure agreement.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">4.4 Non-Compete</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              During the term of this Agreement and for 6 months thereafter, the
              Freelancer agrees not to directly compete with the specific project
              scope outlined in this Agreement.
            </p>
          </div>
        </div>

            <div>
              <h3 className="font-medium mb-2">4.5 Revisions</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Number of included revisions:</span>
                <input
                  type="number"
                  name="revisions"
                  value={formData.revisions}
                  onChange={handleInputChange}
                  className="w-20 overflow-hidden resize-none focus:border-gray-500 outline-none py-1"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            
          </div>
        </div>
      </div>
      <PageNumber pageNumber={2} />
    </div>,

    // Page 3
    <div key="page3" className="print:p-16 p-8 bg-white relative min-h-[1056px]">

<div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">4.6 Standard Terms</h3>
          <div className="prose prose-gray">
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                All work will remain the property of the client upon receipt of
                full payment.
              </li>
              <li>
                The freelancer reserves the right to use the work in their
                portfolio.
              </li>
              <li>
                This agreement can be terminated by either party with 14 days
                written notice.
              </li>
              <li>
                Any additional work beyond the agreed scope will be billed
                separately.
              </li>
              <li>
                The client agrees to provide all necessary materials and
                feedback in a timely manner.
              </li>
            </ul>
          </div>
        </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mt-10 mb-6">5. SIGNATURES</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-medium">Freelancer:</h3>
              <div>
                {!formData.freelancerSignature ? (
                  <>
                    <label className="block text-sm font-medium mb-2">Upload Signature:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload("freelancerSignature")}
                      className="w-full"
                    />
                  </>
                ) : (
                  <div className="border-b border-gray-300 py-2">
                    <img
                      src={formData.freelancerSignature}
                      alt="Freelancer Signature"
                      className="max-h-16"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-sm">Name: {formData.freelancerName}</p>
                  <p className="text-sm">Date: {formData.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Client:</h3>
              <div>
                {!formData.clientSignature ? (
                  <>
                    <label className="block text-sm font-medium mb-2">Upload Signature:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload("clientSignature")}
                      className="w-full"
                    />
                  </>
                ) : (
                  <div className="border-b border-gray-300 py-2">
                    <img
                      src={formData.clientSignature}
                      alt="Client Signature"
                      className="max-h-16"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-sm">Name: {formData.clientName}</p>
                  <p className="text-sm">Date: {formData.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageNumber pageNumber={3} />
    </div>,
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Freelance Agreement Generator
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (currentPage === pages.length) {
                setShowPreview(!showPreview);
              } else {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {currentPage === pages.length
              ? showPreview
                ? "Hide Preview"
                : "Show Preview"
              : "Preview Next Page"}
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clipRule="evenodd"
              />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      <div ref={componentRef} className="bg-white shadow-xl rounded-lg overflow-hidden">
        {showPreview ? (
          pages.map((page, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0">
              {page}
            </div>
          ))
        ) : (
          pages[currentPage - 1]
        )}
      </div>

      {!showPreview && (
        <div className="flex justify-center items-center gap-4 mt-8 print:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
          >
            Previous
          </button>
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
            disabled={currentPage === pages.length}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Agreements;