# Flag System Documentation

## Overview

The Hub now includes a comprehensive flag system that generates unique flags for each lab challenge. When a user successfully completes a challenge, they receive a flag that serves as proof of completion.

## Components

### 1. Flag Generation (`/etc/flags.sh`)

The flag generation script creates unique flags based on:
- GitHub username (retrieved from the API or defaulted to "YosriGFX")
- Predefined passwords for each lab
- AES-256-CBC encryption with MD5 hashing

### 2. Environment Variables

The following environment variables are set:
- `FLAG_1` - Lab 1 (Session Hijacking)
- `FLAG_2` - Lab 2 (Crypto Encoding)
- `FLAG_3` - Lab 3 (XSS Stored)
- `FLAG_4` - Lab 4 (XSS Stored)
- `FLAG_5` - Lab 5 (SQLi 01)
- `FLAG_6` - Lab 6 (SQLi 02)
- `FLAG_7` - Lab 7 (SQLi 03)
- `FLAG_8` - Lab 8 (SQLi 04)
- `FLAG_9` - Lab 9 (noSQLi 01)
- `FLAG_10` - Lab 10 (noSQLi 02)
- `FLAG_11` - Lab 11 (Additional Challenge)

### 3. Nginx Configuration (`/etc/nginx/nginx.conf`)

- Redirects port 80 to `web0x01.hbtn`
- Disables XSS protection header
- Proxies requests to Flask application via Unix socket

### 4. Entrypoint Script (`/etc/entrypoint.sh`)

- Sources the flags script
- Starts nginx service
- Runs glances monitoring
- Starts gunicorn with all flag environment variables
- Removes the flags script after execution for security

## API Endpoints

### New Endpoints

1. **GET `/api/labs/{lab_id}/flag`**
   - Returns the flag for a completed lab
   - Requires lab to be completed (bypassed or revealed)

2. **Enhanced `/api/chat`**
   - Now includes flag in response when challenge is completed
   - Returns `challenge_completed: true` and `flag: "..."` on success

### Enhanced Health Check

The `/health` endpoint now includes:
- `flags_loaded`: Number of flags successfully loaded

## Frontend Integration

The ChatArea component has been updated to:
- Display flags when challenges are completed
- Show a success message with the flag
- Include a trophy emoji (🏆) for visual appeal

## Security Features

1. **Flag Removal**: The flags script is removed after execution
2. **Environment Variables**: Flags are passed as environment variables to gunicorn
3. **Access Control**: Flags are only accessible when labs are completed
4. **Unique Generation**: Each flag is unique per user and lab

## Testing

Use the `test_flags.py` script to verify flag generation:

```bash
python test_flags.py
```

## Deployment

The system is designed to work with Docker containers and includes:
- Nginx for reverse proxy
- Gunicorn for WSGI server
- Environment-based flag generation
- Automatic cleanup of sensitive files

## Flag Format

Flags are 32-character hexadecimal strings generated using:
1. AES-256-CBC encryption of the GitHub username
2. MD5 hashing of the encrypted result
3. Taking the first 32 characters of the hash

Example: `a1b2c3d4e5f678901234567890123456` 