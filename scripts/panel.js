// Panel JS
import { skills, articles } from './data.js';
import { searchInput, skillsTrigger, articlesTrigger, skillsPopover, articlesPanel, skillsBubbleContainer, articlesListContainer, overlay } from './dom.js';

// Populate skills in the Popover with category grouping
export function displaySkills() {
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
export function displayArticles() {
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

// --- Popover and Panel Logic ---
export let activeElement = null; // Track the currently open element (popover or panel)

export function openSkillsPopover() {
    closeArticlesPanel(); // Close panel if open
    skillsPopover.classList.add('active');
    skillsPopover.setAttribute('aria-hidden', 'false');
    skillsTrigger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    activeElement = skillsPopover;
}

export function closeSkillsPopover() {
    skillsPopover.classList.remove('active');
    skillsPopover.setAttribute('aria-hidden', 'true');
    skillsTrigger.setAttribute('aria-expanded', 'false');
    if (activeElement === skillsPopover) { // Only remove overlay if this was the active one
            overlay.classList.remove('active');
            activeElement = null;
    }
}

export function openArticlesPanel() {
    closeSkillsPopover(); // Close popover if open
    articlesPanel.classList.add('active');
    articlesTrigger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    activeElement = articlesPanel;
}

export function closeArticlesPanel() {
    articlesPanel.classList.remove('active');
    articlesTrigger.setAttribute('aria-expanded', 'false');
        if (activeElement === articlesPanel) { // Only remove overlay if this was the active one
            overlay.classList.remove('active');
            activeElement = null;
        }
}

export function closeCurrentlyActive() {
    if (activeElement === skillsPopover) {
        closeSkillsPopover();
    } else if (activeElement === articlesPanel) {
        closeArticlesPanel();
    }
}