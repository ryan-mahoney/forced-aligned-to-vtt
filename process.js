const fs = require("fs");

// // Input data
// const data = [
//   {
//     start: 0.14,
//     end: 0.46,
//     text: "\ufeffHiring",
//     score: -1.1159706115722656,
//   },
//   {
//     start: 0.46,
//     end: 0.56,
//     text: "is",
//     score: -0.014676235616207123,
//   },
//   {
//     start: 0.56,
//     end: 0.64,
//     text: "a",
//     score: -0.02275739796459675,
//   },
// ];

let data = JSON.parse(fs.readFileSync("audio.json")).segments;

// Helper function to format time into WebVTT timestamp format (HH:MM:SS.mmm)
const formatTime = (timeInSeconds) => {
  const date = new Date(timeInSeconds * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// Function to generate WebVTT captions with approximately 20-second segments
const generateWebVTT = (segments, segmentLength = 6) => {
  let vttOutput = "WEBVTT\n\n"; // WebVTT header
  let tempText = "";
  let startTime = segments[0].start;
  let segmentStartTime = startTime;

  segments.forEach((segment, index) => {
    tempText += `${segment.text} `; // Concatenate text segments

    const elapsedTime = segment.end - segmentStartTime;

    // Check if we've reached the segment length or the last segment
    if (elapsedTime >= segmentLength || index === segments.length - 1) {
      const captionStart = formatTime(segmentStartTime);
      const captionEnd = formatTime(segment.end);

      vttOutput += `${index + 1}\n`; // Caption number
      vttOutput += `${captionStart} --> ${captionEnd}\n`; // Timing
      vttOutput += `${tempText.trim()}\n\n`; // Caption text

      // Reset for the next segment
      segmentStartTime = segment.end;
      tempText = "";
    }
  });

  return vttOutput;
};

// Generate the WebVTT content
const webvttContent = generateWebVTT(data);

// Save to a file
fs.writeFileSync("output.vtt", webvttContent);

console.log("WebVTT file generated: output.vtt");
