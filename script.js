document.addEventListener('DOMContentLoaded', function() {

    // --- Data Structures ---
    const skills = [
        // language
        { id: 'java', name: 'Java', category: 'language' },
        { id: 'python', name: 'Python', category: 'language' },
        // framework
        { id: 'springboot', name: 'Spring Boot', category: 'framework' },
        { id: 'react', name: 'React.js', category: 'framework' },
        { id: 'javascript', name: 'JavaScript', category: 'language' },
        { id: 'html', name: 'HTML', category: 'language' },
        { id: 'css', name: 'CSS', category: 'language' },
        // concept
        { id: 'api', name: 'API Development', category: 'concept' },
        { id: 'microservices', name: 'Microservices', category: 'architecture' },
        { id: 'web-extension', name: 'Web Extension', category: 'application' },
        { id: 'privacy', name: 'Privacy Enhancement', category: 'concept' },
        { id: 'automation', name: 'Automation', category: 'concept' },
        { id: 'language-design', name: 'Language Design', category: 'concept' },
        // technology
        { id: 'facial-recognition', name: 'Facial Recognition', category: 'technology' },
        { id: 'client-server', name: 'Client-Server Arch.', category: 'architecture' },
        { id: 'utility', name: 'Utility Tooling', category: 'application' },
        { id: 'aws', name: 'AWS', category: 'platform' },
        { id: 'git', name: 'Git', category: 'tool' },
        { id: 'docker', name: 'Docker', category: 'tool' },
        { id: 'ci-cd', name: 'CI/CD', category: 'devops' },
        { id: 'testing', name: 'Testing', category: 'practice' },
        { id: 'agile', name: 'Agile', category: 'methodology' },
        { id: 'database', name: 'Database Design', category: 'concept' },
        { id: 'sql', name: 'SQL', category: 'language' },
        { id: 'nosql', name: 'NoSQL', category: 'database' },
        { id: 'mongodb', name: 'MongoDB', category: 'database' },
        { id: 'security', name: 'Security', category: 'concept' }
    ];

    const projects = [
        { title: "QR4U", description: "Solved the need for a quick, client-side way to generate QR codes...", codeUrl: "https://github.com/srijan-singh/qr4u", liveUrl: "https://srijan-singh.github.io/qr4u/index.html", tags: ['javascript', 'html', 'css', 'utility'], year: 2023, domain: 'web', complexity: 'medium', type: 'tool' },
        { title: "HideChat", description: "Solved the privacy concern for WhatsApp Web users...", codeUrl: "https://github.com/srijan-singh/hidechat", liveUrl: null, tags: ['javascript', 'privacy', 'web-extension', 'html', 'css'], year: 2022, domain: 'web', complexity: 'medium', type: 'extension' },
        { title: "Online Bus Booking System", description: "Solved the challenge of demonstrating full-stack web application capabilities...", codeUrl: "https://github.com/srijan-singh/online-bus-booking-system", liveUrl: null, tags: ['java', 'springboot', 'api'], year: 2021, domain: 'web', complexity: 'high', type: 'application' },
        { title: "Interpreter (SCREAM Language)", description: "Solved the complex problem of language design...", codeUrl: "https://github.com/srijan-singh/interpreter", liveUrl: null, tags: ['python', 'language-design', 'parsing'], year: 2022, domain: 'language', complexity: 'high', type: 'research' },
        { title: "Voter Verification", description: "Solved the potential for human error in identity verification...", codeUrl: "https://github.com/srijan-singh/voter-verification", liveUrl: null, tags: ['python', 'facial-recognition', 'api', 'automation'], year: 2023, domain: 'security', complexity: 'high', type: 'application' }
    ];

    const experience = [
        { company: "IBM", role: "Software Developer", period: "Jan 2024 - Present", skills: ['java', 'springboot', 'neo4j', 'cypher', 'python', 'microservices',], domain: 'data' },
        { company: "Telecommunication Engineering Center", role: "Intern", period: "Sep 2023 - Oct 2023", skills: ['research', 'development'], domain: 'research' },
        { company: "IBM", role: "Trainee -  Application Developer", period: "Apr 2023 - Jun 2023", skills: ['java', 'springboot', 'microservices', 'mysql', 'mongodb'], domain: 'software' }
    ];

    const education = [
        { institution: "Parul University", degree: "B.Tech. Computer Science Engineering", year: "2023", focus: "Software Engineering" }
    ];

    const articles = [
        { title: "Microservices vs Monolith: A Practical Look", description: "Exploring the trade-offs...", url: "#", platform: "LinkedIn", year: 2023, tags: ['architecture', 'microservices'] },
        { title: "Understanding Async JavaScript", description: "Callbacks, Promises, and Async/Await explained...", url: "#", platform: "Blog", year: 2022, tags: ['javascript', 'programming'] },
        { title: "Securing Spring Boot APIs", description: "An overview of common security practices...", url: "#", platform: "LinkedIn", year: 2023, tags: ['springboot', 'security', 'api'] }
    ];

    // --- Search Tags Definition ---
    const searchTags = [
        { prefix: 'skills:', description: 'Search by specific skill', examples: ['skills:python', 'skills:react'], dataSource: skills, idField: 'id' },
        { prefix: 'language:', description: 'Search by programming language', examples: ['language:java', 'language:python'], dataSource: skills.filter(s => s.category === 'language'), idField: 'id' },
        { prefix: 'project:', description: 'Search by project name', examples: ['project:qr4u', 'project:hidechat'], dataSource: projects, idField: 'title' },
        { prefix: 'year:', description: 'Search by year', examples: ['year:2022', 'year:2023'], dataSource: [...projects.map(p => ({ id: p.year, name: p.year.toString() }))], idField: 'id' },
        { prefix: 'domain:', description: 'Search by domain/industry', examples: ['domain:web', 'domain:security'], dataSource: [...new Set([...projects.map(p => ({ id: p.domain, name: p.domain }))])], idField: 'id' },
        { prefix: 'company:', description: 'Search by company', examples: ['company:tech', 'company:webdev'], dataSource: experience, idField: 'company' },
        { prefix: 'complexity:', description: 'Search by project complexity', examples: ['complexity:high', 'complexity:medium'], dataSource: [...new Set(projects.map(p => ({ id: p.complexity, name: p.complexity })))], idField: 'id' },
        { prefix: 'type:', description: 'Search by project type', examples: ['type:application', 'type:tool'], dataSource: [...new Set(projects.map(p => ({ id: p.type, name: p.type })))], idField: 'id' },
        { prefix: 'framework:', description: 'Search by framework', examples: ['framework:spring', 'framework:react'], dataSource: skills.filter(s => s.category === 'framework'), idField: 'id' },
        { prefix: 'tool:', description: 'Search by tool', examples: ['tool:git', 'tool:docker'], dataSource: skills.filter(s => s.category === 'tool'), idField: 'id' }
    ];

    // --- DOM Elements ---
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.getElementById('search-container');
    const searchWrapper = document.getElementById('search-wrapper');
    const resultsDropdown = document.getElementById('search-results-dropdown');
    const yearSpan = document.getElementById('current-year');
    const timeSpan = document.getElementById('current-time');

    const skillsTrigger = document.getElementById('skills-trigger');
    const articlesTrigger = document.getElementById('articles-trigger');
    const skillsPopover = document.getElementById('skills-popover');
    const articlesPanel = document.getElementById('articles-panel');
    const skillsBubbleContainer = document.getElementById('skills-bubble-container');
    const articlesListContainer = document.getElementById('articles-list');
    const overlay = document.getElementById('overlay');
    const closePanelBtn = articlesPanel.querySelector('.close-panel-btn');
    const closePopoverBtn = skillsPopover.querySelector('.close-popover-btn');

    // --- Functions ---

    // Populate skills in the Popover with category grouping
    function displaySkills() {
        skillsBubbleContainer.innerHTML = ''; // Clear existing
        
        // Group skills by category
        const categoryGroups = {};
        skills.forEach(skill => {
            if (!categoryGroups[skill.category]) {
                categoryGroups[skill.category] = [];
            }
            categoryGroups[skill.category].push(skill);
        });
        
        // Create category sections
        for (const [category, categorySkills] of Object.entries(categoryGroups)) {
            // Create category header
            const categoryHeader = document.createElement('div');
            categoryHeader.classList.add('skill-category');
            categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            skillsBubbleContainer.appendChild(categoryHeader);
            
            // Create skill bubbles for this category
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('skill-category-container');
            
            categorySkills.forEach(skill => {
                const bubble = document.createElement('span');
                bubble.classList.add('skill-bubble');
                bubble.textContent = skill.name;
                
                // Add click event to use this skill for search
                bubble.addEventListener('click', () => {
                    searchInput.value = `skills:${skill.id}`;
                    searchInput.focus();
                    handleAutocomplete();
                    closeSkillsPopover();
                });
                
                categoryContainer.appendChild(bubble);
            });
            
            skillsBubbleContainer.appendChild(categoryContainer);
        }
    }

    // Populate articles in the Side Panel
    function displayArticles() {
        articlesListContainer.innerHTML = ''; // Clear existing
        if (articles.length === 0) {
             articlesListContainer.innerHTML = '<p>No articles posted yet.</p>';
             return;
         }
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article-item');
            
            // Add tag chips
            const tagsList = article.tags.map(tag => 
                `<span class="article-tag" data-tag="${tag}" onclick="document.getElementById('search-input').value='skills:${tag}'; document.getElementById('search-input').focus();">${tag}</span>`
            ).join('');
             
            articleElement.innerHTML = `
                 <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
                 <p>${article.description}</p>
                 <div class="article-meta">
                     <span class="platform">${article.platform}</span>
                     <span class="year">${article.year}</span>
                 </div>
                 <div class="article-tags">${tagsList}</div>
             `;
            articlesListContainer.appendChild(articleElement);
        });
    }

    // Parse search query to extract tag prefix and search term
    function parseSearchQuery(query) {
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
    function handleAutocomplete() {
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
    function processTaggedSearch(parsedQuery, matches) {
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
    function processRegularSearch(term, matches) {
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
    function addTagSuggestions(matches, term) {
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
    function displaySearchResults(matches, parsedQuery) {
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

    function closeDropdown() {
        resultsDropdown.classList.remove('visible');
        resultsDropdown.setAttribute('aria-hidden', 'true');
        searchContainer.classList.remove('active');
    }

    // --- Popover and Panel Logic ---
    let activeElement = null; // Track the currently open element (popover or panel)

    function openSkillsPopover() {
        closeArticlesPanel(); // Close panel if open
        skillsPopover.classList.add('active');
        skillsPopover.setAttribute('aria-hidden', 'false');
        skillsTrigger.setAttribute('aria-expanded', 'true');
        overlay.classList.add('active');
        activeElement = skillsPopover;
    }

    function closeSkillsPopover() {
        skillsPopover.classList.remove('active');
        skillsPopover.setAttribute('aria-hidden', 'true');
        skillsTrigger.setAttribute('aria-expanded', 'false');
        if (activeElement === skillsPopover) { // Only remove overlay if this was the active one
             overlay.classList.remove('active');
             activeElement = null;
        }
    }

    function openArticlesPanel() {
        closeSkillsPopover(); // Close popover if open
        articlesPanel.classList.add('active');
        articlesTrigger.setAttribute('aria-expanded', 'true');
        overlay.classList.add('active');
        activeElement = articlesPanel;
    }

    function closeArticlesPanel() {
        articlesPanel.classList.remove('active');
        articlesTrigger.setAttribute('aria-expanded', 'false');
         if (activeElement === articlesPanel) { // Only remove overlay if this was the active one
             overlay.classList.remove('active');
             activeElement = null;
         }
    }

    function closeCurrentlyActive() {
        if (activeElement === skillsPopover) {
            closeSkillsPopover();
        } else if (activeElement === articlesPanel) {
            closeArticlesPanel();
        }
    }

    // --- Update Time ---
    function updateTime() {
        if (timeSpan) {
             const now = new Date();
             timeSpan.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
        }
    }

    // --- Create Search Help Panel ---
    function createSearchHelpPanel() {
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

    // --- Adding Help to the search input placeholder ---
    searchInput.setAttribute('placeholder', 'Search by name or use prefixes like skills:python');

    // --- Create and append the help button ---
    const searchHelp = document.createElement('button');
    searchHelp.classList.add('search-help-btn');
    searchHelp.setAttribute('aria-label', 'Search help');
    searchHelp.innerHTML = '<i class="fas fa-question-circle"></i>';
    searchWrapper.appendChild(searchHelp);
    
    // Create the help panel
    const helpPanel = createSearchHelpPanel();
    
    // Toggle help panel visibility
    searchHelp.addEventListener('click', () => {
        if (helpPanel.classList.contains('active')) {
            helpPanel.classList.remove('active');
            helpPanel.setAttribute('aria-hidden', 'true');
        } else {
            helpPanel.classList.add('active');
            helpPanel.setAttribute('aria-hidden', 'false');
        }
    });

    // --- Add search suggestions element ---
    const searchSuggestions = document.createElement('div');
    searchSuggestions.classList.add('search-suggestions');
    searchSuggestions.innerHTML = `
        <span>Try: </span>
        <span class="suggestion" data-search="skills:java">skills:java</span>
        <span class="suggestion" data-search="year:2023">year:2023</span>
        <span class="suggestion" data-search="domain:web">domain:web</span>
    `;
    searchWrapper.appendChild(searchSuggestions);
    
    // Add event listeners to search suggestions
    const suggestions = searchSuggestions.querySelectorAll('.suggestion');
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const searchText = suggestion.getAttribute('data-search');
            searchInput.value = searchText;
            searchInput.focus();
            handleAutocomplete();
        });
    });

    // --- Event Listeners ---
    searchInput.addEventListener('input', handleAutocomplete);
    searchInput.addEventListener('focus', () => {
        // Optional: show recent searches or suggestions on focus?
        // For now, just ensure the active style is applied if input not empty
        if(searchInput.value.trim() !== '') {
            searchContainer.classList.add('active');
            handleAutocomplete(); // Re-run search on focus if field not empty
        }
    });

    // Keyboard navigation for search results
    searchInput.addEventListener('keydown', (e) => {
        const items = resultsDropdown.querySelectorAll('.result-item:not(.result-group-header)');
        let currentIndex = -1;
        
        // Find currently focused item
        items.forEach((item, index) => {
            if (item.classList.contains('focused')) {
                currentIndex = index;
            }
        });
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                
                // Remove focus from current item
                if (currentIndex >= 0) {
                    items[currentIndex].classList.remove('focused');
                }
                
                // Focus next item (or wrap to first)
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].classList.add('focused');
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                
                // Remove focus from current item
                if (currentIndex >= 0) {
                    items[currentIndex].classList.remove('focused');
                }
                
                // Focus previous item (or wrap to last)
                currentIndex = (currentIndex <= 0) ? items.length - 1 : currentIndex - 1;
                items[currentIndex].classList.add('focused');
                break;
                
            case 'Enter':
                // If an item has focus, click it
                if (currentIndex >= 0) {
                    e.preventDefault();
                    items[currentIndex].click();
                }
                break;
        }
    });

    // Toggles
    skillsTrigger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from immediately closing via document listener
        if (skillsPopover.classList.contains('active')) {
            closeSkillsPopover();
        } else {
            openSkillsPopover();
        }
    });
    articlesTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (articlesPanel.classList.contains('active')) {
            closeArticlesPanel();
        } else {
            openArticlesPanel();
        }
    });

    // Close Buttons
    closePopoverBtn.addEventListener('click', closeSkillsPopover);
    closePanelBtn.addEventListener('click', closeArticlesPanel);

    // Global listeners (click outside, escape key)
    document.addEventListener('click', function(event) {
        // Close dropdown if click is outside search wrapper
        if (!searchWrapper.contains(event.target)) {
            closeDropdown();
        }

        // Close help panel if open and clicked outside
        if (helpPanel.classList.contains('active') && 
            !helpPanel.contains(event.target) && 
            !searchHelp.contains(event.target)) {
            helpPanel.classList.remove('active');
            helpPanel.setAttribute('aria-hidden', 'true');
        }

        // Close popover/panel if click is on overlay OR outside the active element and its trigger
        if (activeElement && !activeElement.contains(event.target)) {
             // Check if the click was on the trigger button itself - if so, do nothing, the button handles it
             const skillsTriggerClicked = skillsTrigger.contains(event.target);
             const articlesTriggerClicked = articlesTrigger.contains(event.target);

             if (!skillsTriggerClicked && !articlesTriggerClicked) {
                  closeCurrentlyActive();
             }
        }
    });

    document.addEventListener('keydown', function(event) {
         if (event.key === 'Escape') {
             closeDropdown();
             closeCurrentlyActive();
             
             // Also close help panel if open
             if (helpPanel.classList.contains('active')) {
                helpPanel.classList.remove('active');
                helpPanel.setAttribute('aria-hidden', 'true');
             }
         }
     });

    // --- Add CSS Styles ---
    function addStyles() {
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

    // --- Initial Setup ---
    displaySkills();
    displayArticles();
    updateTime(); // Initial time display
    // setInterval(updateTime, 60000); // Update time every minute (optional)
    addStyles(); // Add custom styles

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log("Developer profile V7 loaded - Advanced Search Engine with Tag Prefixes.");
});