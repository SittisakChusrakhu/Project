import {
  Box,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputLabel,
  Select,
  FormControl,
  ListItemText,
  Checkbox,
  Chip,
  SelectChangeEvent,
  OutlinedInput,
  IconButton,
  ImageListItemBar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavbarStu from "../components/NavbarStu";
import axios, { AxiosResponse } from "axios";
import { Api } from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUpload, Add, DoNotDisturbOn } from "@mui/icons-material";
import "dayjs/locale/th";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function CreateProblemPage() {
  interface Tag {
    id: number;
    name: string;
  }

  interface Lecturer {
    id: number;
  }

  interface Problem {
    id: number;
    pro_title: string;
    pro_type: string;
    pro_desc: string;
    pro_image: string;
    lect_id: Lecturer[];
    stu: number;
    datetime: dayjs.Dayjs;
    status: string;
    tags: Tag[];
  }

  const [problem, setproblem] = useState<Problem>({
    id: 0,
    pro_title: "",
    pro_type: "",
    pro_desc: "",
    pro_image: "",
    lect_id: [],
    stu: 0,
    datetime: dayjs(),
    status: "กำลังส่งเรื่อง",
    tags: [],
  });

  const handleChangeproblem = (event: any) => {
    if (event && event.target) {
      setproblem({ ...problem, [event.target.name]: event.target.value });
    }
  };

  const [AllLectures, setAllLectures] = useState([]);
  const [GetAllLectures, setGetAllLectures] = useState<Lecturer[]>([]);
  const [selectLecturer, setSelectLecturer] = useState<string[]>([]);
  useEffect(() => {
    dayjs.locale("th");
    setproblem({ ...problem, stu: Number(localStorage.getItem("rid")) });

    axios({
      method: "get",
      url: "http://localhost:4000/api/lecturer/all",
      headers: {},
    })
      .then(function (response: any) {
        console.log(response.data);
        setAllLectures(response.data);
        setGetAllLectures(
          response.data.map((lect_id: any) => ({ id: lect_id.id }))
        );
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChangeLecturerId = (
    event: SelectChangeEvent<typeof selectLecturer>
  ) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setSelectLecturer(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmitstu = async () => {
    setproblem({ ...problem, datetime: dayjs() });
    problem.pro_image = imageUrls.join(",");
    problem.tags = selectedTags;
    problem.lect_id = selectLecturer.map((lect_id) => {
      return { id: Number(lect_id) };
    });
    console.log(problem);
    const res = await Api.post("/problem", problem);
    if (res.data) {
      toast.success("คุณส่งรายงานปัญหาแล้ว", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //setTimeout(location.reload.bind(location), 3000);
    }
  };

  const upload_multiple_image = async (e: any) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "student");
      axios
        .post("https://api.cloudinary.com/v1_1/drynd8ioj/image/upload", data)
        .then((res) => {
          setImageUrls((prevImageUrls) => [
            ...prevImageUrls,
            res.data.secure_url,
          ]);
        });
    }
  };

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [displayedTags, setDisplayedTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await Api.get("/tags");
        setAllTags(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    const selectedTagIds = selectedTags.map((tag) => tag.id);
    const newDisplayedTags = allTags.filter((tag) =>
      selectedTagIds.includes(tag.id)
    );
    setDisplayedTags(newDisplayedTags);
  }, [selectedTags]);

  const handleCreateTag = async () => {
    const newTagName = prompt("Enter new tag name");
    if (newTagName) {
      const tagExists = allTags.some((tag) => tag.name === newTagName);
      if (tagExists) {
        setSelectedTags((selectedTags: any) => [
          ...selectedTags,
          { id: allTags.find((tag) => tag.name === newTagName)?.id },
        ]);
      } else {
        try {
          const res: AxiosResponse<Tag> = await Api.post("/tags", {
            name: newTagName,
          });
          if (res.data) {
            const newTag = res.data;
            setAllTags([...allTags, newTag]);
            setSelectedTags((selectedTags: any) => [
              ...selectedTags,
              { id: newTag.id },
            ]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleSelectTag = (tag: Tag) => {
    if (selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags((prevTags: any) => [...prevTags, { id: tag.id }]);
    }
  };
  const handleDeleteTag = (tag: Tag) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((selectedTag) => selectedTag.id !== tag.id)
    );
  };

  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);



  return (
    <Box component="form">
      <ToastContainer />
      <NavbarStu />
      <Card
        sx={{
          width: 830,
          height: 580,
          ml: 53,
          backgroundColor: "#368980",
        }}>
        <CardContent>
          <Grid container>
            <Grid>
              <Grid>
                <FormControl sx={{ minWidth: 200, mb: 2.5 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    หัวข้อปัญหา
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="name"
                    name="pro_type"
                    onChange={handleChangeproblem}
                    autoWidth
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 3,
                    }}>
                    <MenuItem value={"ปัญหาการเรียน"}>ปัญหาการเรียน</MenuItem>
                    <MenuItem value={"ปัญหาอุปกรณ์การเรียน"}>
                      ปัญหาอุปกรณ์การเรียน
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  sx={{
                    minWidth: 200,
                    mb: 3,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 3,
                  }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    อาจารย์
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="name"
                    multiple
                    name="lect_id"
                    value={selectLecturer}
                    onChange={handleChangeLecturerId}
                    input={<OutlinedInput label="อาจารย์" />}
                    renderValue={(selected) => {
                      const lecturers = selected as string[];
                      return (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {lecturers.map((lecturer: any) => (
                            <Chip
                              key={lecturer}
                              label={
                                AllLectures.find(
                                  (lect: any) => lect.id === Number(lecturer)
                                )?.username
                              }
                              sx={{ m: 0.5 }}
                            />
                          ))}
                        </div>
                      );
                    }}
                    MenuProps={MenuProps}>
                    {AllLectures.map((lecturer: any, index) => (
                      <MenuItem key={index} value={String(lecturer.id)}>
                        <Checkbox
                          checked={
                            selectLecturer.indexOf(String(lecturer.id)) > -1
                          }
                        />
                        <ListItemText primary={lecturer.username} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <Card
                  sx={{
                    width: 200,
                    height: 300,
                    borderRadius: 3,
                  }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        component="label"
                        style={{ marginLeft: 10, marginTop: 10 }}>
                        <CloudUpload />
                        Upload
                        <input
                          hidden
                          accept=".jpg,.jpeg,.png*"
                          id="fileInput"
                          onChange={upload_multiple_image}
                          multiple
                          type="file"
                          style={{ marginTop: "10px" }}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {imageUrls.map((imageUrl, index) => (
                          <div>
                            <IconButton style={{ marginTop: 10,marginLeft:30 }}>
                              <DoNotDisturbOn />
                            </IconButton>
                            <Grid item key={index}>
                              <img
                                src={imageUrl}
                                alt={`Image ${index}`}
                                width={50}
                              />
                          </Grid>
                          </div>
                        ))}
                    </Grid>
                  </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Card
          sx={{
            width: 500,
            ml: 5,
            borderRadius: 3,
          }}>
          <CardContent>
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  mx: "auto",
                  textAlign: "right",
                  mt: 2,
                }}>
                หัวข้อ
              </Grid>
              <Grid>
                <TextField
                  sx={{
                    mr: 20,
                    textAlign: "left",
                  }}
                  id="name"
                  name="pro_title"
                  onChange={handleChangeproblem}
                  multiline
                  size="small"
                />
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  mx: "auto",
                  textAlign: "right",
                  mt: 2,
                }}>
                รายละเอียด
              </Grid>
              <Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                  }}
                  component="ul">
                  {displayedTags.map((tag: Tag) => (
                    <ListItem key={tag.id}>
                      <Chip
                        label={tag.name}
                        onDelete={() => handleDeleteTag(tag)}
                        color="primary"
                        onClick={() => handleSelectTag(tag)}
                      />
                    </ListItem>
                  ))}
                  <Chip
                    icon={<Add />}
                    label="Add Tag"
                    onClick={handleCreateTag}
                  />
                </Grid>
                <TextField
                  sx={{
                    mr: 20,
                    textAlign: "left",
                  }}
                  id="name"
                  name="pro_desc"
                  onChange={handleChangeproblem}
                  multiline
                  size="small"
                  fullWidth
                  rows={6}
                />
              </Grid>
              <br />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Button
        variant="contained"
        color="success"
        sx={{ ml: 50, mt: 5 }}
        onClick={handleSubmitstu}>
        แจ้งปัญหา
      </Button>
    </CardContent>
      </Card >
    </Box >
  );
}
