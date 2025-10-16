import React$1, { useState } from "react";
import "react-dom/client";
import AspectRatio from "@mui/joy/AspectRatio/index.js";
import Box from "@mui/joy/Box/index.js";
import Divider from "@mui/joy/Divider/index.js";
import IconButton from "@mui/joy/IconButton/index.js";
import Avatar from "@mui/joy/Avatar/index.js";
import Stack from "@mui/joy/Stack/index.js";
import Typography from "@mui/joy/Typography/index.js";
import Breadcrumbs from "@mui/joy/Breadcrumbs/index.js";
import Link from "@mui/joy/Link/index.js";
import Card from "@mui/joy/Card/index.js";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded.js";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded.js";
import Favorite from "@mui/icons-material/Favorite.js";
import Alert from "@mui/joy/Alert/index.js";
import Sheet from "@mui/joy/Sheet/index.js";
import CloseIcon from "@mui/icons-material/Close.js";
import InfoIcon from "@mui/icons-material/Info.js";
import Button from "@mui/joy/Button/index.js";
import FormControl from "@mui/joy/FormControl/index.js";
import FormLabel from "@mui/joy/FormLabel/index.js";
import Input from "@mui/joy/Input/index.js";
import Select from "@mui/joy/Select/index.js";
import Option from "@mui/joy/Option/index.js";
import CardActions from "@mui/joy/CardActions/index.js";
import CardOverflow from "@mui/joy/CardOverflow/index.js";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded.js";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded.js";
import EditRoundedIcon from "@mui/icons-material/EditRounded.js";
import Textarea from "@mui/joy/Textarea/index.js";
import FormHelperText from "@mui/joy/FormHelperText/index.js";
import WarningIcon from "@mui/icons-material/Warning.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";
import Confetti from "react-confetti";
import { ViteSSG } from "vite-ssg/single-page";
function Profile() {
  const [hints, setHints] = useState(false);
  useState(false);
  const user_info = {
    f_name: "John",
    l_name: "Doe"
  };
  return /* @__PURE__ */ React.createElement(Box, { sx: { flex: 1, width: "100%", height: "100vh", overflow: "auto" } }, /* @__PURE__ */ React.createElement(
    Box,
    {
      sx: {
        position: "relative",
        bgcolor: "background.body",
        mt: 1
      }
    },
    /* @__PURE__ */ React.createElement(Box, { sx: { px: { xs: 2, md: 6 } } }, /* @__PURE__ */ React.createElement(
      Breadcrumbs,
      {
        size: "sm",
        "aria-label": "breadcrumbs",
        separator: /* @__PURE__ */ React.createElement(ChevronRightRoundedIcon, { fontSize: "sm" }),
        sx: { pl: 0 }
      },
      /* @__PURE__ */ React.createElement(
        Link,
        {
          underline: "none",
          color: "neutral",
          href: "/a3/xss_stored/",
          "aria-label": "Home"
        },
        /* @__PURE__ */ React.createElement(HomeRoundedIcon, null)
      ),
      /* @__PURE__ */ React.createElement(Typography, { color: "primary", fontWeight: 500, fontSize: 12 }, "My profile"),
      /* @__PURE__ */ React.createElement(
        Link,
        {
          underline: "hover",
          color: "neutral",
          href: "edit",
          fontSize: 12,
          fontWeight: 500
        },
        "Edit my profile"
      )
    ), /* @__PURE__ */ React.createElement(Typography, { level: "h2", component: "h1", sx: { mt: 1, mb: 2 } }, "My profile"))
  ), /* @__PURE__ */ React.createElement(
    Stack,
    {
      spacing: 4,
      sx: {
        display: "flex",
        maxWidth: "800px",
        mx: "auto",
        mt: 10,
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 }
      }
    },
    hints && /* @__PURE__ */ React.createElement(
      Alert,
      {
        startDecorator: /* @__PURE__ */ React.createElement(InfoIcon, null),
        sx: { my: 1, py: 2 },
        variant: "soft",
        component: "pre",
        color: "neutral",
        endDecorator: /* @__PURE__ */ React.createElement(
          IconButton,
          {
            variant: "soft",
            size: "sm",
            color: "neutral",
            onClick: () => setHints("")
          },
          /* @__PURE__ */ React.createElement(CloseIcon, null)
        )
      },
      hints
    ),
    /* @__PURE__ */ React.createElement(Card, { sx: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      Stack,
      {
        direction: "row",
        gap: 1.5,
        sx: {
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "nowrap"
        }
      },
      /* @__PURE__ */ React.createElement(
        AspectRatio,
        {
          ratio: "1",
          sx: {
            flex: 1,
            width: 120,
            height: 120,
            borderRadius: "100%",
            mt: "-80px"
          }
        },
        /* @__PURE__ */ React.createElement(Avatar, { variant: "outlined" })
      ),
      /* @__PURE__ */ React.createElement(
        IconButton,
        {
          size: "sm",
          variant: "solid",
          color: "danger",
          sx: {
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            ml: 10,
            mt: 1,
            boxShadow: "sm"
          }
        },
        /* @__PURE__ */ React.createElement(Favorite, null)
      ),
      /* @__PURE__ */ React.createElement(Typography, { level: "h1" }, user_info.f_name, " ", user_info.l_name),
      /* @__PURE__ */ React.createElement(
        Sheet,
        {
          sx: {
            bgcolor: "background.level1",
            borderRadius: "sm",
            p: 1.5,
            display: "flex",
            position: { xs: "relative", sm: "absolute" },
            top: 0,
            textAlign: "center",
            right: 0,
            gap: 2,
            "& > div": { flex: 1 }
          }
        },
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Typography, { level: "body-xs", fontWeight: "lg" }, "Following"), /* @__PURE__ */ React.createElement(Typography, { fontWeight: "lg" }, "34")),
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Typography, { level: "body-xs", fontWeight: "lg" }, "Followers"), /* @__PURE__ */ React.createElement(Typography, { fontWeight: "lg" }, "980"))
      ),
      /* @__PURE__ */ React.createElement(
        Typography,
        {
          level: "body-sm",
          fontWeight: "lg",
          textColor: "text.tertiary"
        },
        "Senior Journalist"
      ),
      /* @__PURE__ */ React.createElement(Box, { sx: { mb: 1 } }, /* @__PURE__ */ React.createElement(Typography, { level: "title-md", textAlign: "center" }, "Bio"), /* @__PURE__ */ React.createElement(Typography, { level: "body-sm" }, "Customize how your profile information will apper to the networks.")),
      /* @__PURE__ */ React.createElement(Divider, null)
    ))
  ));
}
function EditProfile() {
  const [hints, setHints] = useState(false);
  const [loaded, setLoaded] = useState(false);
  document.getElementById("data");
  const user_info = {};
  return /* @__PURE__ */ React.createElement(Box, { sx: { flex: 1, width: "100%", maxHeight: "100vh", overflow: "auto" } }, /* @__PURE__ */ React.createElement(
    Box,
    {
      sx: {
        position: "relative",
        bgcolor: "background.body",
        mt: 1
      }
    },
    /* @__PURE__ */ React.createElement(Box, { sx: { px: { xs: 2, md: 6 } } }, /* @__PURE__ */ React.createElement(
      Breadcrumbs,
      {
        size: "sm",
        "aria-label": "breadcrumbs",
        separator: /* @__PURE__ */ React.createElement(ChevronRightRoundedIcon, { fontSize: "sm" }),
        sx: { pl: 0 }
      },
      /* @__PURE__ */ React.createElement(
        Link,
        {
          underline: "none",
          color: "neutral",
          href: "/a3/xss_stored/",
          "aria-label": "Home"
        },
        /* @__PURE__ */ React.createElement(HomeRoundedIcon, null)
      ),
      /* @__PURE__ */ React.createElement(
        Link,
        {
          underline: "hover",
          color: "neutral",
          href: "profile",
          fontSize: 12,
          fontWeight: 500
        },
        "My profile"
      ),
      /* @__PURE__ */ React.createElement(Typography, { color: "primary", fontWeight: 500, fontSize: 12 }, "Edit my profile")
    ), /* @__PURE__ */ React.createElement(Typography, { level: "h2", component: "h1", sx: { mt: 1, mb: 2 } }, "Edit my profile"))
  ), /* @__PURE__ */ React.createElement(
    Stack,
    {
      spacing: 4,
      sx: {
        display: "flex",
        maxWidth: "800px",
        mx: "auto",
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 }
      }
    },
    hints && /* @__PURE__ */ React.createElement(
      Alert,
      {
        startDecorator: /* @__PURE__ */ React.createElement(InfoIcon, null),
        sx: { my: 1, py: 2 },
        variant: "soft",
        component: "pre",
        color: "neutral",
        endDecorator: /* @__PURE__ */ React.createElement(
          IconButton,
          {
            variant: "soft",
            size: "sm",
            color: "neutral",
            onClick: () => setHints("")
          },
          /* @__PURE__ */ React.createElement(CloseIcon, null)
        )
      },
      hints
    ),
    /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Box, { sx: { mb: 1 } }, /* @__PURE__ */ React.createElement(Typography, { level: "title-md" }, "Personal info"), /* @__PURE__ */ React.createElement(Typography, { level: "body-sm" }, "Customize how your profile information will apper to the networks.")), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Stack, { direction: "column", spacing: 2, sx: { display: "flex", my: 1 } }, /* @__PURE__ */ React.createElement(Stack, { direction: "row", spacing: 2 }, /* @__PURE__ */ React.createElement(Stack, { direction: "column", spacing: 1 }, /* @__PURE__ */ React.createElement(
      AspectRatio,
      {
        ratio: "1",
        maxHeight: 100,
        sx: { flex: 1, minWidth: 100, borderRadius: "100%" }
      },
      /* @__PURE__ */ React.createElement(Avatar, { variant: "plein" })
    ), /* @__PURE__ */ React.createElement(
      IconButton,
      {
        loading: !loaded,
        "aria-label": "upload new picture",
        size: "sm",
        variant: "outlined",
        color: "neutral",
        sx: {
          bgcolor: "background.body",
          position: "absolute",
          zIndex: 2,
          borderRadius: "50%",
          left: 85,
          top: 180,
          boxShadow: "sm"
        }
      },
      /* @__PURE__ */ React.createElement(EditRoundedIcon, null)
    )), /* @__PURE__ */ React.createElement(Stack, { spacing: 1, sx: { flexGrow: 1 } }, /* @__PURE__ */ React.createElement(FormLabel, null, "Name"), /* @__PURE__ */ React.createElement(
      FormControl,
      {
        sx: {
          display: {
            sm: "flex-column",
            md: "flex-row"
          },
          gap: 2
        }
      },
      /* @__PURE__ */ React.createElement(
        Input,
        {
          size: "sm",
          placeholder: "First name",
          value: user_info.f_name
        }
      )
    ), /* @__PURE__ */ React.createElement(
      FormControl,
      {
        sx: {
          display: {
            sm: "flex-column",
            md: "flex-row"
          },
          gap: 2
        }
      },
      /* @__PURE__ */ React.createElement(
        Input,
        {
          size: "sm",
          placeholder: "Last name",
          value: user_info.l_name
        }
      )
    ))), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(FormLabel, null, "Role"), /* @__PURE__ */ React.createElement(Input, { size: "sm", value: user_info.role })), /* @__PURE__ */ React.createElement(FormControl, { sx: { flexGrow: 1 } }, /* @__PURE__ */ React.createElement(FormLabel, null, "Email"), /* @__PURE__ */ React.createElement(
      Input,
      {
        size: "sm",
        type: "email",
        startDecorator: /* @__PURE__ */ React.createElement(EmailRoundedIcon, null),
        placeholder: "email",
        value: user_info.email,
        sx: { flexGrow: 1 }
      }
    )), /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(FormLabel, null, "Bio"), /* @__PURE__ */ React.createElement(Stack, { spacing: 2, sx: { my: 1 } }, /* @__PURE__ */ React.createElement(
      Textarea,
      {
        component: "div",
        size: "sm",
        defaultValue: user_info.bio,
        minRows: 4,
        sx: { mt: 1.5 },
        placeholder: "I'm a Cyber Security Expert based in Tunisia. My goal is to secure all vulnerabilities in my country."
      }
    ), /* @__PURE__ */ React.createElement(FormHelperText, { sx: { mt: 0.75, fontSize: "xs" } }, "275 characters left"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FormControl, { sx: { display: { sm: "contents" } } }, /* @__PURE__ */ React.createElement(FormLabel, null, "Timezone"), /* @__PURE__ */ React.createElement(
      Select,
      {
        size: "sm",
        startDecorator: /* @__PURE__ */ React.createElement(AccessTimeFilledRoundedIcon, null),
        defaultValue: user_info.tz
      },
      /* @__PURE__ */ React.createElement(Option, { value: "1" }, "Tunisia Time (Tunis)", " ", /* @__PURE__ */ React.createElement(Typography, { textColor: "text.tertiary", ml: 0.5 }, "— GMT+01:00")),
      /* @__PURE__ */ React.createElement(Option, { value: "2" }, "France Time (Paris)", " ", /* @__PURE__ */ React.createElement(Typography, { textColor: "text.tertiary", ml: 0.5 }, "— GMT+01:00"))
    )), /* @__PURE__ */ React.createElement(FormControl, null))), /* @__PURE__ */ React.createElement(CardOverflow, { sx: { borderTop: "1px solid", borderColor: "divider" } }, /* @__PURE__ */ React.createElement(CardActions, { sx: { alignSelf: "flex-end", pt: 2 } }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: "outlined",
        color: "neutral",
        onClick: () => fetch("/api/a2/crypto_encoding_failure/hints").then((res) => res.json()).then((res) => setHints(res.message))
      },
      "Hints"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: "solid",
        component: "a",
        color: "primary",
        href: "/a2/crypto_encoding_failure/login"
      },
      "Logout"
    ))))
  ));
}
const yaySound = "/assets/yaay-CYoVr1zl.mp3";
const { innerWidth, innerHeight } = window;
function Login() {
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [yay] = useState(new Audio(yaySound));
  const username = "{{ session['hello'] }}";
  return /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: (event) => {
        event.preventDefault();
        setLoaded(false);
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        return fetch("/api/a2/crypto_encoding_failure/login", {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formJson)
        }).then((res) => res.json()).then((res) => {
          if (res.status == "success") {
            setError("");
            setConfetti(true);
            yay.play();
            setSuccess(res.message);
            setLoaded(true);
          } else {
            setSuccess("");
            setError(res.message);
            setLoaded(true);
          }
        });
      }
    },
    /* @__PURE__ */ React.createElement(
      Sheet,
      {
        sx: {
          height: "100vh",
          width: "100%",
          display: "flex",
          overflow: "auto"
        }
      },
      confetti && /* @__PURE__ */ React.createElement(
        Confetti,
        {
          width: innerWidth,
          height: innerHeight,
          recycle: false,
          numberOfPieces: 150,
          tweenDuration: 3e3,
          gravity: 0.3,
          onConfettiComplete: () => setConfetti(false)
        }
      ),
      /* @__PURE__ */ React.createElement(
        Box,
        {
          sx: {
            width: 320,
            height: "fit-content",
            m: "auto auto",
            py: 3,
            // padding top & bottom
            px: 2,
            // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md"
          }
        },
        /* @__PURE__ */ React.createElement("div", null, error && /* @__PURE__ */ React.createElement(
          Alert,
          {
            startDecorator: /* @__PURE__ */ React.createElement(WarningIcon, null),
            sx: { my: 2 },
            variant: "outlined",
            component: "pre",
            color: "danger",
            endDecorator: /* @__PURE__ */ React.createElement(
              IconButton,
              {
                variant: "soft",
                size: "sm",
                color: "danger",
                onClick: () => setError("")
              },
              /* @__PURE__ */ React.createElement(CloseIcon, null)
            )
          },
          error
        ), success && /* @__PURE__ */ React.createElement(
          Alert,
          {
            startDecorator: /* @__PURE__ */ React.createElement(CheckCircleIcon, null),
            sx: { my: 2 },
            variant: "soft",
            component: "pre",
            color: "success",
            endDecorator: /* @__PURE__ */ React.createElement(
              IconButton,
              {
                variant: "soft",
                size: "sm",
                color: "success",
                onClick: () => setSuccess("")
              },
              /* @__PURE__ */ React.createElement(CloseIcon, null)
            )
          },
          success
        ), /* @__PURE__ */ React.createElement(Typography, { level: "h4", component: "h1" }, "Welcome!"), /* @__PURE__ */ React.createElement(Typography, { level: "body-sm" }, "Sign in to continue."), /* @__PURE__ */ React.createElement(
          Sheet,
          {
            sx: {
              bgcolor: "background.level1",
              borderRadius: "sm",
              py: 1,
              my: 1,
              display: "flex",
              textAlign: "center",
              gap: 0.5,
              "& > div": { flex: 1 }
            }
          },
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Typography, { level: "body-xs", fontWeight: "lg" }, username), /* @__PURE__ */ React.createElement(Typography, { fontWeight: "lg" }, "yosri")),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Typography, { level: "body-xs", fontWeight: "lg" }, "Password"), /* @__PURE__ */ React.createElement(Typography, { fontWeight: "lg" }, "yosri"))
        )),
        /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(FormLabel, null, "Username"), /* @__PURE__ */ React.createElement(
          Input,
          {
            name: "username",
            placeholder: "John",
            required: true
          }
        )),
        /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(FormLabel, null, "Password"), /* @__PURE__ */ React.createElement(
          Input,
          {
            name: "password",
            type: "password",
            placeholder: "Password",
            required: true
          }
        )),
        /* @__PURE__ */ React.createElement(Button, { sx: {
          mt: 1
          /* margin top */
        }, type: "submit", loading: loaded ? false : true }, "Sign in"),
        /* @__PURE__ */ React.createElement(
          Typography,
          {
            endDecorator: /* @__PURE__ */ React.createElement(
              Link,
              {
                component: "a",
                href: "#"
              },
              "Sign in"
            ),
            fontSize: "sm",
            sx: { alignSelf: "center" }
          },
          "Don't have a clue ?"
        )
      )
    )
  );
}
const pathname = window.location.pathname.split("/");
const current_path = pathname[pathname.length - 1];
function App() {
  switch (current_path) {
    case "edit":
      return /* @__PURE__ */ React.createElement(EditProfile, null);
    case "profile":
      return /* @__PURE__ */ React.createElement(Profile, null);
    default:
      return /* @__PURE__ */ React.createElement(Login, null);
  }
}
ViteSSG(
  /* @__PURE__ */ React$1.createElement(React$1.StrictMode, null, /* @__PURE__ */ React$1.createElement(App, null))
);
