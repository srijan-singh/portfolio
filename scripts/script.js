import { searchInput, searchContainer, searchWrapper, resultsDropdown, yearSpan, timeSpan, skillsTrigger, articlesTrigger, skillsPopover, articlesPanel, closePanelBtn, closePopoverBtn } from './dom.js';
import { displaySkills, displayArticles, openSkillsPopover, closeSkillsPopover, openArticlesPanel, closeArticlesPanel, closeCurrentlyActive, activeElement } from './panel.js';
import { handleAutocomplete, closeDropdown, createSearchHelpPanel } from './search.js';
import { addStyles } from './styles.js';

document.addEventListener('DOMContentLoaded', function() {
    // --- Functions ---

    // --- Update Time ---
    function updateTime() {
        if (timeSpan) {
             const now = new Date();
             timeSpan.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
        }
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