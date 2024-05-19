// pages/page.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import LotteryCard from "../components/LotteryCard";

const Home = () => {
  const fetchLotteryData = async (lotteryType) => {
    const response = await axios.get(
      `https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=${lotteryType}`
    );
    return response.data.data;
  };

  const [cosmicData, setCosmicData] = useState(null);
  const [classicData, setClassicData] = useState(null);
  const [atomicData, setAtomicData] = useState(null);

  useEffect(() => {
    fetchLotteryData("COSMIC").then(setCosmicData);
    fetchLotteryData("CLASSIC").then(setClassicData);
    fetchLotteryData("ATOMIC").then(setAtomicData);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Latest Results
      </Typography>
      <Grid container spacing={2}>
        {cosmicData && (
          <Grid item xs={12}>
            <LotteryCard data={cosmicData} title="Cosmic" />
          </Grid>
        )}
        {classicData && (
          <Grid item xs={12}>
            <LotteryCard data={classicData} title="Classic" />
          </Grid>
        )}
        {atomicData && (
          <Grid item xs={12}>
            <LotteryCard data={atomicData} title="Atomic" />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
