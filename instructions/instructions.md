Project Requirements Document (PRD)
1. Project Overview
1.1. Project Name
StudyAI
1.2. Purpose
StudyAI is a web application that empowers users to transform their study materials into interactive learning tools using Artificial Intelligence. By uploading documents such as PDFs, DOCX, or TXT files, users can generate quizzes, flashcards, and comprehensive study guides tailored to their specific needs. The application leverages the OpenAI API to facilitate the creation of these educational resources, enhancing the learning experience and efficiency.
1.3. Technology Stack
Frontend:

Next.js 14 (App Router)
React
TypeScript
TailwindCSS
shadcn/ui
Lucid (ensure correct library usage)

Backend:

Next.js API Routes
FastAPI (if necessary for microservices)
SQLite

Deployment:

Vercel

APIs:

OpenAI API

2. Objectives

User Empowerment: Enable users to convert their study materials into various interactive learning formats effortlessly.
Scalability & Maintainability: Develop a scalable and maintainable codebase adhering to best practices.
User Experience: Provide an intuitive and responsive user interface for seamless interaction.
Security: Ensure the protection of user data and secure handling of sensitive information.

3. Scope
3.1. In-Scope

Document upload and processing (PDF, DOCX, TXT).
Generation of flashcards, quizzes, and study guides using AI.
Management of uploaded documents and generated learning tools.
Exporting generated content as PDF or text files.
Comprehensive error handling and logging.
Secure handling of environment variables and API keys.

3.2. Out-of-Scope

User authentication and authorization (unless specified later).
Integration with third-party authentication providers.
Real-time collaboration features.

4. Functional Requirements
4.1. Document Processing
4.1.1. Uploading Documents
Description: Users can upload study materials in PDF, DOCX, or TXT formats.
Acceptance Criteria:

Users can select and upload files of supported formats.
The system validates file types and sizes before upload.
Successful uploads are acknowledged with a confirmation message.

4.1.2. Extracting Text
Description: The application extracts text content from the uploaded documents.
Acceptance Criteria:

Accurate extraction of text from PDFs, DOCX, and TXT files.
Proper handling of formatting and special characters.

4.1.3. Storing Text
Description: Extracted text is stored in a SQLite database.
Acceptance Criteria:

Text is correctly stored with appropriate metadata (e.g., user ID, upload date).
Database schema supports efficient retrieval and management.

4.1.4. Managing Documents
Description: Users can view, upload additional documents, and delete existing ones.
Acceptance Criteria:

Display a list of uploaded documents with relevant details.
Provide options to upload new documents or delete existing ones.
Deletion prompts confirmation to prevent accidental removal.

4.2. Learning Tools
4.2.1. Flashcard Generation
Description: Users specify the number of flashcards to generate from their documents.
Acceptance Criteria:

Input field to specify the desired number of flashcards.
Generation process leverages OpenAI API to create relevant flashcards.
Display the list of generated flashcards on a dedicated page.

4.2.2. Quiz Generation
Description: Users specify the number of quiz questions to generate.
Acceptance Criteria:

Input field to specify the desired number of quiz questions.
Generation process leverages OpenAI API to create relevant questions.
Display the list of generated quiz questions on a dedicated page.

4.2.3. Study Guide Generation
Description: Users generate a detailed study guide broken down into expandable/collapsible sections.
Acceptance Criteria:

Single click/button to generate a comprehensive study guide.
Study guide sections are logically organized and expandable/collapsible.
Content is detailed to ensure no important information is omitted.

4.3. Content Management
4.3.1. Managing Uploaded Documents and Learning Tools
Description: Users can manage their documents and generated learning tools within the application.
Acceptance Criteria:

Interface to view all uploaded documents and generated tools.
Options to delete or regenerate learning tools as needed.

4.3.2. Export Options
Description: Users can download generated learning tools as PDF or text files for offline reference.
Acceptance Criteria:

Provide export buttons for PDF and text formats.
Ensure exported files maintain formatting and content integrity.

