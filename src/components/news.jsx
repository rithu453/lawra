import React, { useEffect, useState } from 'react';
import './news.css';

const LegalNews = () => {
  const [legalNews, setLegalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/news');

        if (!response.ok) {
          const message = `Server responded with status ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();

        if (data?.legal_news?.length > 0) {
          setLegalNews(data.legal_news);
        } else {
          throw new Error('No legal news found.');
        }

      } catch (err) {
        setError(err.message || 'Something went wrong fetching legal news.');
        console.error('Error fetching legal news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="legal-news-container">
      <div className="legal-news-header">
        <h2>Latest Legal News</h2>
        <p className="news-source">Source: Indian Legal Media </p>
      </div>
      <div>

      {loading && (
        <div className="loading-indicator">
          <p>Loading legal news...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <ul className="news-list">
          {legalNews.map((item, index) => (
            <li key={index} className="news-item">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="news-image"
                  />
                )}
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="more-news">
  <p>
    For more legal news, visit{" "}
    <a
      href="https://timesofindia.indiatimes.com/topic/law"
      target="_blank"
      rel="noopener noreferrer"
    >
      TOI Legal News
    </a>.
  </p>
</div>

    </div>
    
    
  );
};

export default LegalNews;
