// Load environment variables from .env file
require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MCP TOOL SYSTEM

const tools = {};  // Later add tools

// Simple MCP-style handler placeholder

app.post("/mcp", async (req, res) => {
    try {
        const { tool, input } = req.body;

        if (!tool || !tools[tool]) {
            return res.status(400).json({
                error: "Tool not found",
                availableTools: Object.keys(tools),
            });
        }

        const result = await tools[tool](input);

        res.json({
            success: true,
            result,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});


// Health check route
app.get("/", (req, res) => {
    res.send("MCP Server is running 🚀");
});

// Start server
app.listen(PORT, () => {
    console.log(`MCP Server running on http://localhost:${PORT}`);
});