'use client';

import { Message, useAssistant as useAssistant } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: '/api/assistant' });

  // Focus the input when the assistant is ready for a new message.
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-24 px-4">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Chat with Your Assistant
        </h1>
        <p className="text-gray-600">
          Get personalized shoe recommendations based on your Strava data.
        </p>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 px-6 py-3 text-white bg-red-500 rounded-md">
          <span>Error: {(error as any).toString()}</span>
        </div>
      )}

      {/* Message List */}
      <div className="flex flex-col space-y-4 mb-28">
        {messages.map((m: Message) => (
          <div
            key={m.id}
            className={`p-4 rounded-lg shadow 
              ${
                m.role === 'assistant'
                  ? 'bg-white border border-gray-300'
                  : m.role === 'user'
                  ? 'bg-blue-50 text-right'
                  : m.role === 'system'
                  ? 'bg-red-50'
                  : 'bg-gray-100'
              }`}
          >
            <div className="mb-2 text-sm font-semibold uppercase text-gray-500">
              {m.role}
            </div>
            {m.role === 'data' ? (
              <>
                <p>{(m.data as any).description}</p>
                <pre className="p-2 mt-2 text-sm bg-gray-200 rounded">
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            ) : (
              <ReactMarkdown className="prose prose-sm">
              {m.content
                .split('.\n')
                .map(line => `- ${line}`)
                .join('.\n')}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {status === 'in_progress' && (
          <div className="p-4 mb-4 text-center bg-gray-200 rounded-lg animate-pulse">
            Assistant is typing...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={submitMessage}
        className="fixed text-center inset-x-0 bottom-20 px-4"
      >
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          placeholder="What shoe are you looking for?"
          onChange={handleInputChange}
        />
      </form>

      {/* Stop Button */}
      <div className="fixed inset-x-0 bottom-4 px-4">
        <button
          className="w-full p-3 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring"
          onClick={stop}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
