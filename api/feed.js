export default async function handler(req, res) {
    try {
        const response = await fetch('https://feeds.bbci.co.uk/news/rss.xml?edition=uk');
        const data = await response.text();
        
        // Set appropriate headers
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
        
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
} 