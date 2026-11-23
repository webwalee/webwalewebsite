import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import * as path from "node:path";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  business: string;
  requirement: string;
  budget: string;
  details?: string;
  timestamp: string;
  source: string;
  status: "New" | "Contacted" | "Completed";
}

const DATA_FILE = path.resolve(process.cwd(), "data", "leads.json");

function readLeadsFromFile(): LeadRecord[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content) || [];
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

function writeLeadsToFile(leads: LeadRecord[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing leads file:", err);
  }
}

// Server function: Submit new lead into backend storage
export const submitLead = createServerFn({ method: "POST" })
  .validator((lead: Omit<LeadRecord, "id" | "status">) => lead)
  .handler(async ({ data }) => {
    const leads = readLeadsFromFile();
    const newLead: LeadRecord = {
      ...data,
      id: "WW-" + Math.floor(1000 + Math.random() * 9000),
      status: "New",
    };
    leads.unshift(newLead);
    writeLeadsToFile(leads);
    return { ok: true, lead: newLead };
  });

// Server function: Fetch all leads (requires credentials)
export const getLeads = createServerFn({ method: "POST" })
  .validator((auth: { username: string; password: string }) => auth)
  .handler(async ({ data }) => {
    if (data.username === "webwale" && data.password === "Sharry@678") {
      const leads = readLeadsFromFile();
      return { ok: true, leads };
    }
    return { ok: false, error: "Invalid username or password" };
  });

// Server function: Delete a lead
export const deleteLead = createServerFn({ method: "POST" })
  .validator((payload: { id: string; username: string; password: string }) => payload)
  .handler(async ({ data }) => {
    if (data.username !== "webwale" || data.password !== "Sharry@678") {
      return { ok: false, error: "Unauthorized" };
    }
    let leads = readLeadsFromFile();
    leads = leads.filter((l) => l.id !== data.id);
    writeLeadsToFile(leads);
    return { ok: true, leads };
  });
