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
    logElement.innerHTML += `<br>> Starting export for: ${channelId}`;

    let allMessages = [];
    let lastId = null;
    let fetching = true;

    try {
        while (fetching) {
            let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`;
            if (lastId) url += `&before=${lastId}`;

            const response = await fetch(url, { headers: { "Authorization": token } });
            if (!response.ok) throw new Error(`Status: ${response.status}`);

            const messages = await response.json();
            if (messages.length === 0) { fetching = false; } 
            else {
                allMessages.push(...messages);
                lastId = messages[messages.length - 1].id;
                logElement.innerHTML += `<br>> Fetched ${allMessages.length} messages...`;
                logElement.scrollTop = logElement.scrollHeight;
            }
            await new Promise(r => setTimeout(r, 200));
        }

        // Generate the HTML view
        const htmlContent = generateHTML(allMessages, channelId);
        downloadFile(htmlContent, `chat-${channelId}.html`, 'text/html');
        
        logElement.innerHTML += `<br>> Success! HTML file downloaded.`;
    } catch (err) {
        logElement.innerHTML += `<br>> ERROR: ${err.message}`;
    } finally {
        btn.disabled = false;
        btn.innerText = "Export to HTML";
    }
}

function generateHTML(messages, id) {
    const rows = messages.reverse().map(m => `
        <div style="margin-bottom: 15px; font-family: sans-serif;">
            <strong style="color: #5865f2;">${m.author.username}</strong> 
            <small style="color: #888;">${new Date(m.timestamp).toLocaleString()}</small>
            <div style="margin-top: 5px; color: #dcddde;">${m.content}</div>
        </div>
    `).join('');

    return `
        <html>
        <body style="background-color: #313338; color: white; padding: 20px;">
            <h2>Exported Chat: ${id}</h2>
            <hr style="border: 1px solid #444; margin-bottom: 20px;">
            ${rows}
        </body>
        </html>`;
}

function downloadFile(data, filename, type) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}