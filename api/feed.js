
export default async function handler(request, response) {
    try {
        const res = await fetch('https://feeds.bbci.co.uk/news/rss.xml?edition=uk');
        const data = await res.text();
        
        // Set appropriate headers
        response.setHeader('Content-Type', 'application/xml');
        response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
        
        return response.status(200).send(data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error)
        return response.status(500).send('Failed to fetch RSS feed');
    }
  }