import {
    Box,
    MenuItem,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    styled,
    TextField,
    InputLabel,
    Select,
    SelectChangeEvent,
    FormControl,
} from "@mui/material";
import React from "react";
import NavbarLayout from "../components/NavbarLayout";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150,
    width: 300
}));

const currencies = [
    {
        value: 'ปัญหาการเรียน',
        label: 'ปัญหาการเรียน',
    },
    {
        value: 'ปัญหาอุปกรณ์การเรียน',
        label: 'ปัญหาอุปกรณ์การเรียน',
    },

];

export default function MultilineTextFields() {
    const [value, setValue] = React.useState('');

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box component="form"
            noValidate
            autoComplete="off">
            <NavbarLayout />
            <Card sx={{
                width: 844,
                height: 512,
                ml: 55,
                backgroundColor: "#368980"
            }}>
                <CardContent>
                    <Grid container>
                        <Grid>
                            <Grid >
                                <Button
                                    component="label"
                                    sx={{
                                        height: 150, width: 200,
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: 3
                                    }}>
                                    เพิ่มรูปภาพ
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Grid>
                            <br />
                            <FormControl sx={{ minWidth: 200}}>
                                <InputLabel id="demo-simple-select-autowidth-label">หัวข้อปัญหา</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    onChange={handleChange}
                                    autoWidth
                                    sx={{backgroundColor:'#FFFFFF',
                                borderRadius:3}}
                                >
                                    <MenuItem value={10}>ปัญหาการเรียน</MenuItem>
                                    <MenuItem value={21}>ปัญหาอุปกรณ์การเรียน</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Card sx={{
                            width: 500,
                            ml: 5,
                            borderRadius: 3
                        }}>
                            <CardContent>
                                <Grid>
                                    <Grid container>
                                        <Grid item xs={2} sx={{
                                            mx: 'auto',
                                            textAlign: 'right',
                                            mt: 2
                                        }} >
                                            หัวข้อ
                                        </Grid>
                                        <Grid>
                                            <TextField sx={{
                                                mr: 20,
                                                textAlign: 'left'
                                            }}
                                                id="outlined-multiline-static"
                                                multiline
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container>
                                        <Grid item xs={2} sx={{
                                            mx: 'auto',
                                            textAlign: 'right',
                                            mt: 2
                                        }} >
                                            รายละเอียด
                                        </Grid>
                                        <Grid>
                                            <TextField sx={{
                                                mr: 20,
                                                textAlign: 'left'
                                            }}
                                                id="outlined-multiline-static"
                                                multiline
                                                size="small"
                                                fullWidth
                                                rows={6}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Button variant="contained"
                        color="success"
                        sx={{ ml: 50, mt: 5 }}>
                        เพิ่มหัวข้อ
                    </Button>
                </CardContent>
            </Card>
        </Box>

    );
}

