// Style JS

// --- Add CSS Styles ---
export function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Search Container Enhancements */
        .search-container {
            position: relative;
            max-width: 500px;
            margin: 0 auto;
        }
        
        .search-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        #search-input {
            padding-right: 80px; /* Space for the help button */
        }
        
        .search-help-btn {
            position: absolute;
            right: 20px;
            top: 80%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 18px;
            padding: 5px;
            z-index: 5;
        }
        
        .search-help-panel {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 380px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: none;
            overflow: hidden;
            font-size: 14px;
        }
        
        .search-help-panel.active {
            display: block;
        }
        
        .help-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #f5f5f5;
            border-bottom: 1px solid #eaeaea;
        }
        
        .help-panel-header h3 {
            margin: 0;
            font-size: 16px;
        }
        
        .close-help-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
            padding: 0 5px;
        }
        
        .help-panel-content {
            padding: 16px;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .search-prefixes-list {
            padding-left: 20px;
            margin: 10px 0;
        }
        
        .search-prefixes-list li {
            margin-bottom: 10px;
        }
        
        .search-prefixes-list .example {
            display: block;
            color: #666;
            font-size: 0.9em;
            margin-top: 3px;
        }
        
        /* Search Suggestions */
        .search-suggestions {
            margin-top: 8px;
            font-size: 13px;
            color: #666;
        }
        
        .search-suggestions .suggestion {
            display: inline-block;
            margin: 0 5px;
            color: #0066cc;
            cursor: pointer;
            background: #f0f7ff;
            padding: 2px 6px;
            border-radius: 12px;
            font-size: 12px;
        }
        
        .search-suggestions .suggestion:hover {
            background: #e0f0ff;
            text-decoration: underline;
        }
        
        /* Enhanced Results Dropdown */
        #search-results-dropdown {
            max-height: 500px;
            overflow-y: auto;
            border-radius: 8px;
        }
        
        .result-group-header {
            padding: 6px 12px;
            background: #f5f5f5;
            font-size: 12px;
            font-weight: bold;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .result-item {
            padding: 10px 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        
        .result-item i {
            margin-right: 12px;
            color: #555;
            width: 20px;
            text-align: center;
        }
        
        .result-item.focused {
            background-color: #f0f7ff;
        }
        
        .result-content {
            display: flex;
            flex-direction: column;
        }
        
        .tag-match-indicator {
            font-size: 11px;
            color: #0066cc;
            background: #f0f7ff;
            padding: 2px 6px;
            border-radius: 10px;
            margin-left: 8px;
        }
        
        .result-item .date {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
        }
        
        /* Skills popover categorization */
        .skill-category {
            font-weight: bold;
            color: #555;
            margin: 12px 0 5px;
            text-transform: capitalize;
        }
        
        .skill-category-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        /* Article tags */
        .article-meta {
            display: flex;
            gap: 12px;
            font-size: 13px;
            color: #666;
            margin-top: 3px;
        }
        
        .article-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 8px;
        }
        
        .article-tag {
            font-size: 11px;
            background: #f0f7ff;
            color: #0066cc;
            padding: 2px 8px;
            border-radius: 12px;
            cursor: pointer;
        }
        
        .article-tag:hover {
            background: #e0f0ff;
        }
    `;
    document.head.appendChild(styleElement);
}