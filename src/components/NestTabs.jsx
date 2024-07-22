import { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  // List,
  ListItem,
  ListItemText,
  // Typography,
  AppBar,
  // Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export function NestTabs({
  seasons,
  seasonEpisodes,
  fetchEpisodesForSeason,
  seriesId,
}) {
  const [selectedSeason, setSelectedSeason] = useState(0);
  const { IMAGE_PATH, darkMode } = useStateContext();

  const handleTabChange = (event, newValue) => {
    setSelectedSeason(newValue);
    fetchEpisodesForSeason(seasons[newValue].season_number);
  };

  const color = darkMode ? "aliceblue" : "black";

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Tabs
          value={selectedSeason}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {seasons.map((season, index) => (
            <Tab key={season.id} label={season.name} sx={{ color: color }} />
          ))}
        </Tabs>
      </AppBar>
      {seasons.map((season, index) => (
        <TabPanel value={selectedSeason} index={index} key={season.id}>
          <Box sx={{ display: "flex", overflowX: "auto" }}>
            {seasonEpisodes[season.season_number]?.map((episode) => (
              <Box key={episode.id} sx={{ minWidth: 240, margin: 1 }}>
                <Link
                  to={`/episode/${seriesId}/${season.season_number}/${episode.episode_number}`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: color,
                    }}
                  >
                    {episode.still_path ? (
                      <img
                        alt={episode.name}
                        src={`${IMAGE_PATH}${episode.still_path}`}
                        width={"200px"}
                        height={"113px"}
                      />
                    ) : (
                      <img
                        src={"/No-Image-Placeholder.svg"}
                        alt={episode.name}
                        width={"200px"}
                        height={"113px"}
                      />
                    )}
                    <ListItemText
                      primary={`Episode ${episode.episode_number}: ${episode.name}`}
                    />
                  </ListItem>
                </Link>
              </Box>
            ))}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
