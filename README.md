# Artemis-AI — Assistente Virtuale Interattivo guidato da LLM 🤖✨

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-blueviolet?style=for-the-badge)](https://artemis-ai-ten.vercel.app/)

**Artemis-AI** è un'applicazione web interattiva sviluppata come **Project Work ("SayHi!")** in collaborazione con la **Zucchetti Academy**. Il progetto scardina il concetto di documentazione statica trasformandola in un'interfaccia di supporto dinamica basata sull'Intelligenza Artificiale di ultima generazione.

Il chatbot integra i modelli linguistici avanzati di **Google Gemini** tramite API, ed è configurato tramite un *system prompt* ingegnerizzato ad hoc per simulare un assistente reale: chiaro, conciso e mirato al supporto dell'utente.

---

## 👥 Team di Sviluppo
Il progetto è stato ideato e sviluppato dal team di studenti dell'indirizzo informatico del **Polo Tecnologico "Donegani-Ciliberto"** di Crotone:
* **Mattia Mungari** (Core Development & Architecture)
* Gaetano Grisi
* Vincenzo Ruggiero
* Samuele Serpa

---

## 🛡️ Architettura & Scelte Tecnologiche (Serverless Proxy)

Inizialmente concepito con chiamate dirette *client-side*, in fase di code review abbiamo riscontrato una vulnerabilità architetturale: l'esposizione della chiave API nel codice visibile dal browser. Per risolvere il problema alla radice, abbiamo riprogettato l'applicazione implementando un'architettura **Serverless Proxy** ospitata su **Vercel**:

1. **Endpoint Locale & Client**: Il file `scripts/index.js` intercetta l'input dell'utente ed effettua una chiamata asincrona all'endpoint relativo `/api/chat`.
2. **Serverless Back-end Engine (`api/chat.js`)**: Una funzione Node.js isolata intercetta la richiesta, vi inietta in modo totalmente sicuro la chiave memorizzata nelle variabili d'ambiente protette di Vercel (`process.env.GEMINI_API_KEY`) ed esegue il tunneling (proxy) sicuro verso le API ufficiali di Google.
3. **Data Flow Pulito**: Questo approccio impedisce qualsiasi tipo di *leak* della chiave o tracciamento dei token tramite la scheda *Rete (Network)* degli strumenti per sviluppatori del browser.

### Perché Google Gemini e non Transformers.js?
Durante lo studio di fattibilità (documentato in `analisi.pdf`), abbiamo valutato l'approccio standard basato su Transformers.js. Tuttavia, essendo un modello estrattivo *client-side*, vincolava le risposte a un contesto predefinito rigido. Abbiamo optato per le API di Gemini per garantire risposte generative fluide, una comprensione profonda delle sfumature della lingua italiana e la flessibilità necessaria a gestire flussi di conversazione complessi.

---

## 📁 Struttura del Progetto

La disposizione dei file segue rigorosamente i requisiti strutturali del Project Work per garantire massima modularità:

```text
artemis-ai/
├── index.html                 # Interfaccia grafica principale della chat
├── analisi.pdf                # Documento di Analisi tecnica e studio di fattibilità
├── manuale_utente.pdf         # Manuale d'uso ufficiale e documentazione delle funzionalità
│
├── api/
│   └── chat.js                # Serverless Function (Vercel) che agisce da proxy sicuro
│
├── scripts/
│   └── index.js               # Logica JavaScript lato client (gestione DOM e fetch asincrone)
│
├── styles/
│   └── style.css              # Foglio di stile CSS per il layout responsive dell'applicazione
│
└── assets/
    └── logo.png               # Identità visiva e logo ufficiale dell'assistente Artemis-AI

---

## 📈 Competenze Dimostrate in questo Progetto

* **Prompt Engineering:** Configurazione di un system prompt robusto per vincolare il comportamento dell'assistente (stile, tono, mitigazione delle allucinazioni, formattazione).
* **Cloud & Serverless Deployment:** Configurazione, routing e gestione delle variabili d'ambiente su piattaforma Vercel.
* **Web Security:** Comprensione e risoluzione di vulnerabilità legate alle API Key esposte sul client attraverso pattern proxy backend.
* **Technical Writing:** Redazione di documentazione tecnica completa e manuali utente (disponibili all'interno della repository).

---

## ✉️ Contatti & Link

* **Live Link:** [Visualizza l'applicazione su Vercel](https://artemis-ai-ten.vercel.app/)
* **LinkedIn:** [://linkedin.com](https://www.linkedin.com/in/mattiamungari)
* **Email:** [mungari.mattia@outlook.com](mailto:mungari.mattia@outlook.com)
