
import { STATUS_TYPE } from "../src/consts";

export default async function handler(request, response) {
    try {
        const response = await fetch('https://feeds.bbci.co.uk/news/rss.xml?edition=uk');
        const data = await response.text();
        
        // Set appropriate headers
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
        
        return response.status(200).json(data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error)
        return response.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
  }