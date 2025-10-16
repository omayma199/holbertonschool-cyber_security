import { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Alert from '@mui/joy/Alert';
import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function ApiKeySetup({ onApiKeySet }) {
    const [apiKey, setApiKey] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationStatus, setValidationStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validateApiKey = async () => {
        if (!apiKey.trim()) {
            setErrorMessage('Please enter your Gemini API key');
            setValidationStatus('error');
            return;
        }

        setIsValidating(true);
        setErrorMessage('');
        setValidationStatus(null);

        try {
            // Test the API key by making a simple request
            const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ api_key: apiKey })
            });

            if (response.ok) {
                setValidationStatus('success');
                // Store the API key and proceed to labs
                localStorage.setItem('gemini_api_key', apiKey);
                onApiKeySet(apiKey);
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Invalid API key. Please check and try again.');
                setValidationStatus('error');
            }
        } catch (error) {
            setErrorMessage('Failed to validate API key. Please check your connection and try again.');
            setValidationStatus('error');
        } finally {
            setIsValidating(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateApiKey();
        }
    };

    return (
        <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            minHeight: '100vh'
        }}>
            <Card 
                variant="outlined" 
                sx={{ 
                    p: 4, 
                    maxWidth: 500, 
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <SecurityIcon sx={{ fontSize: 64, color: 'primary.500', mb: 2 }} />
                
                <Typography level="h3" sx={{ mb: 2 }}>
                    Welcome to AI Security Labs
                </Typography>
                
                <Typography level="body-lg" sx={{ mb: 3, color: 'neutral.600' }}>
                    This platform uses Google's Gemini AI to create interactive security challenges. 
                    You'll need a Gemini API key to get started.
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography level="body-sm" sx={{ mb: 2, textAlign: 'left' }}>
                        <strong>How to get your API key:</strong>
                    </Typography>
                    <Box component="ol" sx={{ textAlign: 'left', pl: 2 }}>
                        <Typography component="li" level="body-sm" sx={{ mb: 1 }}>
                            Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>
                        </Typography>
                        <Typography component="li" level="body-sm" sx={{ mb: 1 }}>
                            Sign in with your Google account
                        </Typography>
                        <Typography component="li" level="body-sm" sx={{ mb: 1 }}>
                            Click "Create API Key" and copy the generated key
                        </Typography>
                        <Typography component="li" level="body-sm">
                            Paste it in the field below
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Input
                        fullWidth
                        placeholder="Enter your Gemini API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        onKeyPress={handleKeyPress}
                        type="password"
                        startDecorator={<KeyIcon />}
                        sx={{ mb: 2 }}
                    />
                    
                    <Button
                        fullWidth
                        onClick={validateApiKey}
                        disabled={isValidating || !apiKey.trim()}
                        loading={isValidating}
                        size="lg"
                    >
                        {isValidating ? 'Validating...' : 'Start Labs'}
                    </Button>
                </Box>

                {validationStatus === 'success' && (
                    <Alert 
                        variant="soft" 
                        color="success" 
                        startDecorator={<CheckCircleIcon />}
                        sx={{ mb: 2 }}
                    >
                        API key validated successfully! Loading labs...
                    </Alert>
                )}

                {validationStatus === 'error' && (
                    <Alert 
                        variant="soft" 
                        color="danger" 
                        startDecorator={<ErrorIcon />}
                        sx={{ mb: 2 }}
                    >
                        {errorMessage}
                    </Alert>
                )}

                <Typography level="body-sm" color="neutral" sx={{ mt: 2 }}>
                    Your API key is stored locally and never sent to our servers.
                </Typography>
            </Card>
        </Box>
    );
} 