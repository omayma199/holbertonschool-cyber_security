#!/usr/bin/env python3
"""
Test script to verify flag generation works correctly
"""

import os
import subprocess
import hashlib
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64

def gen_flag(password, github_username):
    """Generate flag using the same method as the bash script"""
    # Create cipher
    cipher = Cipher(
        algorithms.AES(password.encode()),
        modes.CBC(b'\x00' * 16),  # Zero IV
        backend=default_backend()
    )
    encryptor = cipher.encryptor()
    
    # Pad the username to 16 bytes
    padded_username = github_username.encode().ljust(16, b'\x00')
    
    # Encrypt
    encrypted = encryptor.update(padded_username) + encryptor.finalize()
    
    # Generate MD5 hash and take first 32 characters
    md5_hash = hashlib.md5(encrypted).hexdigest()
    return md5_hash[:32]

def test_flag_generation():
    """Test flag generation with known values"""
    test_username = "YosriGFX"
    
    # Test passwords from the bash script
    passwords = [
        "O8BZX5SITN47CNFU",  # FLAG_1
        "TAN38YQFK6HR147T",  # FLAG_2
        "YNPX7TMVI3QU9EKH",  # FLAG_3
        "NX5CUTEP6RJLF8ZO",  # FLAG_4
        "EQOSD8RUMC3A2PLT",  # FLAG_5
        "ZNBF7VJ1YTW2DAGC",  # FLAG_6
        "UA2SIQVGK7F9T384",  # FLAG_7
        "FZKA8ULWTYSJN0O3",  # FLAG_8
        "AP2XTKZMIL5V7NS4",  # FLAG_9
        "HVDM4Z8NUWYPL659",  # FLAG_10
        "GDCFT7RAV8EO5H3L",  # FLAG_11
    ]
    
    print("Testing flag generation...")
    print(f"Username: {test_username}")
    print("-" * 50)
    
    for i, password in enumerate(passwords, 1):
        flag = gen_flag(password, test_username)
        print(f"FLAG_{i}: {flag}")
    
    print("-" * 50)
    print("Flag generation test completed!")

if __name__ == "__main__":
    test_flag_generation() 