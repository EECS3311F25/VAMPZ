// src/App.jsx — 5-MIN REFRESH (ULTRA-SAFE FOR LIMITS)
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

  const fetchData = async () => {
    if (!API_KEY) {
      setError("API key missing in .env");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://api.twelvedata.com/time_series", {
        params: {
          symbol,
          interval: "1day",
          start_date: "2024-01-01",
          apikey: API_KEY,
        },
        timeout: 15000,
      });

      if (res.data.status === "error") throw new Error(res.data.message);

      if (!res.data.values || res.data.values.length === 0) {
        throw new Error("No data returned");
      }

      const formatted = res.data.values
        .slice(-252)
        .reverse()
        .map((c) => ({
          date: c.datetime.split(" ")[0],
          close: parseFloat(c.close),
        }))
        .filter((d) => d.close > 0);

      setData(formatted);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();  // Load once

    // Auto-refresh every 5 minutes (300,000 ms)
    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div style={{ padding: "2rem", background: "#0f172a", color: "#e2e8f0", minHeight: "100vh", fontFamily: "system-ui" }}>
      <h1 style={{ textAlign: "center", color: "#60a5fa", fontSize: "2rem", marginBottom: "1rem" }}>
        Historical Stock Chart
      </h1>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol (e.g., AAPL)"
          style={{
            padding: "0.6rem",
            width: "120px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #444",
            borderRadius: "6px",
            marginRight: "0.5rem",
          }}
        />
        <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Auto-updates every 5 min (safe for limits)
        </span>
      </div>

      {error && (
        <p style={{ color: "#fbbf24", background: "#451a03", padding: "1rem", borderRadius: "8px", margin: "1rem", textAlign: "center" }}>
          {error.includes("minute") ? "Rate limit hit — wait 1 min or use slower refresh." : error}
        </p>
      )}

      {loading && data.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>Loading historical data...</p>
      ) : null}

      {data.length > 0 ? (
        <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "12px", margin: "1rem" }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name="Close Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : !loading ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>No data — try AAPL or wait for refresh.</p>
      ) : null}

      <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", marginTop: "1rem" }}>
        {data.length} data points • 1 call/5 min • Under 8/min limit
      </p>
    </div>
  );
}

export default App;
