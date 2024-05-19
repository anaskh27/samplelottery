import styled from "styled-components";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const getBackgroundColor = (lotteryName) => {
  switch (lotteryName) {
    case "cosmic":
      return "#4a90e2";
    case "classic":
      return "#f8e71c";
    case "atomic":
      return "#50e3c2";
    default:
      return "#ffffff";
  }
};

export const StyledCard = styled(Card)`
  && {
    margin-bottom: 20px;
  }
`;

export const StyledCardContent = styled(CardContent)`
  && {
    padding: 16px;
    background-color: ${({ lotteryName }) => getBackgroundColor(lotteryName)};
  }
`;

export const TicketCircle = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  margin-right: 5px;
`;

export const ButtonContainer = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
`;

export const PoolInfoContainer = styled(Box)`
  && {
    margin-top: 8px;
  }
`;

export const PoolItem = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
`;



export const StyledTypography = styled(Typography)`
  && {
    margin-right: 8px;
  }
`;
