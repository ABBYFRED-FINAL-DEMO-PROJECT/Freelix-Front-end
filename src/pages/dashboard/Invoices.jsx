import React, { useState, useRef } from 'react';
import {
  Box, Button, Container, Grid, TextField, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline, SaveAlt } from '@mui/icons-material';

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    clientName: '',
    clientAddress: '',
    bankDetails: '',
    items: [
      { description: '', quantity: 1, rate: 0 },
    ],
    taxRate: 0.06, // 6% sales tax
  });

  const navigate = useNavigate();
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
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0 }],
    });
  };

  const calculateSubTotal = () =>
    invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);

  const calculateTax = () => calculateSubTotal() * invoiceData.taxRate;

  const calculateTotal = () => calculateSubTotal() + calculateTax();

  const handlePreview = () => {
    if (invoiceData.invoiceNumber.trim()) {
      navigate(`/invoice-preview/${invoiceData.invoiceNumber}`, { state: { invoiceData } });
    } else {
      alert('Please enter a valid invoice number before previewing.');
    }
  };

  return (
    <Container>
      <Box
        ref={invoiceRef}
        sx={{
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          maxWidth: 800,
          margin: 'auto',
          mt: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" color="#00796B" fontWeight="bold">
            Invoice
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Invoice Number"
                placeholder="Enter invoice number (e.g., INV-12345)"
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
    type="date"
    value={invoiceData.date}
    onChange={handleChange}
    size="small"
    InputLabelProps={{
      shrink: true, // Ensures the label stays above the input field
    }}
  />
</Grid>

          </Grid>
        </Box>

        {/* Client Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Bill To:</Typography>
          <TextField
            fullWidth
            label="Client Name"
            placeholder="Enter client's full name"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleChange}
            size="small"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Client Address"
            placeholder="Enter client's address (e.g., 123 Main St, City, State)"
            name="clientAddress"
            value={invoiceData.clientAddress}
            onChange={handleChange}
            size="small"
          />
        </Box>

        {/* Itemized Charges */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 100 }}>Description</TableCell>
                <TableCell sx={{ minWidth: 60 }}>Quantity</TableCell>
                <TableCell sx={{ minWidth: 60 }}>Rate</TableCell>
                <TableCell sx={{ minWidth: 80 }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ wordBreak: 'break-word' }}>
                    <TextField
                      fullWidth
                      placeholder="Enter item/service description"
                      value={item.description}
                      onChange={(e) => handleChange(e, index, 'description')}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      placeholder="Enter quantity"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, index, 'quantity')}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      placeholder="Enter rate per unit"
                      value={item.rate}
                      onChange={(e) => handleChange(e, index, 'rate')}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    ${item.quantity * item.rate}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <IconButton color="primary" onClick={handleAddItem}>
                    <AddCircleOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals */}
        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <Typography variant="body1">Subtotal: ${calculateSubTotal().toFixed(2)}</Typography>
          <Typography variant="body1">Sales Tax: ${calculateTax().toFixed(2)}</Typography>
          <Typography variant="h6" fontWeight="bold">
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
        </Box>

        {/* Bank Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Payment Information:</Typography>
          <TextField
            fullWidth
            label="Bank Details"
            placeholder="Enter bank details (e.g., Bank Name, Account Number)"
            name="bankDetails"
            value={invoiceData.bankDetails}
            onChange={handleChange}
            size="small"
            multiline
            rows={2}
          />
        </Box>

        {/* Preview Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#00796B', color: '#fff' }}
            startIcon={<SaveAlt />}
            onClick={handlePreview}
          >
            Preview Invoice
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Invoices;
