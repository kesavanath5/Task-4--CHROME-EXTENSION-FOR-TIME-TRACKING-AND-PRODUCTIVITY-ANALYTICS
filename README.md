# Task-4--CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS

Company: CodeTech IT solutions 
Name: KESAVA NATH G 
Domain: Full Stack Development 
Intern ID: CT04DG3221 
Duration: 4 Weeks 
Mentor: Neela Santhosh Kumar

This Chrome Extension is designed to track the amount of time a user spends on different websites and provide productivity analytics in a simple popup dashboard. It’s built using HTML, JavaScript, and Chrome’s Extension APIs. Here’s a breakdown of the entire working process:

1. Manifest File Initialization
Every Chrome Extension begins with a manifest.json file. It tells Chrome how to load and handle the extension. This manifest uses version 3 and specifies:

Permissions: tabs, storage, alarms, and activeTab for monitoring tab activity and saving data.

Background Script: A background.js service worker that constantly tracks activity.

Action: Specifies popup.html as the UI when the user clicks on the extension icon.

2. Tracking Website Activity (background.js)
The background.js script is responsible for monitoring which tab is active and how long it’s viewed. Here's how it works:

It listens for three main events:

onActivated: When a user switches to a different tab.

onUpdated: When a tab finishes loading.

onFocusChanged: When the user switches or minimizes the Chrome window.

Each time one of these events triggers:

It checks the currently active tab’s URL.

Records the time spent on the previous tab by subtracting the last recorded timestamp from the current one.

It stores this time data in chrome.storage.local under the corresponding domain name.

Additionally, an alarm is set up to update the time every 1 minute, ensuring background tracking remains accurate even when no tab-switching occurs.

3. Classifying Websites
To provide productivity analytics, the extension classifies domains as either:

Productive – such as stackoverflow.com, github.com

Unproductive – such as facebook.com, twitter.com

This classification is hardcoded using pattern matching (i.e., checking if the domain contains a productive or unproductive keyword).

4. Displaying Data (popup.html & popup.js)
When the user clicks the extension icon:

popup.html is shown, containing a <div> to display content.

popup.js fetches all stored data using chrome.storage.local.get.

It then:

Loops through each domain and the time spent (in milliseconds).

Converts the time to minutes and categorizes it as productive/unproductive using the same matching logic.

Displays each site with the time spent.

Shows a summary:

Total Productive Time

Total Unproductive Time

Productivity Score = (Productive Time / Total Time) × 100

This gives users a clear snapshot of how they’re spending their time.

5. Icon Files
Dummy icon files (icon16.png, icon48.png, icon128.png) are used for extension branding. Chrome uses these in the toolbar and extension manager.

🔚 Conclusion
This extension runs entirely in the browser using Chrome APIs and local storage, making it privacy-friendly and easy to install. It helps users become more self-aware of their web habits by categorizing their activities and giving them a weekly/daily productivity score, all without needing a server.

Output:


