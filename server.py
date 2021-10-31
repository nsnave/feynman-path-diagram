#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
      self.send_header('Access-Control-Allow-Origin', '*')
      self.send_header('Access-Control-Allow-Headers', 'content-type')
      SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS (self):
      file = open(self.path[1:], 'r')
      json = file.read()
      file.close()

      self.send_response(200)
      self.send_header('Content-Type', 'application/json')
      self.end_headers()
      self.wfile.write(json.encode(encoding='utf_8'))

    def do_POST (self):
      self.do_OPTIONS()

if __name__ == '__main__':
  test(CORSRequestHandler, HTTPServer, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)

# initial src: https://stackoverflow.com/a/21957017/11039508
