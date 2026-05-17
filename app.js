async function startExport(format) {
    const token = document.getElementById('token').value;
    const channelId = document.getElementById('channelId').value;
    const logElement = document.getElementById('log');
    
    if (!token || !channelId) {
        alert("Enter your token and a channel ID first!");
        return;
    }

    logElement.innerHTML += `<br>> Initializing ${format.toUpperCase()} export...`;

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

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const messages = await response.json();
            
            if (messages.length === 0) {
                fetching = false;
            } else {
                allMessages.push(...messages);
                lastId = messages[messages.length - 1].id;
                logElement.innerHTML += `<br>> Fetched ${allMessages.length} messages...`;
                logElement.scrollTop = logElement.scrollHeight;
            }

            // Rate limit protection
            await new Promise(r => setTimeout(r, 250));
        }

        if (format === 'json') {
            const data = JSON.stringify(allMessages, null, 2);
            downloadFile(data, `discord-cache-${channelId}.json`, 'application/json');
        } else {
            const html = generateHTML(allMessages, channelId);
            // Update the hidden print area so user can Print to PDF immediately
            document.getElementById('print-area').innerHTML = html;
            downloadFile(html, `discord-chat-${channelId}.html`, 'text/html');
        }

        logElement.innerHTML += `<br>> SUCCESS: Export complete.`;
    } catch (err) {
        logElement.innerHTML += `<br>> ERROR: ${err.message}`;
        console.error(err);
    }
}

function generateHTML(messages, id) {
    const content = messages.reverse().map(m => `
        <div style="margin-bottom: 16px; border-left: 2px solid #5865f2; padding-left: 10px;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
                <b style="color: #5865f2; font-size: 1.1em;">${m.author.username}</b>
                <span style="color: #888; font-size: 0.8em;">${new Date(m.timestamp).toLocaleString()}</span>
            </div>
            <div style="margin-top: 4px; line-height: 1.5; white-space: pre-wrap;">${m.content}</div>
        </div>
    `).join('');

    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: auto;">
            <h1 style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">Exported Channel: ${id}</h1>
            <div style="margin-top: 20px;">${content}</div>
        </div>`;
}

function downloadFile(data, filename, type) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}