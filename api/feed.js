
export async function GET(request) {
    try {
        const response = await fetch('https://feeds.bbci.co.uk/news/rss.xml?edition=uk');
        const data = await response.text();
        
        // Set appropriate headers
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
        
        return new Response(data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return new Response({ error: 'Failed to fetch RSS feed' });
    }
  }