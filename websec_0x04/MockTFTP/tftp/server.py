#!/usr/bin/env python3
""" Proudly Written by Yosri"""
import socket
from os import getenv
from random import choice
from time import sleep
import logging


def dots(length=10):
    """do dots"""
    return "".join(["_" for _ in range(length)])


class TFTPmock:
    def __init__(self, config={}):
        self.config = config

    def bind(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        host = self.config.get("HOST", "127.0.0.1")
        port = self.config.get("PORT", "69")
        self.socket.bind((host, port))
        logging.warning(
            f"[*] TFTP Server listening on {host}:{port}, Target File {self.config.get('FILE')}"
        )
        self.wait_request()

    def send_null_packet(self, client_address):
        """send_data_packet"""
        sleep(0.1)
        self.socket.sendto(b"", client_address)

    def send_data_packet(self, client_address):
        """send_data_packet"""
        content = self.config.get("CONTENT", "empty file!")
        self.socket.sendto(
            b"\x00\x03\x00\x01" + content.encode("UTF-8"), client_address
        )

    def send_version_packet(self, client_address):
        """send_data_packet"""
        content = self.config.get("VERSION", "empty file!")
        self.socket.sendto(
            b"\x00\x03\x00\x01" + content.encode("UTF-8"), client_address
        )

    def handle_request(self, data, client_address):
        """Handle Request"""
        target_file = self.config.get("FILE", "test.txt")
        if data.startswith(f"\x00\x01{target_file}".encode("UTF-8")):
            logging.warning(
                f'[+] Valid   request received from "{client_address}" for "{target_file}" Binary: "{data}"'
            )
            self.send_data_packet(client_address)
        elif data.startswith(b"\x00\x01r7tftp.txt"):
            logging.warning(
                f'[+] Valid   request received from "{client_address}" for "tftp.txt" Binary: "{data}"'
            )
            self.send_version_packet(client_address)
        else:
            logging.info(
                f'[-] Invalid request received from "{client_address}" Binary: {data}'
            )
            self.send_null_packet(client_address)
        return self.wait_request()

    def wait_request(self):
        """Wait for a request"""
        try:
            buffer_size = self.config.get("BUFFER_SIZE", 516)
            data, client_address = self.socket.recvfrom(buffer_size)
            return self.handle_request(data, client_address)
        except KeyboardInterrupt:
            logging.info("\n[!] Stopping the server")
            self.socket.close()
            return False


if __name__ == "__main__":
    tftp = TFTPmock(
        {
            "HOST": "0.0.0.0",
            "PORT": 69,
            "BUFFER_SIZE": 516,
            "FILE": choice(
                [
                    "infrared.txt",
                    "OS79XX.TXT",
                    "phbook00e011010455.txt",
                    "sip_4602D01A.txt",
                    "sip_4602D02A.txt",
                    "uniden00e011030397.txt",
                    "unidencom.txt",
                ]
            ),
            "CONTENT": f"Congratulations! FLAG: {getenv('FLAG_8')}",
            "VERSION": f"{dots(80)}Hello_from_Holberton{dots(42)}FLAG:____{getenv('FLAG_8')}_{dots(100)}",
        }
    )
    tftp.bind()

# 8. The Buster Series - Tackling TFTP with Brute Force `tftp mode`
