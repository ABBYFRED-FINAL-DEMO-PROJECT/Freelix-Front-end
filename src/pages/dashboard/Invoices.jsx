import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline,
  SaveAlt,
  Edit,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { jsPDF } from "jspdf";

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: "",
    clientName: "",
    clientAddress: "",
    clientContact: "",
    bankDetails: "",
    termsAndConditions: "",
    companyName: "",
    companyAddress: "",
    companyContact: "",
    companyLogo: null,
    items: [{ description: "", quantity: 1, rate: 0 }],
    taxRate: 0.06,
    paymentInfo: "",
    eSignature: null,
  });

  const [preview, setPreview] = useState(false);
  const invoiceRef = useRef();

  const handleChange = (e, index, field) => {
    if (index !== undefined) {
      const updatedItems = [...invoiceData.items];
      updatedItems[index][field] = e.target.value;
      setInvoiceData({ ...invoiceData, items: updatedItems });
    } else {
      const { name, value } = e.target;
      setInvoiceData({ ...invoiceData, [name]: value });
    }
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setInvoiceData({ ...invoiceData, companyLogo: URL.createObjectURL(file) });
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    setInvoiceData({ ...invoiceData, eSignature: URL.createObjectURL(file) });
  };

  const calculateSubTotal = () =>
    invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);

  const calculateTax = () => calculateSubTotal() * invoiceData.taxRate;

  const calculateTotal = () => calculateSubTotal() + calculateTax();

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(12);
  
    // Beige background
    doc.setFillColor(245, 245, 220);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
  
    // Header Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(invoiceData.companyName || "Company Name", 20, 20);
    if (invoiceData.companyLogo) {
      doc.addImage(invoiceData.companyLogo, "PNG", 150, 10, 40, 40);
    }
    
    // Invoice Details
    doc.text(`INVOICE NO: ${invoiceData.invoiceNumber || "0000"}`, 20, 40);
    doc.text(`DATE: ${invoiceData.date || new Date().toLocaleDateString()}`, 20, 50);
  
    // Client Information
    doc.text("ISSUED TO:", 20, 70);
    doc.text(invoiceData.clientName || "Client Name", 20, 80);
    doc.text(invoiceData.clientAddress || "Client Address", 20, 90);
    doc.text(invoiceData.clientContact || "Client Contact", 20, 100);
  
    // Items Table
    doc.setFontSize(12);
    doc.text("DESCRIPTION", 20, 120);
    doc.text("QTY", 110, 120);
    doc.text("UNIT PRICE", 140, 120);
    doc.text("TOTAL", 170, 120);
  
    let yPosition = 130;
    invoiceData.items.forEach((item, index) => {
      doc.text(item.description || "Item", 20, yPosition);
      doc.text(`${item.quantity || 1}`, 110, yPosition);
      doc.text(`$${(item.rate || 0).toFixed(2)}`, 140, yPosition);
      doc.text(`$${(item.quantity * item.rate || 0).toFixed(2)}`, 170, yPosition);
      yPosition += 10;
    });
  
    // Subtotal, Tax, Total
    yPosition += 10;
    doc.setFontSize(10);
    doc.text(`SUBTOTAL: $${calculateSubTotal().toFixed(2)}`, 140, yPosition);
    yPosition += 10;
    doc.text(`TAX: $${calculateTax().toFixed(2)}`, 140, yPosition);
    yPosition += 10;
    doc.text(`TOTAL: $${calculateTotal().toFixed(2)}`, 140, yPosition);
  
    // Bank Details
    yPosition += 20;
    doc.text("BANK DETAILS", 20, yPosition);
    doc.text(invoiceData.bankDetails || "Bank details", 20, yPosition + 10);
  
    // Terms & Conditions
    yPosition += 20;
    doc.text("TERMS & CONDITIONS", 20, yPosition);
    doc.text(invoiceData.termsAndConditions || "Terms", 20, yPosition + 10);
  
    // Signature
    if (invoiceData.eSignature) {
      doc.addImage(invoiceData.eSignature, "PNG", 20, yPosition + 30, 40, 20);
    }
  
    // Download
    doc.save(`Invoice-${invoiceData.invoiceNumber || "0000"}.pdf`);
  };
  

  const handlePreview = () => {
    setPreview(true);
  };

  const handleEdit = () => {
    setPreview(false);
  };

  return (
    <Container sx={{ overflowX: "hidden", paddingLeft: 0, paddingRight: 0 }}>
      <Box
        sx={{
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          maxWidth: "100%",
          margin: "auto",
          mt: 4,
        }}
      >
        {!preview ? (
          <>
            <Typography
              variant="h4"
              color="#00796B"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              Invoice Form
            </Typography>

            <Typography variant="h6" mt={2}>
              {" "}
              {/* Adjust mt to add space */}
              Company Information
            </Typography>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={invoiceData.companyName}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Address"
                  name="companyAddress"
                  value={invoiceData.companyAddress}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Contact"
                  name="companyContact"
                  value={invoiceData.companyContact}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                {!invoiceData.companyLogo ? (
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: "40%",
                      color: "#00796B",
                    }}
                  >
                    Upload Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={invoiceData.companyLogo}
                      alt="Logo"
                      style={{ width: 100, height: 100, marginRight: 10 }}
                    />
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        width: "auto",
                        color: "#00796B",
                      }}
                    >
                      Change Logo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Typography variant="h6" mt={4}>
              Client Information
            </Typography>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Address"
                  name="clientAddress"
                  value={invoiceData.clientAddress}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Contact"
                  name="clientContact"
                  value={invoiceData.clientContact}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" mt={4}>
              Invoice Details
            </Typography>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  value={invoiceData.date}
                  onChange={handleChange}
                  size="small"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" mt={4}>
              Invoice Items
            </Typography>

            
            {invoiceData.items.map((item, index) => (
              <Grid
                container
                spacing={2}
                mt={1}
                key={index}
                alignItems="center"
              >
                <Grid item xs={12} sm={5} md={5}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleChange(e, index, "description")}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index, "quantity")}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">#</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <TextField
                    fullWidth
                    label="Rate"
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleChange(e, index, "rate")}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={1} md={1}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                    sx={{ mt: 1 }} // Align icon with input fields
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={handleAddItem}
                  sx={{
                    backgroundColor: "white",
                    color: "#00796B",
                    mt: 2, // Optional: adds margin to the left of the button
                    "&:hover": {
                      backgroundColor: "#00796B", // Keeps the background the same on hover
                      color: "white", // Keeps the color the same on hover
                    },
                  }}
                >
                  <AddCircleOutline />
                </IconButton>
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Box>
                <Typography variant="h6" mt={3}>
                  Totals
                </Typography>
                <Typography variant="body1">
                  Subtotal: ${calculateSubTotal().toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Tax: ${calculateTax().toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" mt={4}>Additional Information</Typography>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Details"
                  name="bankDetails"
                  value={invoiceData.bankDetails}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Payment Info"
                  name="paymentInfo"
                  value={invoiceData.paymentInfo}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Terms and Conditions"
                  name="termsAndConditions"
                  value={invoiceData.termsAndConditions}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" mt={4}>Signature</Typography>
            <Grid container spacing={1} mt={0}>
              <Grid item xs={12}>
                {!invoiceData.eSignature ? (
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: "40%",
                      color: "#00796B",
                    }}
                  >
                    Upload Signature
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleSignatureChange}
                    />
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={invoiceData.eSignature}
                      alt="Signature"
                      style={{ width: 100, height: 50, marginRight: 10 }}
                    />
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        width: "auto",
                        color: "#00796B",
                      }}
                    >
                      Change eSignature
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleSignatureChange}
                      />
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handlePreview}
                sx={{
                  backgroundColor: "#00796B",
                  color: "white",
                }}
              >
                Preview
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Box ref={invoiceRef} p={3}>
              <Typography variant="h4">{invoiceData.companyName}</Typography>
              <Typography variant="body1">
                {invoiceData.companyAddress}
              </Typography>
              <Typography variant="body1">
                Contact: {invoiceData.companyContact}
              </Typography>

              {invoiceData.companyLogo && (
                <img
                  src={invoiceData.companyLogo}
                  alt="Logo"
                  style={{ width: 100, height: 100 }}
                />
              )}

              <Typography variant="h6" mt={2}>
                Invoice Details
              </Typography>
              <Typography variant="body1">
                Invoice Number: {invoiceData.invoiceNumber}
              </Typography>
              <Typography variant="body1">Date: {invoiceData.date}</Typography>

              <Typography variant="h6" mt={2}>
                Client Information
              </Typography>
              <Typography variant="body1">
                Name: {invoiceData.clientName}
              </Typography>
              <Typography variant="body1">
                Address: {invoiceData.clientAddress}
              </Typography>
              <Typography variant="body1">
                Contact: {invoiceData.clientContact}
              </Typography>

              <Typography variant="h6" mt={2}>
                Items
              </Typography>
              {invoiceData.items.map((item, index) => (
                <Typography key={index} variant="body1">
                  {item.description} - {item.quantity} x ${item.rate} = $
                  {(item.quantity * item.rate).toFixed(2)}
                </Typography>
              ))}

              <Typography variant="body1" mt={2}>
                Subtotal: ${calculateSubTotal().toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Tax: ${calculateTax().toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>

              <Typography variant="h6" mt={2}>
                Bank Details
              </Typography>
              <Typography variant="body1">{invoiceData.bankDetails}</Typography>

              <Typography variant="h6" mt={2}>
                Payment Info
              </Typography>
              <Typography variant="body1">{invoiceData.paymentInfo}</Typography>

              <Typography variant="h6" mt={2}>
                Terms & Conditions
              </Typography>
              <Typography variant="body1">
                {invoiceData.termsAndConditions}
              </Typography>

              {invoiceData.eSignature && (
                <img
                  src={invoiceData.eSignature}
                  alt="eSignature"
                  style={{ width: 100, height: 50, marginTop: 10 }}
                />
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 20, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                startIcon={<Edit />}
                sx={{
                  backgroundColor: "#00796B",
                  color: "white",
                }}
              >
                Edit Invoice
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                startIcon={<SaveAlt />}
                sx={{
                  backgroundColor: "#00796B",
                  color: "white",
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Invoices;
