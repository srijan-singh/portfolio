// Data JS

export const skills = [
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

export const projects = [
    { title: "QR4U", description: "Solved the need for a quick, client-side way to generate QR codes...", codeUrl: "https://github.com/srijan-singh/qr4u", liveUrl: "https://srijan-singh.github.io/qr4u/index.html", tags: ['javascript', 'html', 'css', 'utility'], year: 2023, domain: 'web', complexity: 'medium', type: 'tool' },
    { title: "HideChat", description: "Solved the privacy concern for WhatsApp Web users...", codeUrl: "https://github.com/srijan-singh/hidechat", liveUrl: null, tags: ['javascript', 'privacy', 'web-extension', 'html', 'css'], year: 2022, domain: 'web', complexity: 'medium', type: 'extension' },
    { title: "Online Bus Booking System", description: "Solved the challenge of demonstrating full-stack web application capabilities...", codeUrl: "https://github.com/srijan-singh/online-bus-booking-system", liveUrl: null, tags: ['java', 'springboot', 'api'], year: 2021, domain: 'web', complexity: 'high', type: 'application' },
    { title: "Interpreter (SCREAM Language)", description: "Solved the complex problem of language design...", codeUrl: "https://github.com/srijan-singh/interpreter", liveUrl: null, tags: ['python', 'language-design', 'parsing'], year: 2022, domain: 'language', complexity: 'high', type: 'research' },
    { title: "Voter Verification", description: "Solved the potential for human error in identity verification...", codeUrl: "https://github.com/srijan-singh/voter-verification", liveUrl: null, tags: ['python', 'facial-recognition', 'api', 'automation'], year: 2023, domain: 'security', complexity: 'high', type: 'application' }
];

export const experience = [
    { company: "IBM", role: "Software Developer", period: "Jan 2024 - Present", skills: ['java', 'springboot', 'neo4j', 'cypher', 'python', 'microservices',], domain: 'data' },
    { company: "Telecommunication Engineering Center", role: "Intern", period: "Sep 2023 - Oct 2023", skills: ['research', 'development'], domain: 'research' },
    { company: "IBM", role: "Trainee -  Application Developer", period: "Apr 2023 - Jun 2023", skills: ['java', 'springboot', 'microservices', 'mysql', 'mongodb'], domain: 'software' }
];

export const education = [
    { institution: "Parul University", degree: "B.Tech. Computer Science Engineering", year: "2023", focus: "Software Engineering" }
];

export const articles = [
    { title: "Microservices vs Monolith: A Practical Look", description: "Exploring the trade-offs...", url: "#", platform: "LinkedIn", year: 2023, tags: ['architecture', 'microservices'] },
    { title: "Understanding Async JavaScript", description: "Callbacks, Promises, and Async/Await explained...", url: "#", platform: "Blog", year: 2022, tags: ['javascript', 'programming'] },
    { title: "Securing Spring Boot APIs", description: "An overview of common security practices...", url: "#", platform: "LinkedIn", year: 2023, tags: ['springboot', 'security', 'api'] }
];

// --- Search Tags Definition ---
export const searchTags = [
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