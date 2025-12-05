import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Google Credentials
const credentialsPath = path.join(__dirname, "../credentials/sheet.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// Authenticate Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// ---------------- GET ALL DISHES ----------------
export const getAllDishes = async () => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1!A2:G", 
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    id: row[0],
    name: row[1],
    price: row[2],
    category: row[3],
    is_veg: Number(row[4]),
    description: row[5] || "",
    image: row[6] || "",
    rowNumber: index + 2,
  }));
};

// ---------------- ADD DISH ----------------
export const addDish = async (data) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[
        data.id,
        data.name,
        data.price,
        data.category,
        data.is_veg,
        data.description ?? "",
        data.image ?? "",
      ]]
    }
  });

  return true;
};

// ---------------- UPDATE DISH ----------------
export const updateDish = async (rowNumber, data) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `Sheet1!A${rowNumber}:G${rowNumber}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[
        data.id,
        data.name,
        data.price,
        data.category,
        data.is_veg,
        data.description ?? "",
        data.image ?? "",
      ]]
    }
  });

  return true;
};

// ---------------- DELETE DISH ----------------
export const deleteDish = async (rowNumber) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,       
              dimension: "ROWS",
              startIndex: rowNumber - 1,
              endIndex: rowNumber,
            },
          },
        },
      ],
    },
  });

  return true;
};
