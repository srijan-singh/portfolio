// Search JS
import { skills, projects, experience, education, articles, searchTags } from './data.js';
import { searchInput, searchContainer, resultsDropdown } from './dom.js';

// Parse search query to extract tag prefix and search term
export function parseSearchQuery(query) {
    // Find matching tag prefix pattern
    for (const tag of searchTags) {
        if (query.startsWith(tag.prefix)) {
            const searchTerm = query.substring(tag.prefix.length).trim();
            return {
                type: 'tagged',
                prefix: tag.prefix,
                term: searchTerm,
                tagInfo: tag
            };
        }
    }
    
    // If no tag prefix found, it's a regular search
    return {
        type: 'regular',
        term: query
    };
}

// Handle Search Input and Autocomplete with Tag Support
export function handleAutocomplete() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    resultsDropdown.innerHTML = '';

    if (searchTerm === '') {
        closeDropdown();
        return;
    }
    
    searchContainer.classList.add('active');
    
    let matches = [];
    const parsedQuery = parseSearchQuery(searchTerm);
    
    if (parsedQuery.type === 'tagged') {
        // It's a tag-based search
        processTaggedSearch(parsedQuery, matches);
    } else {
        // Regular text search
        processRegularSearch(parsedQuery.term, matches);
    }
    
    // If just starting to type, suggest tag prefixes
    if (searchTerm.length < 3 && !searchTerm.includes(':')) {
        addTagSuggestions(matches, searchTerm);
    }

    // Display results
    displaySearchResults(matches, parsedQuery);
}

// Handle tag-based search
export function processTaggedSearch(parsedQuery, matches) {
    const { prefix, term, tagInfo } = parsedQuery;
    
    if (!term) {
        // Just the prefix was entered, show help for this prefix
        matches.push({
            type: 'help',
            data: {
                message: `${tagInfo.description}. Try ${tagInfo.examples[0]}`
            }
        });
        
        // Also show some suggestions from this data source
        if (tagInfo.dataSource && tagInfo.dataSource.length > 0) {
            const suggestions = tagInfo.dataSource.slice(0, 5);
            suggestions.forEach(item => {
                let id, name;
                
                if (typeof item === 'object') {
                    id = item[tagInfo.idField] || item.id;
                    name = item.name || item[tagInfo.idField] || item.id;
                } else {
                    id = item;
                    name = item;
                }
                
                matches.push({
                    type: 'tag-suggestion',
                    data: {
                        id: id,
                        name: name,
                        prefix: prefix
                    }
                });
            });
        }
        
        return;
    }
    
    // Search based on the specific tag type
    switch (prefix) {
        case 'skills:':
        case 'language:':
        case 'framework:':
        case 'tool:':
            // Find skill and projects using it
            const matchingSkills = skills.filter(s => 
                s.id.toLowerCase().includes(term) || 
                s.name.toLowerCase().includes(term)
            );
            
            if (matchingSkills.length > 0) {
                // Add matching skills suggestions
                matchingSkills.slice(0, 3).forEach(s => {
                    matches.push({
                        type: 'tag-suggestion',
                        data: {
                            id: s.id,
                            name: s.name,
                            prefix: prefix
                        }
                    });
                });
                
                // Find projects with these skills
                const skillIds = matchingSkills.map(s => s.id);
                const projectsWithSkill = projects.filter(p => 
                    p.tags.some(tag => skillIds.includes(tag))
                );
                
                projectsWithSkill.slice(0, 5).forEach(p => {
                    matches.push({
                        type: 'project',
                        data: p,
                        matchType: 'tag',
                        matchText: `Matches ${prefix}${matchingSkills[0].name}`
                    });
                });
                
                // Also find experience entries with these skills
                const experienceWithSkill = experience.filter(e => 
                    e.skills.some(skill => skillIds.includes(skill))
                );
                
                experienceWithSkill.slice(0, 3).forEach(e => {
                    matches.push({
                        type: 'experience',
                        data: e,
                        matchType: 'tag',
                        matchText: `Matches ${prefix}${matchingSkills[0].name}`
                    });
                });
            }
            break;
            
        case 'project:':
            // Find projects by name
            const matchingProjects = projects.filter(p => 
                p.title.toLowerCase().includes(term)
            );
            
            matchingProjects.slice(0, 5).forEach(p => {
                matches.push({
                    type: 'project',
                    data: p,
                    matchType: 'direct',
                    matchText: `Project name matches "${term}"`
                });
            });
            break;
            
        case 'year:':
            // Find projects from specific year
            if (!isNaN(term)) {
                const yearInt = parseInt(term);
                const projectsFromYear = projects.filter(p => p.year === yearInt);
                
                projectsFromYear.forEach(p => {
                    matches.push({
                        type: 'project',
                        data: p,
                        matchType: 'year',
                        matchText: `From ${yearInt}`
                    });
                });
                
                // Also articles from that year
                const articlesFromYear = articles.filter(a => a.year === yearInt);
                articlesFromYear.forEach(a => {
                    matches.push({
                        type: 'article',
                        data: a,
                        matchType: 'year',
                        matchText: `From ${yearInt}`
                    });
                });
            }
            break;
            
        case 'domain:':
            // Find projects in specific domain
            const domainsMatching = projects.filter(p => 
                p.domain.toLowerCase().includes(term)
            );
            
            domainsMatching.forEach(p => {
                matches.push({
                    type: 'project',
                    data: p,
                    matchType: 'domain',
                    matchText: `Domain: ${p.domain}`
                });
            });
            
            // Also experience in that domain
            const experienceInDomain = experience.filter(e => 
                e.domain.toLowerCase().includes(term)
            );
            
            experienceInDomain.forEach(e => {
                matches.push({
                    type: 'experience',
                    data: e,
                    matchType: 'domain',
                    matchText: `Domain: ${e.domain}`
                });
            });
            break;
            
        case 'company:':
            // Find experience at specific company
            const companiesMatching = experience.filter(e => 
                e.company.toLowerCase().includes(term)
            );
            
            companiesMatching.forEach(e => {
                matches.push({
                    type: 'experience',
                    data: e,
                    matchType: 'company',
                    matchText: `Company match`
                });
            });
            break;
            
        case 'complexity:':
        case 'type:':
            // Find projects by complexity or type
            const field = prefix === 'complexity:' ? 'complexity' : 'type';
            const projectsMatching = projects.filter(p => 
                p[field].toLowerCase().includes(term)
            );
            
            projectsMatching.forEach(p => {
                matches.push({
                    type: 'project',
                    data: p,
                    matchType: field,
                    matchText: `${field.charAt(0).toUpperCase() + field.slice(1)}: ${p[field]}`
                });
            });
            break;
    }
}