5. Non-Functional Requirements
5.1. Performance
Requirement: The application should load pages within 2 seconds under normal conditions.
Acceptance Criteria: Achieve performance benchmarks using performance monitoring tools.
5.2. Security
Requirement: Protect user data and ensure secure handling of API keys.
Acceptance Criteria: Implement best security practices, including HTTPS, secure storage of environment variables, and input validation.
5.3. Usability
Requirement: Provide an intuitive and user-friendly interface.
Acceptance Criteria: Conduct usability testing to ensure ease of navigation and interaction.
5.4. Scalability
Requirement: Design the application to handle an increasing number of users and data.
Acceptance Criteria: Use scalable technologies and optimize database queries for performance.
6. Detailed File Structure
Below is the proposed file structure for the StudyAI project, designed to ensure clarity, scalability, and maintainability. All new components are placed within the /components directory at the root, following the naming convention ExampleComponent.tsx. Pages reside within the /app directory, utilizing Next.js 14's App Router.
Copystudyai
├── README.md
├── .env.local
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── app
│   ├── favicon.ico
│   ├── fonts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── upload
│   │   └── page.tsx
│   ├── documents
│   │   └── page.tsx
│   ├── flashcards
│   │   └── page.tsx
│   ├── quizzes
│   │   └── page.tsx
│   ├── study-guides
│   │   └── page.tsx
│   └── api
│       ├── documents
│       │   └── route.ts
│       ├── flashcards
│       │   └── route.ts
│       ├── quizzes
│       │   └── route.ts
│       └── study-guides
│           └── route.ts
├── components
│   ├── UploadComponent.tsx
│   ├── DocumentListComponent.tsx
│   ├── FlashcardGenerator.tsx
│   ├── FlashcardList.tsx
│   ├── QuizGenerator.tsx
│   ├── QuizList.tsx
│   ├── StudyGuideGenerator.tsx
│   ├── StudyGuideView.tsx
│   └── common
│       ├── HeaderComponent.tsx
│       ├── FooterComponent.tsx
│       └── ButtonComponent.tsx
├── lib
│   ├── db.ts
│   ├── openaiClient.ts
│   └── utils.ts
├── instructions
│   └── instructions.md
└── public
    └── (static assets)
6.1. Directory Breakdown
6.1.1. Root Directory

