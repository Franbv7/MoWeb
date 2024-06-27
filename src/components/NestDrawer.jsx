import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export function NestDrawer({
  seasons,
  seasonEpisodes,
  fetchEpisodesForSeason,
  seriesId,
  sx,
}) {
  const [seasonDrawerOpen, setSeasonDrawerOpen] = useState(false);
  const [episodeDrawerOpen, setEpisodeDrawerOpen] = useState(false);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(null);
  const { IMAGE_PATH } = useStateContext();

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeasonNumber(seasonNumber);
    setEpisodeDrawerOpen(true);
    fetchEpisodesForSeason(seasonNumber);
  };

  return (
    <div>
      <Button onClick={() => setSeasonDrawerOpen(true)}>
        Mostrar Temporadas
      </Button>
      <Drawer
        anchor="left"
        open={seasonDrawerOpen}
        onClose={() => {
          setSeasonDrawerOpen(false);
          setEpisodeDrawerOpen(false);
        }}
        sx={sx}
      >
        <List>
          {seasons.map((season) => (
            <ListItem
              button
              key={season.id}
              onClick={() => handleSeasonClick(season.season_number)}
            >
              <ListItemText primary={season.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Drawer
        anchor="left"
        open={episodeDrawerOpen}
        onClose={() => setEpisodeDrawerOpen(false)}
        style={{ marginLeft: 240 }}
        sx={sx}
      >
        <div style={{ width: 240 }}>
          <h3>
            {
              seasons.find(
                (season) => season.season_number === selectedSeasonNumber
              )?.name
            }
          </h3>
          <List>
            {seasonEpisodes[selectedSeasonNumber]?.map((episode, season) => (
              <Link
                to={`/episode/${seriesId}/${selectedSeasonNumber}/${episode.episode_number}`}
              >
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "1px solid black",
                  }}
                  key={episode.id}
                >
                  <ListItemText
                    primary={`Episode ${episode.episode_number}: ${episode.name}`}
                  />

                  <img
                    alt={episode.name}
                    src={`${IMAGE_PATH}${episode.still_path}`}
                    width={"200px"}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