// Handle regular text search across all data
export function processRegularSearch(term, matches) {
    // Search projects
    const projectMatches = projects.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
    ).slice(0, 3);
    
    projectMatches.forEach(p => matches.push({ 
        type: 'project', 
        data: p,
        matchType: 'text'
    }));
    
    // Search skills
    const skillMatches = skills.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.id.toLowerCase().includes(term)
    ).slice(0, 3);
    
    skillMatches.forEach(s => matches.push({ 
        type: 'skill', 
        data: s 
    }));
    
    // Search experience
    const experienceMatches = experience.filter(e => 
        e.company.toLowerCase().includes(term) || 
        e.role.toLowerCase().includes(term)
    ).slice(0, 2);
    
    experienceMatches.forEach(e => matches.push({ 
        type: 'experience', 
        data: e,
        matchType: 'text'
    }));
    
    // Search education
    const educationMatches = education.filter(e => 
        e.institution.toLowerCase().includes(term) || 
        e.degree.toLowerCase().includes(term) ||
        e.focus.toLowerCase().includes(term)
    ).slice(0, 2);
    
    educationMatches.forEach(e => matches.push({ 
        type: 'education', 
        data: e
    }));
    
    // Search articles
    const articleMatches = articles.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.description.toLowerCase().includes(term) ||
        a.tags.some(tag => tag.includes(term))
    ).slice(0, 2);
    
    articleMatches.forEach(a => matches.push({ 
        type: 'article', 
        data: a
    }));
}

// Add suggestions for tag prefixes based on partial input
export function addTagSuggestions(matches, term) {
    const tagSuggestions = searchTags
        .filter(tag => tag.prefix.toLowerCase().startsWith(term))
        .slice(0, 5);
        
    if (tagSuggestions.length > 0) {
        tagSuggestions.forEach(tag => {
            matches.push({
                type: 'prefix-suggestion',
                data: {
                    prefix: tag.prefix,
                    description: tag.description,
                    example: tag.examples[0]
                }
            });
        });
    }
}

