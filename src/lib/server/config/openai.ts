import OpenAI from "openai";

const openai = new OpenAI();

export async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o"
  });

  return assistant;
}

export async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread;
}

export async function addMessageToThread(threadId: string, content: string) {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content
  });

  return message;
}

export async function createAndStreamRun(threadId: string, assistantId: string) {
  const run = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId
  })
    .on('textCreated', (text) => console.log('\nassistant > '))
    .on('textDelta', (textDelta, snapshot) => console.log(textDelta.value))
    .on('toolCallCreated', (toolCall) => console.log(`\nassistant > ${toolCall.type}\n\n`))
    .on('toolCallDelta', (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === 'code_interpreter') {
        const codeInterpreter = toolCallDelta.code_interpreter;
        if (codeInterpreter) {
          if (codeInterpreter.input) {
            console.log(codeInterpreter.input);
          }
          if (codeInterpreter.outputs) {
            console.log("\noutput >\n");
            codeInterpreter.outputs.forEach(output => {
              if (output.type === "logs") {
                console.log(`\n${output.logs}\n`);
              }
            });
          }
        }
      }
    });

  return run;
}
