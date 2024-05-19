import React, { useState, useEffect } from "react";
import {
  StyledCard,
  StyledCardContent,
  TicketCircle,
  ButtonContainer,
  PoolInfoContainer,
  PoolItem,
  StyledButton,
  StyledTypography,
} from "./styles";
import { Collapse, Box, Typography, Button, Divider } from "@mui/material";
import { color } from "@mui/system";

const getBackgroundColor = (lotteryName) => {
  switch (lotteryName) {
    case "COSMIC":
      return "#EEE1F0"; // Example color for cosmic
    case "CLASSIC":
      return "#E9EEF6"; // Example color for classic
    case "ATOMIC":
      return "#EAF9F7"; // Example color for atomic
    default:
      return "#ffffff"; // Default color
  }
};
const getStripeColor = (lotteryName) => {
  switch (lotteryName) {
    case "COSMIC":
      return "#961A88"; // Example color for cosmic
    case "CLASSIC":
      return "#191978"; // Example color for classic
    case "ATOMIC":
      return "#00AEB1"; // Example color for atomic
    default:
      return "#ffffff"; // Default color
  }
};

const LotteryCard = ({ data, title }) => {
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
        <Typography variant="h5" gutterBottom>
          {title} No. {data.roundNumber}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {data.previousWinningticket &&
              data.previousWinningticket.map((ticket, index) => (
                <TicketCircle key={index}>{ticket}</TicketCircle>
              ))}
          </Typography>
        </Box>
        <Typography
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "13px",
          }}
        >
          Winning Pot:{" "}
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            {data.winningPot}
          </Typography>
          LUCKI
        </Typography>

        <ButtonContainer sx={{ background: stripeColor, padding: "5px" }}>
          <Typography color={"white"} variant="h6">
            Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </Typography>
          <Button
            variant="outlined"
            style={{ backgroundColor: "white", color: stripeColor }}
          >
            Play
          </Button>
        </ButtonContainer>
        <Button
          marginTop="20px"
          variant="outlined"
          fullWidth
          onClick={() => setOpen(!open)}
        >
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

export default LotteryCard;
