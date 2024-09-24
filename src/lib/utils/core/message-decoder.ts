export interface MessagePart {
    type: 'text' | 'code';
    content: string;
    language?: string;
  }
  
  export function decodeMessage(message: string): MessagePart[] {
    const result: MessagePart[] = [];
    const codeBlockRegex = /```([^\n]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
  
    while ((match = codeBlockRegex.exec(message)) !== null) {
      // Extract text before the code block
      if (match.index > lastIndex) {
        const text = message.substring(lastIndex, match.index);
        if (text.trim()) {
          result.push({ type: 'text', content: text });
        }
      }
  
      // Extract code block
      const language = match[1].trim() || undefined;
      const codeContent = match[2];
  
      result.push({ type: 'code', content: codeContent, language });
  
      lastIndex = codeBlockRegex.lastIndex;
    }
  
    // Extract any remaining text after the last code block
    if (lastIndex < message.length) {
      const text = message.substring(lastIndex);
      if (text.trim()) {
        result.push({ type: 'text', content: text });
      }
    }
  
    return result;
  }
  