// Display search results in the dropdown
export function displaySearchResults(matches, parsedQuery) {
    if (matches.length > 0) {
        // Group items by type
        const groups = {};
        matches.forEach(match => {
            if (!groups[match.type]) {
                groups[match.type] = [];
            }
            groups[match.type].push(match);
        });
        
        // Display grouped results
        const orderedTypes = ['help', 'prefix-suggestion', 'tag-suggestion', 'project', 'skill', 'experience', 'education', 'article'];
        
        orderedTypes.forEach(type => {
            if (groups[type] && groups[type].length > 0) {
                // Add a header for the group (except for help)
                if (type !== 'help' && type !== 'prefix-suggestion') {
                    const header = document.createElement('div');
                    header.classList.add('result-group-header');
                    header.textContent = type.charAt(0).toUpperCase() + type.slice(1) + 's';
                    resultsDropdown.appendChild(header);
                }
                
                // Add the items
                groups[type].forEach(match => {
                    const item = document.createElement('div');
                    item.classList.add('result-item');
                    item.setAttribute('role', 'option');
                    
                    switch(match.type) {
                        case 'project':
                            const p = match.data;
                            item.innerHTML = `<a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer">
                                                <i class="fas fa-lightbulb"></i>
                                                <strong>${p.title}</strong>
                                                ${match.matchType !== 'text' ? 
                                                `<span class="tag-match-indicator">${match.matchText || 'Tagged match'}</span>` : ''}
                                            </a>`;
                            break;
                            
                        case 'skill':
                            const s = match.data;
                            item.innerHTML = `<i class="fas fa-tag"></i><span>${s.name}</span>`;
                            item.addEventListener('click', () => {
                                searchInput.value = `skills:${s.id}`; 
                                closeDropdown();
                                handleAutocomplete();
                            });
                            break;
                            
                        case 'experience':
                            const e = match.data;
                            item.innerHTML = `<i class="fas fa-briefcase"></i>
                                            <div class="result-content">
                                                <strong>${e.role}</strong>
                                                <span>at ${e.company}</span>
                                                <span class="date">${e.period}</span>
                                            </div>`;
                            break;
                            
                        case 'education':
                            const edu = match.data;
                            item.innerHTML = `<i class="fas fa-graduation-cap"></i>
                                            <div class="result-content">
                                                <strong>${edu.degree}</strong>
                                                <span>${edu.institution}</span>
                                                <span class="date">${edu.year}</span>
                                            </div>`;
                            break;
                            
                        case 'article':
                            const a = match.data;
                            item.innerHTML = `<i class="fas fa-file-alt"></i>
                                            <div class="result-content">
                                                <strong>${a.title}</strong>
                                                <span>${a.platform} · ${a.year}</span>
                                            </div>`;
                            item.addEventListener('click', () => {
                                window.open(a.url, '_blank', 'noopener,noreferrer');
                            });
                            break;
                            
                        case 'tag-suggestion':
                            const ts = match.data;
                            item.innerHTML = `<i class="fas fa-search-tag"></i>
                                            <span>Use "${ts.prefix}${ts.name}"</span>`;
                            item.addEventListener('click', () => {
                                searchInput.value = `${ts.prefix}${ts.id}`;
                                closeDropdown();
                                handleAutocomplete();
                            });
                            break;
                            
                        case 'prefix-suggestion':
                            const ps = match.data;
                            item.innerHTML = `<i class="fas fa-search"></i>
                                            <div class="result-content">
                                                <strong>${ps.prefix}</strong>
                                                <span>${ps.description}</span>
                                                <span class="example">Example: ${ps.example}</span>
                                            </div>`;
                            item.addEventListener('click', () => {
                                searchInput.value = ps.prefix;
                                closeDropdown();
                                handleAutocomplete();
                            });
                            break;
                            
                        case 'help':
                            item.classList.add('help-item');
                            item.innerHTML = `<i class="fas fa-info-circle"></i><span>${match.data.message}</span>`;
                            break;
                    }
                    
                    resultsDropdown.appendChild(item);
                });
            }
        });
        
        resultsDropdown.classList.add('visible');
        resultsDropdown.setAttribute('aria-hidden', 'false');
    } else {
        const noResultItem = document.createElement('div');
        noResultItem.classList.add('result-item', 'no-results');
        
        if (parsedQuery.type === 'tagged') {
            noResultItem.textContent = `No matches found for ${parsedQuery.prefix}"${parsedQuery.term}"`;
        } else {
            noResultItem.textContent = 'No matches found';
        }
        
        resultsDropdown.appendChild(noResultItem);
        resultsDropdown.classList.add('visible');
        resultsDropdown.setAttribute('aria-hidden', 'false');
    }
}

export function closeDropdown() {
    resultsDropdown.classList.remove('visible');
    resultsDropdown.setAttribute('aria-hidden', 'true');
    searchContainer.classList.remove('active');
}

// --- Create Search Help Panel ---
export function createSearchHelpPanel() {
    const helpPanel = document.createElement('div');
    helpPanel.id = 'search-help-panel';
    helpPanel.classList.add('search-help-panel');
    helpPanel.setAttribute('aria-hidden', 'true');
    
    helpPanel.innerHTML = `
        <div class="help-panel-header">
            <h3>Search Commands</h3>
            <button class="close-help-btn" aria-label="Close help panel">×</button>
        </div>
        <div class="help-panel-content">
            <p>Use these search prefixes to find specific information:</p>
            <ul class="search-prefixes-list">
                ${searchTags.map(tag => `
                    <li>
                        <strong>${tag.prefix}</strong> - ${tag.description}
                        <span class="example">Example: ${tag.examples.join(', ')}</span>
                    </li>
                `).join('')}
            </ul>
            <p>You can also search without prefixes to find matches across all categories.</p>
        </div>
    `;
    
    document.body.appendChild(helpPanel);
    
    // Add event listener to close button
    const closeHelpBtn = helpPanel.querySelector('.close-help-btn');
    closeHelpBtn.addEventListener('click', () => {
        helpPanel.classList.remove('active');
        helpPanel.setAttribute('aria-hidden', 'true');
    });
    
    return helpPanel;
}