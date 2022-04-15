const data = require("./stories.json");
  const baseUrl = "http://localhost:9006/";

  const delay = 1500;
  const projectId = 'storybook'
  const scenarios = []

  let stories = Object.values(data.stories);

  for (story of stories) {
    scenarios.push({
      label: story.id,
      url: `${baseUrl}iframe.html?id=${story.id}&viewMode=story`,
      misMatchThreshold: 1e-10,
      delay: delay,
      requireSameDimensions: false,
    });
  }

module.exports = {

	id: projectId,
	scenarios,
	onReadyScript: "onReadyScript.js",
    
	paths: {
	    "bitmaps_reference": `backstop_data/snapshots/${projectId}`,
	    "bitmaps_test": `backstop_data/bitmaps_test/${projectId}`,
	    "ci_report": "backstop_data/ci_report",
	    "engine_scripts": "backstop_data/engine_scripts",
	    "html_report": `backstop_data/html_report/${projectId}`
	},
	onBeforeScript: "puppet/onBefore.js",
	onReadyScript: "puppet/onReady.js",
	report: ["browser"],
	engine: "puppeteer",
	engineOptions: {
	    args: ["--no-sandbox"]
	},
	asyncCaptureLimit: 10,
	asyncCompareLimit: 100,
	"viewports": [
	    {
		"height": 768,
		"label": "PC",
		"width": 1920,
	    }
	]
};
