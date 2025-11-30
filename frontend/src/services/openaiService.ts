// frontend/src/services/openaiService.ts
import OpenAI from 'openai';
import { UserPreferences } from '../types/user';

// ✅ API key parameter se pass karo
export const getPersonalizedContent = async (
  originalContent: string,
  userPreferences: UserPreferences,
  pageTitle: string,
  openaiApiKey: string // ✅ Parameter add kiya
): Promise<string> => {
  
  if (!openaiApiKey) {
    throw new Error("OpenAI API Key is not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true
  });

  // Clean HTML - remove all tags and extra whitespace
  const cleanContent = originalContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 5000);

  if (!cleanContent || cleanContent.length < 50) {
    throw new Error("Content is too short or empty to personalize.");
  }

  // Level-specific instructions
  let levelInstructions = '';
  switch(userPreferences.level) {
    case 'beginner':
      levelInstructions = `
- Use very simple, everyday language
- Break down complex ideas into small, easy steps
- Add lots of real-world examples and analogies
- Explain technical terms in simple words
- Use encouraging and friendly tone`;
      break;
    case 'intermediate':
      levelInstructions = `
- Use clear technical language but explain advanced concepts
- Balance theory with practical examples
- Include code snippets in ${userPreferences.languages.join(' or ')}
- Reference related concepts briefly
- Maintain professional but accessible tone`;
      break;
    case 'advanced':
      levelInstructions = `
- Use precise technical terminology freely
- Include implementation details and optimization strategies
- Add performance considerations and edge cases
- Reference research papers or advanced techniques
- Assume strong foundational knowledge`;
      break;
  }

  const prompt = `You are rewriting technical documentation about "${pageTitle}" for a ${userPreferences.level} level audience.

User Profile:
- Level: ${userPreferences.level}
- Languages: ${userPreferences.languages.join(', ')}
- AI Experience: ${userPreferences.aiExperience}
- Hardware Knowledge: ${userPreferences.hardwareKnowledge}

Instructions:${levelInstructions}

IMPORTANT: 
- Return ONLY the rewritten content in clean HTML format
- Use proper HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <code>, <pre>, <strong>
- Do NOT include markdown code blocks or backticks
- Do NOT add introductory phrases like "Here is..." or "Rewritten content:"
- Start directly with the content

Original Content:
${cleanContent}

Rewritten HTML:`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Ya 'gpt-4o' use kar sakte ho
      messages: [
        {
          role: 'system',
          content: 'You are a helpful technical documentation writer that adapts content for different skill levels.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let text = completion.choices[0]?.message?.content || '';
    
    text = text
      .replace(/```html\n?/gi, '')
      .replace(/```\n?/g, '')
      .replace(/^#+\s+.*$/gm, '')
      .trim();
    
    if (!text || text.length < 100) {
      throw new Error("Generated content is too short or empty.");
    }
    
    return text;
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    
    if (error.message?.includes('API key') || error.status === 401) {
      throw new Error("Invalid OpenAI API Key. Please check your .env file.");
    }
    
    if (error.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    
    throw new Error(`Personalization failed: ${error.message}`);
  }
};