import {  AssignmentLate,  InsertPhoto,  PeopleAlt } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import React from "react";
import NavbarLayout from "../components/NavbarLayout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#368980',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: 150,
  width: 300
}));

export default function BasicCard() {

  return (
    <Box>
      <NavbarLayout />
      <Card sx={{
        width: 1100,
        ml: 40
      }}>
        <CardContent>
          <Typography>
            จำนวนผู้ใช้
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <Item>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={3}>
                    <Typography sx={{mt:3}}>250 คน </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <PeopleAlt sx={{fontSize:80,color:'#FFF'}}/>
                  </Grid>
                </Grid>
                <br />
                <Typography >Student</Typography>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={3}>
                    <Typography sx={{mt:3}}>10 คน</Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <PeopleAlt sx={{fontSize:80,color:'#FFF'}}/>
                  </Grid>
                </Grid>
                <br />
                <Typography>Lecturer</Typography>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={4}>
                    <Typography sx={{mt:3}}>10 รายงาน</Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <AssignmentLate sx={{fontSize:80,color:'#FFF'}}/>
                  </Grid>
                </Grid>
                <br />
                <Typography>Report</Typography>
              </Item>
            </Grid>
            
            <Grid item xs={4}>
              <Item>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={4}>
                    <Typography sx={{mt:3}}>หัวข้อ</Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <InsertPhoto sx={{fontSize:80,color:'#FFF'}}/>
                  </Grid>
                </Grid>
                <br />
                <Typography>ดูรายละเอียด</Typography>
              </Item>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
    </Box >

  );
}

