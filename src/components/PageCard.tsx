import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { PageCardProps } from "../utils/types";

function PageCard({ icon, title, color, link }: PageCardProps) {
  const gradient = `linear-gradient(155deg, ${color} 0%, #00000080 100%)`;
  return (
    <a href={link} className="page-card-link">
      <Card sx={{ maxWidth: 400, background: gradient }} className="page-card">
        <CardMedia component="img" height="200" image={icon} alt={title} />
        <CardContent>
          <Typography variant="h4" component="div">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}

export default PageCard;
