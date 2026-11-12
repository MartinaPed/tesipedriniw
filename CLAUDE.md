# Arcanamente: istruzioni per Claude Code

## Chi sono e come lavoriamo
Sono Martina, studentessa di Graphic Design (LABA Brescia). Questo sito è la mia **tesi di laurea**.
Non sono una programmatrice: **voglio capire ogni pezzo di codice**.

- Lavora **a piccoli passi**: una cosa per volta, poi fermati e fammi provare.
- **Spiegami ogni modifica in italiano semplice**: cosa hai cambiato, in quale file, e perché.
- Scrivi **i commenti nel codice in italiano**, chiari, come se li leggesse una principiante.
- Prima di modifiche grandi (nuovi componenti, cambi di struttura) **descrivimi il piano e aspetta il mio ok**.
- **Non fare commit, push o deploy** senza chiedermelo.
- Il design è in Figma, nel file **"sito-tarocchi"**: ogni pagina va tenuta allineata tra Figma e codice. Quando cambi qualcosa di visivo, dimmi cosa devo aggiornare in Figma.

## Il progetto
**Arcanamente** è una **rivista online di cultura esoterica**. Esiste **solo sul web**: non c'è nessuna rivista di carta.
Non scrivere mai frasi come "capovolgete la rivista" o "nelle pagine seguenti": si scorre, si clicca, si **gira la carta**.

- **Ogni numero è un arcano maggiore**: N°00 Il Matto, N°01 Il Bagatto… fino al N°21 Il Mondo.
- **Ogni numero ha due lati**, come il dritto e il rovescio di una carta:
  - Il Matto → lato A *Il Matto* (ottanio) · lato B *Il Viandante* (viola)
  - Il Bagatto → lato A *L'Illusionista* (burgundy) · lato B (da definire)
- Si passa da un lato all'altro con **"↻ Gira la carta"**: la pagina ruota in 3D.
- Ogni lato ha una **parola inventata** (soglienza, varcanza, illudenza…) che va nel **glossario**.
- Il concept: chi legge fa **il viaggio del Matto**, attraverso i 22 arcani.

## Navigazione
Home (le 22 carte in fila) → pagina del numero, sempre dal lato A (carta grande, editoriale con la parola cliccabile, **sommario** degli articoli, gira la carta) → pagina dell'articolo (barra in alto "← Il Matto · Lato A · 2 di 6", articolo e interazione, "Prossimo articolo →" in fondo).

## Rubriche fisse (uguali in ogni numero)
| Rubrica | Matto | Bagatto | Interazione |
|---|---|---|---|
| Editoriale | soglienza / varcanza | illudenza | parola cliccabile → glossario |
| La carta | Il volto del Matto | Bagatelle | ✦ sulla carta: clicchi e spiega il dettaglio |
| L'approfondimento | L'invisibile umano | Houdini contro i medium | l'articolo parte dall'interazione |
| Speciale | Il mazzo Colleoni | Il gioco dei bussolotti | unica per numero |
| Le vie dei tarocchi | Londra esoterica | L'Empordà di Dalí | mappa con 3 luoghi + itinerario (voli, hotel) |
| Un arcano al bar | Aviation | Hanky Panky | testo + foto del drink |
| Intervista | Lazzarini (lato B) | Sibilla Cooman | lettura |

**Componenti riutilizzabili**: la stessa interazione serve per tutti i numeri, cambiano solo i dati. Non duplicare componenti: rendili generici e metti i contenuti nei file di `src/data/`.

## Tecnica
- **Vue 3 + Vite**, sempre `<script setup>` e CSS `scoped`.
- Router con hash in `src/router/index.js`.
- **I contenuti stanno in `src/data/`**, non nei componenti:
  - `numeri.js`: numeri, lati, editoriali, articoli
  - `glossario.js`: le parole inventate
  - `colleoni.js`: il mazzo Colleoni
  - `tarocchi.js`: le 22 carte e i significati per la lettura
- Pagine in `src/views/`, componenti in `src/components/`, componenti degli articoli interattivi in `src/components/approfondimenti/`.
- Le immagini sono in `public/`. Usa sempre l'helper `publicAssetUrl()` da `src/utils/publicAssetUrl.js` per i loro percorsi.
- **Stile**: usa le variabili di `src/style.css` (`--carta`, `--inchiostro`, `--grigio`, `--titoli` = Cormorant Garamond, `--testi` = DM Sans). Ogni lato ha i suoi colori in `numeri.js` (`colore`, `sfumatura`, `testo`).
- Ogni pagina deve funzionare anche **sul telefono** (390px).
- Rispetta `prefers-reduced-motion` nelle animazioni.
- Per provare il sito: `npm run dev`, poi apri `localhost:5173`.
- Pubblicazione: la faccio io con `npm run deploy` (gh-pages). Non creare workflow GitHub.
