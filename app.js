async function startExport() {
    const token = document.getElementById('token').value;
    const channelId = document.getElementById('channelId').value;
    const logElement = document.getElementById('log');
    const btn = document.getElementById('exportBtn');

    if (!token || !channelId) {
        alert("Please provide both a token and channel ID.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Exporting...";
    logElement.innerHTML += `<br>> Starting export for channel: ${channelId}`;

    let allMessages = [];
    let lastId = null;
    let fetching = true;

    try {
        while (fetching) {
            let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`;
            if (lastId) url += `&before=${lastId}`;

            const response = await fetch(url, {
                headers: { "Authorization": token }
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const messages = await response.json();
            
            if (messages.length === 0) {
                fetching = false;
            } else {
                allMessages.push(...messages);
                lastId = messages[messages.length - 1].id;
                logElement.innerHTML += `<br>> Fetched ${allMessages.length} messages...`;
                logElement.scrollTop = logElement.scrollHeight;
            }

            // Small delay to prevent rate limiting
            await new Promise(r => setTimeout(r, 200));
        }

        downloadFile(allMessages, `export-${channelId}.json`);
        logElement.innerHTML += `<br>> Success! File downloaded.`;
    } catch (err) {
        logElement.innerHTML += `<br>> ERROR: ${err.message}`;
    } finally {
        btn.disabled = false;
        btn.innerText = "Export to JSON";
    }
}

function downloadFile(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}