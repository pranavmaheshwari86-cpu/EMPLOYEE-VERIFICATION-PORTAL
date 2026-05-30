const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Pranav\\.gemini\\antigravity\\brain\\7952f445-d2e8-44f0-9c4c-9592d745e656\\.system_generated\\logs\\transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(logPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let foundFiles = [];
  let stepIdx = 0;

  for await (const line of rl) {
    stepIdx++;
    if (line.includes('Home.jsx') || line.includes('function Home')) {
      try {
        const parsed = JSON.parse(line);
        
        // Check tool responses for view_file
        if (parsed.type === 'TOOL_RESPONSE' && parsed.content) {
            if (parsed.content.includes('export default function Home') || parsed.content.includes('const Home =')) {
                foundFiles.push({ step: parsed.step_index, content: parsed.content.substring(0, 100) + '...' });
                // Let's just write the full content of the earliest one we find to a file
                if (foundFiles.length === 1) {
                    fs.writeFileSync('C:\\Users\\Pranav\\Desktop\\EX-EMPLOYEE-VERIFICATION-PORTAL\\aetheris\\frontend\\recovered_home.jsx', parsed.content);
                }
            }
        }
        
        // Also check planner responses where we wrote to it
        if (parsed.type === 'PLANNER_RESPONSE' && parsed.tool_calls) {
            for (const call of parsed.tool_calls) {
                if (call.name === 'write_to_file' && call.args.TargetFile && call.args.TargetFile.includes('Home.jsx')) {
                     foundFiles.push({ step: parsed.step_index, type: 'write_to_file' });
                }
            }
        }

      } catch (e) {
        // ignore
      }
    }
  }
  
  console.log("Found references:", foundFiles);
}

processLineByLine();
