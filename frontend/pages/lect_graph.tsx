import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import ProblemCountComponent from "../components/ProblemCountComponent";
import PercentageChart from "../components/PercentageChart";
import ComponentGraph from "../components/ComponentGraph";
import ProblemTypeChart from "../components/ProblemTypeChart";
import CountTag from "../components/CountTag";
import ComponentMount from "../components/ComponentMount";
import NavbarLect from "../components/NavbarLect";
import styles from "../styles/Home.module.css";



const Graph: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#EEEEEE" }}>
      <NavbarLect />
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: 35 }}>
        <CardContent>
          <ProblemCountComponent />
        </CardContent>
        <div className={styles.StyledCard} >
            <ProblemTypeChart />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 35
        }}
      >
        <div className={styles.StyledGraphCard}>
            <ComponentGraph />
        </div>
        <CardContent>
          <CountTag />
        </CardContent>
      </Box>
    </Box>
  );
};

export default Graph;
