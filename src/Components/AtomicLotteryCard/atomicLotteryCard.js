import React, { useState, useEffect } from "react";
import {
  StyledCard,
  StyledCardContent,
  TicketCircle,
  ButtonContainer,
  PoolInfoContainer,
  PoolItem,
  StyledTypography,
} from "../LotteryCard/Styles";
import { Collapse, Box, Typography, Button, Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const getBackgroundColor = (lotteryName) => {
  switch (lotteryName) {
    case "COSMIC":
      return "#EEE1F0";
    case "CLASSIC":
      return "#E9EEF6";
    case "ATOMIC":
      return "#EAF9F7";
    default:
      return "#ffffff";
  }
};
const getStripeColor = (lotteryName) => {
  switch (lotteryName) {
    case "COSMIC":
      return "#961A88";
    case "CLASSIC":
      return "#191978";
      c;
    case "ATOMIC":
      return "#00AEB1";
    default:
      return "#ffffff";
  }
};

const ClassicLotteryCard = ({ data, title }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [open, setOpen] = useState(false); // State for collapse

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const nextDrawTime = new Date(data.nextDraw).getTime();
    const currentTime = new Date().getTime();
    const difference = nextDrawTime - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  }
  const cardBackgroundColor = getBackgroundColor(data.lotteryName);
  const stripeColor = getStripeColor(data.lotteryName);
  return (
    <StyledCard
      style={{ maxWidth: "358px" }}
      maxWidth={"358px"}
      variant="outlined"
    >
      <StyledCardContent style={{ backgroundColor: cardBackgroundColor }}>
        <Box display={"inline-flex"} gap="5px" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <Typography fontSize={"14px"}>
            No.
            {data.roundNumber}
          </Typography>
        </Box>
        {[...Array(3)].map((_, index) => (
          <Typography key={index} color="black" fontSize="20px">
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "space-between",
              }}
            >
              {data.roundNumber}. {data.currentPool}. {data.roundNumber}.
            </Box>
          </Typography>
        ))}

        <ButtonContainer
          sx={{
            background: stripeColor,
            padding: "5px",
            margin: "-20px",
            padding: "0 15px 0 15px",
          }}
          display="flex"
          alignItems={"center"}
        >
          <Typography color={"white"} fontSize="14px">
            Next<br></br> Draw
          </Typography>
          <Typography color={"white"} fontSize="20px">
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </Box>
          </Typography>

          <Button
            variant="outlined"
            style={{
              backgroundColor: "white",
              color: stripeColor,
              padding: "0px",
              height: "24px",
            }}
          >
            Play
          </Button>
        </ButtonContainer>
        <Button
          marginTop="20px"
          variant="text"
          sx={{ color: "grey", marginTop: "20px", marginBottom: "-20px" }}
          fullWidth
          onClick={() => setOpen(!open)}
        >
          <KeyboardArrowDownIcon />
          {open ? "Hide Details" : "Show Details"}
        </Button>
        <PoolInfoContainer>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginTop={2}>
              {data.poolAmount &&
                data.poolAmount.map((pool, index) => (
                  <PoolItem key={index}>
                    <StyledTypography>{pool.coinName}</StyledTypography>
                    <StyledTypography>{pool.poolAmount}</StyledTypography>
                  </PoolItem>
                ))}
            </Box>
            <Divider style={{ height: 2, backgroundColor: "black" }} />

            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <StyledTypography> {data.currentPool}</StyledTypography>
            </Box>
          </Collapse>
        </PoolInfoContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ClassicLotteryCard;
