import React from "react";
import { Grid } from "@material-ui/core";
import ProfilePanel from "./ProfilePanel";
import CuriosityPanel from "./CuriosityPanel";
import CharityPanel from "./CharityPanel";
import FavouriteAnimalPanel from "./FavouriteAnimalPanel";

const UserPanel = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ProfilePanel />
        </Grid>
        <Grid item sm={8} xs={12}>
          <CuriosityPanel/>
        </Grid>
        <Grid item xs={12}>
          <CharityPanel/>
        </Grid>
        <Grid item xs={12}>
          <FavouriteAnimalPanel/>
        </Grid>
      </Grid>
    </>
  );
};

export default UserPanel;
