import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Home() {
  const location = useLocation();
  const formData = location.state;
  return (
    <div className="flex w-full justify-center text-center align-center ">
      <h1 style={{display:"flex",justifyContent:"center"}}>Welcome User</h1>
      {formData && (
        <Card sx={{ minWidth: 175 }}>
          <CardContent>
            
            <Typography
             variant="h5" component="div" 
            >
              User: {formData.name}
            </Typography>
            <Typography  sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom>
              Email: {formData.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default Home;
