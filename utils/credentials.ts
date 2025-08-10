import * as fs from "fs";
import * as path from "path";

export interface Credentials {
  username: string;
  password: string;
}

export function loadCredentials(): Credentials {
  const envUser = process.env.SAUCE_USERNAME;
  const envPass = process.env.SAUCE_PASSWORD;
  if (envUser && envPass) {
    return { username: envUser, password: envPass };
  }

  const credsPath = path.resolve(__dirname, "..", "data", "creds.json");
  const raw = fs.readFileSync(credsPath, "utf-8");
  const json = JSON.parse(raw) as Credentials;
  return { username: json.username, password: json.password };
}
