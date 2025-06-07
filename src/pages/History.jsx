import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../styles/History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container">
        <div className="history-content">
          <div className="error-container">
            <p className="error-message">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-content">
        <div className="history-header">
          <h1 className="history-title">Ingredient Analysis History</h1>
          <p className="history-subtitle">Your past skincare ingredient analyses</p>
        </div>
        
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-content">
                <div className="ingredients-section">
                  <div className="history-card-header">
                    <h3 className="history-card-title">Analyzed Ingredients</h3>
                    <span className="history-card-date">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="ingredients-box">
                    <p className="ingredients-text">{item.ingredient_list}</p>
                  </div>
                </div>
                
                <div className="analysis-section">
                  <h3 className="analysis-title">Analysis Results</h3>
                  <div className="analysis-content markdown-content">
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 {...props} />,
                        h2: ({node, ...props}) => <h2 {...props} />,
                        h3: ({node, ...props}) => <h3 {...props} />,
                        p: ({node, ...props}) => <p {...props} />,
                        ul: ({node, ...props}) => <ul {...props} />,
                        li: ({node, ...props}) => <li {...props} />
                      }}
                    >
                      {item.analysis_result}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {history.length === 0 && (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="empty-title">No Analysis History</h3>
            <p className="empty-message">Start analyzing ingredients to see your history here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History; 