README.md: Project documentation and setup instructions.
.env.local: Environment variables for local development (ensure it's listed in .gitignore).
.gitignore: Specifies intentionally untracked files to ignore.
next.config.mjs: Next.js configuration, including environment variable settings.
package.json: Project dependencies and scripts.
postcss.config.mjs: PostCSS configuration for TailwindCSS.
tailwind.config.ts: TailwindCSS configuration file.
tsconfig.json: TypeScript configuration.

6.1.2. app Directory
Utilizes Next.js 14 App Router for routing and page management.

favicon.ico, fonts, globals.css: Global assets and styles.
layout.tsx: Root layout for shared components (e.g., Header, Footer).
page.tsx: Home page.

Pages:

upload/page.tsx: Document upload interface.
documents/page.tsx: View, manage, and delete uploaded documents.
flashcards/page.tsx: Generate and view flashcards.
quizzes/page.tsx: Generate and view quizzes.
study-guides/page.tsx: Generate and view study guides.

API Routes:
Located under app/api/, these handle server-side operations and interact with external APIs.

app/api/documents/route.ts: Handle document upload, retrieval, and deletion.
app/api/flashcards/route.ts: Generate flashcards using OpenAI API.
app/api/quizzes/route.ts: Generate quizzes using OpenAI API.
app/api/study-guides/route.ts: Generate study guides using OpenAI API.

6.1.3. components Directory
All reusable UI components are stored here, adhering to the naming convention ExampleComponent.tsx.

UploadComponent.tsx: Handles the upload form and interactions.
DocumentListComponent.tsx: Displays the list of uploaded documents with options to delete.
FlashcardGenerator.tsx: Interface to specify and generate flashcards.
FlashcardList.tsx: Displays generated flashcards.
QuizGenerator.tsx: Interface to specify and generate quizzes.
QuizList.tsx: Displays generated quizzes.
StudyGuideGenerator.tsx: Interface to generate study guides.
StudyGuideView.tsx: Displays the generated study guide with expandable sections.

common Subdirectory:
Contains shared components to promote reusability and consistency.

HeaderComponent.tsx: Site header/navigation.
FooterComponent.tsx: Site footer.
ButtonComponent.tsx: Reusable button with styling.

6.1.4. lib Directory
Contains utility libraries and API client initializations.

db.ts: SQLite database connection and queries.
openaiClient.ts: Initialization and configuration of the OpenAI API client.
utils.ts: General utility functions (e.g., text extraction from documents).

6.1.5. instructions Directory

instructions.md: Documentation or user instructions for the application.

6.1.6. public Directory

(static assets): Stores static assets like images, icons, and other public files.

7. Additional Requirements
7.1. Environment Variables

Storage: Store all sensitive information (API keys, credentials) in environment variables.
Local Development: Use a .env.local file and ensure it's listed in .gitignore.
Production: Set environment variables in the deployment platform (e.g., Vercel).
Access: Access environment variables only in server-side code or API routes.

7.2. Error Handling and Logging
Client-Side:

Implement comprehensive error handling in React components.
Display user-friendly error messages.

Server-Side:

Implement try-catch blocks in API routes.
Log errors using a logging library or console.error for debugging.

7.3. Type Safety

TypeScript Interfaces: Define interfaces for all data structures, especially API responses.
Strict Typing: Avoid using any; define proper types for variables and function parameters.

7.4. API Client Initialization

Server-Side Only: Initialize API clients (e.g., OpenAI) in server-side code.
Checks: Ensure API clients are properly initialized before use.

7.5. Data Fetching in Components

Server Components: Perform data fetching in server components and pass data as props.
Client Components: Use React hooks (e.g., useEffect) for additional client-side data handling.
Loading States: Implement loading indicators during data fetching.
Error Handling: Handle and display errors during data fetching operations.

7.6. Next.js Configuration
next.config.mjs:

Utilize for environment-specific configurations.
Use the env property to make environment variables available to the application where necessary.

7.7. CORS and API Routes

Next.js API Routes: Use to avoid CORS issues when interacting with external APIs.
Request Validation: Implement proper validation for all incoming API requests to ensure data integrity and security.

7.8. Component Structure

Separation of Concerns: Clearly separate client and server components.
Data Passing: Use server components for initial data fetching and pass data as props to client components.
Client Components: Include 'use client' directive at the top of files requiring client-side functionalities like useState or hooks.

7.9. Security

API Keys: Never expose API keys or sensitive credentials on the client-side.
Authentication & Authorization: Implement if necessary for protecting user-specific data (consider using libraries like NextAuth).
Input Validation: Sanitize and validate all inputs in API routes to prevent security vulnerabilities such as SQL injection or XSS attacks.

8. Documentation
8.1. README.md
Content:

Project overview.
Setup and installation instructions.
Usage guidelines.
Contribution guidelines.
Licensing information.

8.2. instructions/instructions.md
Content:

Detailed user instructions on how to use the application.
Steps to upload documents and generate learning tools.
Guidelines on managing and exporting content.
Troubleshooting common issues.

8.3. Code Documentation

Inline Comments: Provide meaningful comments within the codebase to explain complex logic.
TypeScript Types: Use descriptive type names and interfaces to enhance code readability and maintainability.

9. Dependencies Overview
9.1. Core Dependencies

Next.js 14: Framework for React applications.
React: Front-end library.
TypeScript: Superset of JavaScript for type safety.
TailwindCSS: Utility-first CSS framework.
shadcn/ui: UI components library (ensure correct package name and version).
Lucid: Verify correct library based on usage (e.g., Lucidchart or another).
OpenAI API: For generating learning tools.
SQLite: Lightweight database.
Vercel: Deployment platform.

9.2. Development Dependencies

Types for Libraries: @types/react, @types/node, etc.
ESLint & Prettier: For code linting and formatting.
Testing Libraries: Jest, React Testing Library (if testing is planned).

9.3. Example package.json Dependencies Section
jsonCopy{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "tailwindcss": "^3.0.0",
    "shadcn-ui": "^1.0.0",
    "openai": "^3.0.0",
    "sqlite3": "^5.0.0",
    "lucid": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^18.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.0.0"
  }
}

