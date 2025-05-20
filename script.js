document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchNews');
    const newsList = document.getElementById('newsList');
    const loading = document.getElementById('loading');

    fetchButton.addEventListener('click', async () => {
        try {
            loading.style.display = 'block';
            newsList.innerHTML = '';

            // Fetch from our Vercel API route
            const response = await fetch('/api/feed.js');
            const xmlText = await response.text();
            
            
            // Parse the XML content
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Get all news items
            const items = xmlDoc.getElementsByTagName('item');
            
            // Display each news item
            Array.from(items).forEach(item => {
                const title = item.getElementsByTagName('title')[0].textContent;
                const link = item.getElementsByTagName('link')[0].textContent;
                const pubDate = new Date(item.getElementsByTagName('pubDate')[0].textContent);
                
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <h2><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
                    <div class="date">${pubDate.toLocaleDateString()} ${pubDate.toLocaleTimeString()}</div>
                `;
                
                newsList.appendChild(newsItem);
            });
        } catch (error) {
            console.error('Error fetching news:', error);
            newsList.innerHTML = '<div class="error">Error loading news. Please try again later.</div>';
        } finally {
            loading.style.display = 'none';
        }
    });
}); 