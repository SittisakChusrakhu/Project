import { Image } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import { Button } from "react-bootstrap";
import NavbarStu from "../components/NavbarStu";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Problem {
  id: string;
  pro_title: string;
  pro_type: string;
  pro_desc: string;
  pro_image: string;
  tags: Tag[];
  lect_id: string;
  sid: string;
  datetime: string;
  status: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function BasicCard() {
  const [topProblems, setTopProblems] = useState<Problem[]>([]);
  const [topThreeTags, setTopThreeTags] = useState<string[]>([]);
  const [groupedProblems, setGroupedProblems] = useState<{
    [tag: string]: Problem[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemResponse = await axios.get(
          "http://localhost:4000/api/user/problem"
        );
        const tagResponse = await axios.get("http://localhost:4000/api/tags");

        const problemData: Problem[] = problemResponse.data;
        const tagData: Tag[] = tagResponse.data;

        const updatedGroupedProblems: { [tag: string]: Problem[] } = {};

        problemData.forEach((problem) => {
          problem.tags.forEach((tag) => {
            if (updatedGroupedProblems[tag.name]) {
              updatedGroupedProblems[tag.name].push(problem);
            } else {
              updatedGroupedProblems[tag.name] = [problem];
            }
          });
        });

        const sortedTags = tagData.sort((a, b) => {
          const problemsA = updatedGroupedProblems[a.name] || [];
          const problemsB = updatedGroupedProblems[b.name] || [];
          return problemsB.length - problemsA.length;
        });

        const selectedProblems: Problem[] = [];

        sortedTags.slice(0, 3).forEach((tag) => {
          const problems = updatedGroupedProblems[tag.name];
          if (problems && problems.length > 0) {
            selectedProblems.push(problems[0]);
          }
        });

        setTopProblems(selectedProblems);
        setTopThreeTags(sortedTags.slice(0, 3).map((tag) => tag.name));
        setGroupedProblems(updatedGroupedProblems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <NavbarStu />
      <Card sx={{ width: 1100, ml: 40, mt: 15 }}>
        <Grid container sx={{ justifyContent: "center", mb: 5 }}>
          <Typography>ปัญหาที่พบบ่อย</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 5, ml: 2 }}>
          {topThreeTags.map((tagName) => (
            <Grid key={tagName} item xs={4}>
              <div className={styles.cardhomecontainer}>
                <div className={styles.cardhome}>
                  <div className={styles.frontcontent}>
                    <p>{tagName}</p>
                  </div>
                  <div className={styles.content}>
                    {groupedProblems[tagName]?.slice(0, 1)?.map((problem) => (
                      <div className={styles.content} key={problem.id}>
                        <p>{problem.pro_title}</p>
                        <p>{problem.pro_desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
