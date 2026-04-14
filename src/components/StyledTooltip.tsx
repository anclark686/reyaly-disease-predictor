import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import type { TooltipProps } from "@mui/material/Tooltip";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#020f1f",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(16),
    border: "1px solid #dadde9",
    textAlign: "center",
  },
}));

export default StyledTooltip;
