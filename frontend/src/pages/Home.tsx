import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { getProjects } from "../api";
import ProjectCard from "../components/ProjectCard";

type Project = {
  [key: string]: string;
};

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to load projects", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {projects.map((project, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
