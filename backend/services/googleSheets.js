// 1. Import the Google API library
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 2. File path helpers for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Loading Service Account credentials
const credentialsPath = path.join(__dirname, "../credentials/sheets.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// 4. Creating JWT client using credentials
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

// 5. Initializing Sheets API
const sheets = google.sheets({ version: "v4", auth });

export const getAllDishes = async () => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Dishes!A2:F",
  });

  const rows = response.data.values || [];

  return rows.map((row) => ({
    id: row[0],
    name: row[1],
    price: row[2],
    category: row[3],
    description: row[4],
    image: row[5],
  }));
};

export const addDish = async (dishData) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Dishes!A2",
    valueInputOption: "RAW",
    resource: { values: [[
      Date.now().toString(),
      dishData.name,
      dishData.price,
      dishData.category,
      dishData.description,
      dishData.image
    ]] }
  });

  return true;
};

export const updateDish = async (rowNumber, newData) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `Dishes!A${rowNumber}:F${rowNumber}`,
    valueInputOption: "RAW",
    resource: {
      values: [[
        newData.id,
        newData.name,
        newData.price,
        newData.category,
        newData.description,
        newData.image
      ]]
    }
  });

  return true;
};

export const deleteDish = async (rowNumber) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: `Dishes!A${rowNumber}:F${rowNumber}`,
  });

  return true;
};
