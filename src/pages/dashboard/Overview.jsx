// src/pages/dashboard/Overview.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const Overview = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Example Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 Active Projects
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Projects</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Example Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Pending Invoices
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 Invoices Due
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Invoices</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Example Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                New Proposals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3 Proposals Sent
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Proposals</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Add more cards as needed */}
      </Grid>
    </Box>
  );
};

export default Overview;
