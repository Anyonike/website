import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import openpyxl
import requests
import base64

# Google Sheets Config
SHEET_ID = "your-google-sheet-id"
SHEET_NAME = "Sheet1"
CREDENTIALS_FILE = "path-to-your-google-credentials.json"

# GitHub Config
GITHUB_USERNAME = "your-username"
GITHUB_REPO = "your-repo"
FILE_PATH = "data.xlsx"
GITHUB_TOKEN = "your-github-token"

# GitHub API URL
URL = f"https://api.github.com/repos/{GITHUB_USERNAME}/{GITHUB_REPO}/contents/{FILE_PATH}"

# Authenticate with Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, scope)
client = gspread.authorize(creds)

# Read Google Sheet Data
sheet = client.open_by_key(SHEET_ID).worksheet(SHEET_NAME)
data = sheet.get_all_records()

# Convert to DataFrame
df = pd.DataFrame(data)

# Save as Excel
df.to_excel(FILE_PATH, index=False)

def get_sha():
    """Get SHA of existing file (needed for updates)."""
    response = requests.get(URL, headers={"Authorization": f"token {GITHUB_TOKEN}"})
    if response.status_code == 200:
        return response.json()["sha"]
    return None

def update_github_file():
    """Upload updated Excel file to GitHub."""
    with open(FILE_PATH, "rb") as f:
        content = base64.b64encode(f.read()).decode("utf-8")

    data = {
        "message": "Automated update from Google Sheets",
        "content": content,
        "sha": get_sha()
    }

    response = requests.put(URL, headers={"Authorization": f"token {GITHUB_TOKEN}"}, json=data)

    if response.status_code in [200, 201]:
        print("✅ Excel file updated successfully!")
    else:
        print(f"❌ Failed to update file: {response.json()}")

# Sync updated file to GitHub
update_github_file()
