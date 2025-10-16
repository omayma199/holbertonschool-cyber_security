import React, { useState, useEffect } from "react";
import Link from "@mui/joy/Link";
import { Box } from "@mui/material";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SecurityIcon from "@mui/icons-material/Security";

export default function SideBar({ labs, xsp, onLabSelect, selectedLab }) {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [color, setColor] = useState("primary");

  // Group labs by categories
  const labCategories = [
    {
      name: "Basic Challenges",
      labs: labs.filter((lab) => lab.id <= 3),
    },
    {
      name: "Advanced Challenges",
      labs: labs.filter((lab) => lab.id > 3 && lab.id <= 6),
    },
    {
      name: "Expert Challenges",
      labs: labs.filter((lab) => lab.id > 6),
    },
  ];

  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        minWidth: 220,
        maxWidth: 280,
        bgcolor: `${color}.500`,
        display: { xs: xsp, sm: "flex" },
        position: { xs: "absolute", sm: "relative" },
        flexDirection: "column",
        flexWrap: "nowrap",
        overflow: "hidden",
        height: "100vh",
        zIndex: 99,
      }}
    >
      <Card
        variant="plain"
        sx={{
          backgroundColor: "unset",
          width: "100%",
          height: "auto",
          flexShrink: 0,
          my: 2,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="/img/holberton_logo.png"
            alt="Holberton Logo"
            style={{
              width: "45px",
              height: "45px",
              maxWidth: "15vw",
              maxHeight: "15vw",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />
        </Box>

        <Typography
          level="title-md"
          sx={{
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
          }}
        >
          AI Security Labs
        </Typography>
      </Card>

      <List
        size="sm"
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          width: 320,
          pl: "24px",
          "--List-insetStart": "32px",
          "--ListItem-paddingY": "0px",
          "--ListItem-paddingRight": "16px",
          "--ListItem-paddingLeft": "21px",
          "--ListItem-startActionWidth": "0px",
          "--ListItem-startActionTranslateX": "-50%",
          [`& .${listItemButtonClasses.root}`]: {
            borderLeftColor: "divider",
          },
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
            {
              borderLeftColor: "currentColor",
            },
          '& [class*="startAction"]': {
            color: "var(--joy-palette-text-tertiary)",
          },
        }}
      >
        <ListItem nested>
          <ListItem component="div" startAction={<DashboardIcon />}>
            <Typography
              level="body-xs"
              sx={{ textTransform: "uppercase", color: "white" }}
            >
              Dashboard
            </Typography>
          </ListItem>
          <ListItem sx={{ "--List-gap": "0px" }}>
            <ListItemButton
              onClick={() => onLabSelect(null)}
              sx={{
                fontWeight: !selectedLab ? "bold" : "normal",
                color: "white",
              }}
            >
              Overview
            </ListItemButton>
          </ListItem>
        </ListItem>

        {labCategories.map((category, categoryKey) => {
          const [open, setOpen] = useState(true);
          return (
            <ListItem
              key={categoryKey}
              nested
              sx={{ my: 1 }}
              startAction={
                <IconButton
                  component="button"
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={() => setOpen(!open)}
                  disabled={category.labs.length == 0}
                  sx={{ color: "white" }}
                >
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        open && category.labs.length > 0
                          ? "initial"
                          : "rotate(-90deg)",
                      color: "white",
                    }}
                  />
                </IconButton>
              }
            >
              <ListItem onClick={() => setOpen(!open)}>
                <Typography
                  level="body-xs"
                  sx={{
                    cursor: "pointer",
                    fontWeight:
                      open && category.labs.length > 0 ? "bold" : undefined,
                    color: "white",
                    opacity: category.labs.length > 0 ? (open ? 1 : 0.8) : 0.5,
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  component="span"
                  level="body-xs"
                  sx={{ color: "white" }}
                >
                  {category.labs.length}
                </Typography>
              </ListItem>
              {open &&
                category.labs.length > 0 &&
                category.labs.map((lab, labKey) => (
                  <ListItem sx={{ "--List-gap": "0px" }} key={labKey}>
                    <ListItemButton
                      sx={{
                        fontWeight:
                          selectedLab?.id === lab.id ? "bold" : "normal",
                        color: "white",
                      }}
                      onClick={() => onLabSelect(lab)}
                    >
                      <SecurityIcon sx={{ mr: 1, fontSize: "1rem" }} />
                      Lab {lab.id}: {lab.title}
                    </ListItemButton>
                  </ListItem>
                ))}
            </ListItem>
          );
        })}
      </List>

      <Card
        size="sm"
        variant="plain"
        sx={{
          textAlign: "center",
          mt: 2,
          bgcolor: `background.level2`,
          borderRadius: 0,
        }}
      >
        <Typography level="body-xs" sx={{ color: "white" }}>
          Made With ❤️
        </Typography>
        <Button
          size="sm"
          variant="plain"
          onClick={() => {
            localStorage.removeItem("gemini_api_key");
            window.location.reload();
          }}
          sx={{
            mt: 1,
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          Change API Key
        </Button>
      </Card>
    </Sheet>
  );
}
