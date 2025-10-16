import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import Alert from "@mui/joy/Alert";
import SendIcon from "@mui/icons-material/Send";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function ChatArea({ selectedLab, labs }) {
  const [chatSessions, setChatSessions] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [labStatus, setLabStatus] = useState("offline");

  // Get API key from localStorage
  const apiKey = localStorage.getItem("gemini_api_key");

  // Get current lab's messages
  const currentLabId = selectedLab?.id;
  const messages = chatSessions[currentLabId] || [];

  // Check lab status
  useEffect(() => {
    if (selectedLab) {
      checkLabStatus(selectedLab.id);
    }
  }, [selectedLab]);

  const checkLabStatus = async (labId) => {
    try {
      const response = await fetch(`/api/labs/${labId}/status`);
      const data = await response.json();
      setLabStatus(
        data.status === "active" || data.status === "completed"
          ? "online"
          : "offline"
      );
    } catch (error) {
      setLabStatus("offline");
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !selectedLab) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    // Add message to current lab's session
    const updatedMessages = [...messages, userMessage];
    setChatSessions((prev) => ({
      ...prev,
      [currentLabId]: updatedMessages,
    }));

    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          lab_id: selectedLab.id,
          api_key: apiKey,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: data.response || "No response from lab",
        timestamp: new Date(),
        success: data.success || false,
        flag: data.flag,
        challenge_completed: data.challenge_completed || false,
      };

      // Add AI response to current lab's session
      setChatSessions((prev) => ({
        ...prev,
        [currentLabId]: [...updatedMessages, aiMessage],
      }));
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "error",
        content: "Failed to connect to lab. Please ensure the lab is running.",
        timestamp: new Date(),
      };

      setChatSessions((prev) => ({
        ...prev,
        [currentLabId]: [...updatedMessages, errorMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (!selectedLab) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          p: { xs: 2, sm: 4 },
          background:
            "linear-gradient(135deg, #1a1a1a 80%, #2d2d30 10%, #1a1a1a 10%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "auto",
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(100,100,100,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo and Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            zIndex: 1,
            mt: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              background: "rgba(40,40,40,0.8)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              border: "2px solid rgba(80,80,80,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <SecurityIcon
              sx={{
                fontSize: 40,
                color: "#64748b",
              }}
            />
          </Box>

          <Typography
            level="h2"
            sx={{
              mb: 2,
              color: "#e2e8f0",
              fontWeight: 700,
              textAlign: "center",
              fontSize: { xs: "2rem", sm: "2.5rem" },
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            AI Security Labs
          </Typography>

          <Typography
            level="body-lg"
            sx={{
              textAlign: "center",
              maxWidth: 700,
              color: "#94a3b8",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.6,
              textShadow: "0 1px 5px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            Master the art of prompt injection through hands-on challenges. Each
            lab presents unique AI security scenarios designed to test and
            enhance your skills in identifying and exploiting vulnerabilities in
            large language models.
          </Typography>

          <Typography
            level="body-md"
            sx={{
              textAlign: "center",
              maxWidth: 600,
              color: "#64748b",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            Select any lab from the collection below to begin your journey into
            AI security testing. Progress from basic techniques to advanced
            exploitation methods.
          </Typography>
        </Box>

        {/* Lab Categories and Cards */}
        <Box
          sx={{
            maxWidth: 1200,
            width: "100%",
            zIndex: 1,
            mb: 4,
          }}
        >
          {/* Basic Challenges */}
          <Box sx={{ mb: 4 }}>
            <Typography
              level="h4"
              sx={{
                color: "#e2e8f0",
                mb: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Basic Challenges
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
                mb: 1,
              }}
            >
              {labs
                .filter((lab) => lab.id <= 3)
                .map((lab) => (
                  <Card
                    key={lab.id}
                    variant="plain"
                    sx={{
                      p: 3,
                      background: "rgba(30,30,30,0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(60,60,60,0.3)",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      height: "fit-content",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        background: "rgba(40,40,40,0.9)",
                        borderColor: "rgba(80,80,80,0.5)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          background: "rgba(34, 197, 94, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <SecurityIcon
                          sx={{
                            fontSize: 18,
                            color: "#22c55e",
                          }}
                        />
                      </Box>
                      <Typography
                        level="title-md"
                        sx={{
                          color: "#e2e8f0",
                          fontWeight: 600,
                        }}
                      >
                        Lab {lab.id}: {lab.title}
                      </Typography>
                    </Box>

                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 3,
                        color: "#94a3b8",
                        lineHeight: 1.5,
                        minHeight: "3em",
                      }}
                    >
                      {lab.description}
                    </Typography>

                    <Chip
                      size="sm"
                      variant="soft"
                      sx={{
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                        color: "#22c55e",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        fontWeight: 500,
                      }}
                    >
                      Basic Challenge
                    </Chip>
                  </Card>
                ))}
            </Box>
          </Box>

          {/* Advanced Challenges */}
          <Box sx={{ mb: 4 }}>
            <Typography
              level="h4"
              sx={{
                color: "#e2e8f0",
                mb: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Advanced Challenges
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
                mb: 1,
              }}
            >
              {labs
                .filter((lab) => lab.id > 3 && lab.id <= 6)
                .map((lab) => (
                  <Card
                    key={lab.id}
                    variant="plain"
                    sx={{
                      p: 3,
                      background: "rgba(30,30,30,0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(60,60,60,0.3)",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      height: "fit-content",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        background: "rgba(40,40,40,0.9)",
                        borderColor: "rgba(80,80,80,0.5)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          background: "rgba(249, 115, 22, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <SecurityIcon
                          sx={{
                            fontSize: 18,
                            color: "#f97316",
                          }}
                        />
                      </Box>
                      <Typography
                        level="title-md"
                        sx={{
                          color: "#e2e8f0",
                          fontWeight: 600,
                        }}
                      >
                        Lab {lab.id}: {lab.title}
                      </Typography>
                    </Box>

                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 3,
                        color: "#94a3b8",
                        lineHeight: 1.5,
                        minHeight: "3em",
                      }}
                    >
                      {lab.description}
                    </Typography>

                    <Chip
                      size="sm"
                      variant="soft"
                      sx={{
                        backgroundColor: "rgba(249, 115, 22, 0.2)",
                        color: "#f97316",
                        border: "1px solid rgba(249, 115, 22, 0.3)",
                        fontWeight: 500,
                      }}
                    >
                      Advanced Challenge
                    </Chip>
                  </Card>
                ))}
            </Box>
          </Box>

          {/* Expert Challenges */}
          <Box>
            <Typography
              level="h4"
              sx={{
                color: "#e2e8f0",
                mb: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Expert Challenges
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                },
                gap: 3,
                justifyContent: "center",
              }}
            >
              {labs
                .filter((lab) => lab.id > 6)
                .map((lab) => (
                  <Card
                    key={lab.id}
                    variant="plain"
                    sx={{
                      p: 3,
                      background: "rgba(30,30,30,0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(60,60,60,0.3)",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      height: "fit-content",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        background: "rgba(40,40,40,0.9)",
                        borderColor: "rgba(80,80,80,0.5)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          background: "rgba(239, 68, 68, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <SecurityIcon
                          sx={{
                            fontSize: 18,
                            color: "#ef4444",
                          }}
                        />
                      </Box>
                      <Typography
                        level="title-md"
                        sx={{
                          color: "#e2e8f0",
                          fontWeight: 600,
                        }}
                      >
                        Lab {lab.id}: {lab.title}
                      </Typography>
                    </Box>

                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 3,
                        color: "#94a3b8",
                        lineHeight: 1.5,
                        minHeight: "3em",
                      }}
                    >
                      {lab.description}
                    </Typography>

                    <Chip
                      size="sm"
                      variant="soft"
                      sx={{
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                        color: "#ef4444",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        fontWeight: 500,
                      }}
                    >
                      Expert Challenge
                    </Chip>
                  </Card>
                ))}
            </Box>
          </Box>
        </Box>

        {/* Call to action */}
        <Box
          sx={{
            textAlign: "center",
            zIndex: 1,
            mb: 4,
          }}
        >
          <Typography
            level="body-sm"
            sx={{
              color: "#64748b",
              fontSize: "0.9rem",
            }}
          >
            Choose any lab from above to start your AI security journey →
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SecurityIcon />
        <Box sx={{ flex: 1 }}>
          <Typography level="h5">
            Lab {selectedLab.id}: {selectedLab.title}
          </Typography>
          <Typography level="body-sm" color="neutral">
            {selectedLab.description}
          </Typography>
        </Box>
        <Chip
          variant="soft"
          color={labStatus === "online" ? "success" : "danger"}
          startDecorator={
            labStatus === "online" ? <CheckCircleIcon /> : <ErrorIcon />
          }
        >
          {labStatus === "online" ? "Online" : "Offline"}
        </Chip>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.length === 0 ? (
          <Alert variant="soft" color="info">
            Start the conversation by sending a message to the AI. Try to
            achieve the lab's objective!
          </Alert>
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.type === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  maxWidth: "70%",
                  backgroundColor:
                    message.type === "user"
                      ? "primary.softBg"
                      : "background.surface",
                  borderColor:
                    message.type === "user" ? "primary.200" : "neutral.200",
                }}
              >
                <Typography level="body-sm" sx={{ mb: 1, opacity: 0.7 }}>
                  {message.type === "user" ? "You" : "AI"} •{" "}
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
                <Typography level="body-md">{message.content}</Typography>
                {message.success && (
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      size="sm"
                      color="success"
                      startDecorator={<CheckCircleIcon />}
                      sx={{ mb: 1 }}
                    >
                      Challenge Completed!
                    </Chip>
                    {message.flag && (
                      <Alert variant="soft" color="success" sx={{ mt: 1 }}>
                        <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
                          🏆 Flag: {message.flag}
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                )}
              </Card>
            </Box>
          ))
        )}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Card
              variant="outlined"
              sx={{ backgroundColor: "background.surface" }}
            >
              <Typography level="body-md">AI is thinking...</Typography>
            </Card>
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Textarea
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            minRows={1}
            maxRows={4}
            sx={{ flex: 1 }}
            disabled={labStatus === "offline" || isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={
              !inputValue.trim() || labStatus === "offline" || isLoading
            }
            sx={{ minWidth: "auto", px: 2 }}
          >
            <SendIcon />
          </Button>
        </Box>

        {labStatus === "offline" && (
          <Alert variant="soft" color="danger" sx={{ mt: 1 }}>
            Lab is offline. Please start the lab container first.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