10. Implementation Guidelines
10.1. Setting Up the Development Environment
Clone the Repository:
bashCopygit clone https://github.com/cth9191/studyai.git
cd studyai
Install Dependencies:
bashCopynpm install
Configure Environment Variables:

Create a .env.local file in the root directory.
Add necessary environment variables (e.g., OpenAI API keys).
Ensure .env.local is listed in .gitignore to prevent exposure.

Initialize TailwindCSS:

Follow the official Next.js TailwindCSS guide to ensure proper setup.

Set Up the Database:

Configure lib/db.ts to initialize and manage SQLite database connections and queries.

Initialize OpenAI Client:

Configure lib/openaiClient.ts with your OpenAI API key.
Ensure it's only imported in server-side code or API routes.

10.2. Development Workflow
Start the Development Server:
bashCopynpm run dev
Develop Common Components:

Build shared components like HeaderComponent and FooterComponent first to ensure consistency across pages.

Implement Core Functionalities:

Develop document upload and processing features.
Implement learning tool generation (flashcards, quizzes, study guides).
Ensure each feature adheres to the specified acceptance criteria.

Implement API Routes:

Develop server-side API routes under app/api/ to handle document processing and learning tool generation.
Ensure proper error handling and logging within API routes.

Ensure Type Safety:

Define TypeScript interfaces and types for all components and API interactions.
Avoid using any to maintain strong typing throughout the codebase.

Testing:

Write unit and integration tests for critical components and API routes.
Use testing libraries like Jest and React Testing Library.

10.3. Deployment
Prepare for Deployment:

Ensure all environment variables are set in Vercel's dashboard.
Verify that the .env.local file is excluded from version control.

Deploy to Vercel:

Connect the repository to Vercel.
Trigger a deployment and monitor the build process.

Post-Deployment Checks:

Test all functionalities in the production environment.
Monitor performance and error logs.

11. Security Considerations

API Keys Protection: Ensure OpenAI API keys and other sensitive credentials are never exposed to the client-side. Only accessible in server-side code and API routes.
Input Validation: Sanitize and validate all user inputs to prevent injection attacks and ensure data integrity.
Authentication & Authorization: If user-specific data is involved, implement authentication mechanisms to protect user data.
HTTPS Enforcement: Ensure all data transmission occurs over HTTPS to protect data in transit.
Regular Audits: Conduct regular security audits and vulnerability assessments to identify and mitigate potential threats.

12. Error Handling Strategy
12.1. Client-Side

Error Boundaries: Implement React Error Boundaries to catch and handle errors in the component tree.
User Feedback: Display clear and concise error messages to inform users of issues without exposing technical details.

12.2. Server-Side

Try-Catch Blocks: Wrap API route logic within try-catch blocks to handle potential errors gracefully.
Logging: Use a logging library or console.error to log errors for debugging purposes.
Response Handling: Send appropriate HTTP status codes and error messages back to the client.

13. Performance Optimization

Code Splitting: Utilize Next.js's built-in code splitting to load only necessary code for each page.
Caching: Implement caching strategies for API responses where applicable to reduce load times.
Database Optimization: Optimize SQLite queries for faster data retrieval and manipulation.
Asset Optimization: Compress images and optimize static assets to enhance load times.

14. Scalability Considerations

Modular Architecture: Design the application with a modular architecture to facilitate the addition of new features without major refactoring.
Database Scaling: While SQLite is suitable for initial stages, consider transitioning to a more scalable database (e.g., PostgreSQL) as user base grows.
Load Balancing: Use Vercel's scaling capabilities to handle increased traffic and ensure consistent performance.

15. Future Enhancements

User Authentication: Implement user sign-up and login functionalities to provide personalized experiences.
Collaboration Features: Allow multiple users to collaborate on generating and managing learning tools.
Analytics Dashboard: Provide users with insights into their learning tool usage and performance metrics.
Multi-language Support: Expand support to include multiple languages for broader accessibility.

Conclusion
This PRD serves as a comprehensive guide for the development of the StudyAI web application. It outlines the project's objectives, detailed functional and non-functional requirements, a clear file structure, and implementation guidelines to ensure that the development team is well-aligned and equipped to execute the project successfully. Adhering to this document will facilitate a structured and efficient development process, ultimately delivering a robust and user-friendly educational tool.