import React, { useState, useRef, useEffect } from 'react';
import '../styles/AiChat.css';

// ── Configuración del Webhook ─────────────────────────────────
// En producción, define VITE_N8N_WEBHOOK_URL en tu archivo .env
// Ejemplo: VITE_N8N_WEBHOOK_URL=https://your-n8n.example.com/webhook/xyz
const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-webhook-url-here.com/webhook';

// ── Sub-componentes ───────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="chat-bubble chat-bubble--agent">
      <div className="chat-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-message-row ${isUser ? 'chat-message-row--user' : ''}`}>
      {!isUser && (
        <div className="chat-avatar chat-avatar--agent" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
              fill="currentColor" />
          </svg>
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--agent'}`}>
        <p>{msg.text}</p>
        <span className="chat-bubble-time">
          {new Date(msg.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'agent',
      text: '¡Hola! Soy tu Asistente de Ventas IA 🛫 Puedo ayudarte a analizar el pipeline, revisar el rendimiento del equipo o responder preguntas sobre los deals. ¿En qué te ayudo?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus al input cuando se abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    // 1. Agrega el mensaje del usuario
    const userMsg = { id: Date.now(), role: 'user', text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setHasError(false);

    try {
      // 2. POST al webhook con { "message": "..." }
      const res = await fetch('https://lab3fsi-crm.app.n8n.cloud/webhook/9796cc34-71b4-4bf1-9184-95a0d1f3f36c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // 3. Parsea la respuesta esperando { "response": "..." }
      const data = await res.json();
      const agentText =
        data?.response ||
        data?.message ||
        data?.text ||
        'Respuesta recibida (formato inesperado).';

      const agentMsg = {
        id: Date.now() + 1,
        role: 'agent',
        text: agentText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error('[AiChat] Webhook error:', err);
      setHasError(true);
      const errMsg = {
        id: Date.now() + 1,
        role: 'agent',
        text: `⚠️ No pude conectarme al agente (${err.message}). Verifica que el Webhook URL esté configurado y activo.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Panel de Chat ──────────────────────────────────── */}
      <div className={`chat-panel ${isOpen ? 'chat-panel--open' : ''}`} role="dialog" aria-label="Asistente IA">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white" fillOpacity="0.2" />
                <path d="M9 9H9.01M15 9H15.01M8 13C8.79 14.21 10.26 15 12 15C13.74 15 15.21 14.21 16 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="chat-header-title">Asistente IA</p>
              <p className="chat-header-status">
                <span className="chat-status-dot" />
                En línea
              </p>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Webhook URL warning */}
        {N8N_WEBHOOK_URL.includes('your-n8n') && (
          <div className="chat-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Configura <code>VITE_N8N_WEBHOOK_URL</code> en <code>.env</code>
          </div>
        )}

        {/* Mensajes */}
        <div className="chat-messages" aria-live="polite">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            id="chat-input"
            className="chat-input"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            aria-label="Mensaje para el asistente"
          />
          <button
            id="chat-send-btn"
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Enviar mensaje"
          >
            {isLoading ? (
              <span className="chat-send-spinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        <p className="chat-footer-hint">Enter para enviar · Shift+Enter nueva línea</p>
      </div>

      {/* ── Botón flotante FAB ─────────────────────────────── */}
      <button
        id="chat-fab-btn"
        className={`chat-fab ${isOpen ? 'chat-fab--active' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Cerrar asistente IA' : 'Abrir asistente IA'}
        title="Asistente IA"
      >
        {/* Ícono de Asistente (abierto → X) */}
        <span className={`chat-fab-icon ${isOpen ? 'chat-fab-icon--close' : ''}`}>
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 10H8.01M12 10H12.01M16 10H16.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
        {/* Notificación dot (solo cuando está cerrado) */}
        {!isOpen && <span className="chat-fab-pulse" />}
      </button>
    </>
  );
}
