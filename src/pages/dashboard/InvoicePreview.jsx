import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, Grid, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { SaveAlt } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

const InvoicePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceData = location.state?.invoiceData || null;
  const previewRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `Invoice-${invoiceData?.invoiceNumber || 'Preview'}`,
  });

  if (!invoiceData) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          No invoice data found. Please fill out the invoice form first.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/invoices')} sx={{ mt: 2 }}>
          Back to Invoice Form
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        ref={previewRef}
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
              <Typography variant="body1">
                <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="right">
              <Typography variant="body1">
                <strong>Date:</strong> {invoiceData.date}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Client Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Bill To:</Typography>
          <Typography variant="body1">{invoiceData.clientName}</Typography>
          <Typography variant="body2">{invoiceData.clientAddress}</Typography>
        </Box>

        {/* Itemized Charges */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.rate}</TableCell>
                  <TableCell>${(item.quantity * item.rate).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals */}
        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <Typography variant="body1">Subtotal: ${invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0).toFixed(2)}</Typography>
          <Typography variant="body1">Sales Tax: ${(invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0) * invoiceData.taxRate).toFixed(2)}</Typography>
          <Typography variant="h6" fontWeight="bold">
            Total: ${(invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0) * (1 + invoiceData.taxRate)).toFixed(2)}
          </Typography>
        </Box>

        {/* Bank Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Payment Information:</Typography>
          <Typography variant="body2">{invoiceData.bankDetails}</Typography>
        </Box>

        {/* Print Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#00796B', color: '#fff' }}
            startIcon={<SaveAlt />}
            onClick={handlePrint}
          >
            Save & Download Invoice
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default InvoicePreview;
