// ─────────────────────────────────────────────────────────────
// IL MAZZO PER LA LETTURA DELLE CARTE
// I 22 arcani maggiori, con il significato DRITTO e ROVESCIATO.
// I significati sono una prima versione: rileggili e correggili.
//
//   immagine   → la tua carta disegnata, es. '/carte/matto.png'
//                (le immagini pronte per il sito vanno in public/carte/; vuoto = carta solo testo)
//   dritto     → cosa dice la carta quando esce dritta
//   rovesciato → cosa dice quando esce capovolta
// ─────────────────────────────────────────────────────────────

export const tarocchi = [
  {
    id: 'matto', romano: '0', nome: 'Il Matto', immagine: '/carte/matto.png',
    dritto: 'L’inizio, il salto, la fiducia. È il momento di partire senza sapere tutto: la strada si chiarisce solo camminando.',
    rovesciato: 'Una fuga travestita da libertà. Chiediti se il passo che stai per fare è davvero un inizio, o soltanto un modo per evitare qualcos’altro.'
  },
  {
    id: 'bagatto', romano: 'I', nome: 'Il Bagatto', immagine: '/carte/bagatto.png',
    dritto: 'Hai già gli strumenti che ti servono. È il momento di cominciare, di usare la tua abilità e dare forma a un’idea.',
    rovesciato: 'Talento disperso, o usato per ingannare. Attenzione alle promesse troppo brillanti, anche a quelle che fai a te.'
  },
  {
    id: 'papessa', romano: 'II', nome: 'La Papessa', immagine: '/carte/papessa.png',
    dritto: 'Il sapere silenzioso, l’intuizione. La risposta non va cercata fuori: ascolta, osserva, aspetta che si mostri.',
    rovesciato: 'Segreti, chiusura, un’intuizione ignorata. Stai tacendo qualcosa che andrebbe detto, almeno a te.'
  },
  {
    id: 'imperatrice', romano: 'III', nome: "L'Imperatrice", immagine: '/carte/imperatrice.png',
    dritto: 'Abbondanza, creatività, cura. Qualcosa sta crescendo e chiede di essere nutrito.',
    rovesciato: 'Blocco creativo o cura che soffoca. Forse stai dando troppo agli altri e troppo poco a te.'
  },
  {
    id: 'imperatore', romano: 'IV', nome: "L'Imperatore", immagine: '/carte/imperatore.png',
    dritto: 'Ordine, struttura, autorità. È il momento di stabilire regole e confini chiari.',
    rovesciato: 'Rigidità, controllo, potere usato male. Una regola che proteggeva è diventata una gabbia.'
  },
  {
    id: 'papa', romano: 'V', nome: 'Il Papa', immagine: '/carte/papa.png',
    dritto: 'La tradizione, l’insegnamento, un consiglio saggio. Qualcuno, o qualcosa, può guidarti.',
    rovesciato: 'Dogmi e conformismo. Stai seguendo una regola solo perché si è sempre fatto così.'
  },
  {
    id: 'amanti', romano: 'VI', nome: 'Gli Amanti', immagine: '/carte/amanti.png',
    dritto: 'Una scelta del cuore, un’unione, un legame che chiede di essere riconosciuto.',
    rovesciato: 'Indecisione, disarmonia. Stai rimandando una scelta che sai già di dover fare.'
  },
  {
    id: 'carro', romano: 'VII', nome: 'Il Carro', immagine: '',
    dritto: 'Vittoria, determinazione, movimento. Tieni salde le redini e vai avanti.',
    rovesciato: 'Perdita di controllo, direzione confusa. Forze opposte ti tirano da parti diverse.'
  },
  {
    id: 'giustizia', romano: 'VIII', nome: 'La Giustizia', immagine: '',
    dritto: 'Equilibrio, verità, conseguenze. Ciò che è giusto verrà riconosciuto.',
    rovesciato: 'Un giudizio sbilanciato. Stai evitando di guardare la tua parte di responsabilità.'
  },
  {
    id: 'eremita', romano: 'IX', nome: "L'Eremita", immagine: '',
    dritto: 'Solitudine scelta, ricerca interiore. Allontanati dal rumore per trovare la tua luce.',
    rovesciato: 'Isolamento, chiusura. La solitudine da rifugio è diventata prigione.'
  },
  {
    id: 'ruota', romano: 'X', nome: 'La Ruota della Fortuna', immagine: '',
    dritto: 'Un cambiamento, il destino che gira. Ciò che era fermo si rimette in moto.',
    rovesciato: 'Resistenza al cambiamento, un ciclo che si ripete. La ruota gira comunque: fermarla non serve.'
  },
  {
    id: 'forza', romano: 'XI', nome: 'La Forza', immagine: '',
    dritto: 'Coraggio, pazienza, dominio di sé. Si vince piegandosi, non spezzando.',
    rovesciato: 'Insicurezza, impulsività. L’istinto ha preso il sopravvento sulla calma.'
  },
  {
    id: 'appeso', romano: 'XII', nome: "L'Appeso", immagine: '',
    dritto: 'Sospensione, attesa, un nuovo punto di vista. Fermarsi non è perdere tempo: è guardare il mondo capovolto.',
    rovesciato: 'Stallo, sacrificio inutile. Stai aspettando qualcosa che non arriverà se non ti muovi.'
  },
  {
    id: 'morte', romano: 'XIII', nome: 'La Morte', immagine: '',
    dritto: 'Una fine che fa spazio. Qualcosa si chiude perché qualcos’altro possa cominciare: non uccide, fa passare.',
    rovesciato: 'Paura di lasciare andare. Ti aggrappi a ciò che è già finito.'
  },
  {
    id: 'temperanza', romano: 'XIV', nome: 'La Temperanza', immagine: '',
    dritto: 'Misura, equilibrio, guarigione. Mescola gli opposti, senza fretta.',
    rovesciato: 'Eccesso, squilibrio. Stai esagerando in una direzione e perdendo il centro.'
  },
  {
    id: 'diavolo', romano: 'XV', nome: 'Il Diavolo', immagine: '',
    dritto: 'Desiderio, attaccamento, tentazione. Guarda cosa ti incatena: spesso è proprio ciò che credi di desiderare.',
    rovesciato: 'Liberazione. Le catene si allentano: stai cominciando a vedere cosa ti tratteneva.'
  },
  {
    id: 'torre', romano: 'XVI', nome: 'La Torre', immagine: '',
    dritto: 'Un crollo improvviso, una rivelazione. Ciò che era costruito sul falso cade, e libera.',
    rovesciato: 'Un crollo rimandato. Il cambiamento che temi è già in corso: resistergli lo rende solo più lento.'
  },
  {
    id: 'stella', romano: 'XVII', nome: 'La Stella', immagine: '',
    dritto: 'Speranza, ispirazione, rinnovamento. Dopo la tempesta, una luce che orienta.',
    rovesciato: 'Sfiducia, scoraggiamento. Hai perso di vista la tua stella, ma non si è spenta.'
  },
  {
    id: 'luna', romano: 'XVIII', nome: 'La Luna', immagine: '',
    dritto: 'Sogni, intuizione, illusioni. Non tutto è come sembra: lasciati guidare dall’istinto, con prudenza.',
    rovesciato: 'La confusione si dirada. Una paura si rivela per quello che è.'
  },
  {
    id: 'sole', romano: 'XIX', nome: 'Il Sole', immagine: '',
    dritto: 'Gioia, chiarezza, successo. Tutto si illumina, senza inganni.',
    rovesciato: 'Gioia rimandata, ottimismo eccessivo. La luce c’è, ma qualcosa la vela.'
  },
  {
    id: 'giudizio', romano: 'XX', nome: 'Il Giudizio', immagine: '',
    dritto: 'Risveglio, rinascita, una chiamata. È il momento di rispondere.',
    rovesciato: 'Dubbio, autocritica troppo severa. Stai ignorando una chiamata per paura.'
  },
  {
    id: 'mondo', romano: 'XXI', nome: 'Il Mondo', immagine: '',
    dritto: 'Compimento, pienezza. Un viaggio è arrivato alla meta e un ciclo si chiude.',
    rovesciato: 'Qualcosa resta incompiuto. Manca l’ultimo passo per chiudere il cerchio.'
  }
]

// ─────────────────────────────────────────────────────────────
// LE STESE (i testi vengono dall'articolo "Le stese" della rivista)
//   posizioni → una per ogni carta: il nome della posizione e cosa chiede
// ─────────────────────────────────────────────────────────────

export const stese = [
  {
    id: 'singola',
    nome: 'La carta singola',
    sottotitolo: 'una domanda, una risposta',
    descrizione: 'Una domanda secca, netta, e una sola carta a rispondere. Serve quando la domanda è già chiara e si vuole solo un’indicazione: sì, no, attenzione, aspetta.',
    posizioni: [
      { nome: 'La risposta' }
    ]
  },
  {
    id: 'tre-carte',
    nome: 'Le tre carte',
    sottotitolo: 'il tempo entra nella lettura',
    descrizione: 'Tre carte in fila, e la lettura diventa racconto: la prima dice da dove viene la domanda, la seconda dove si trova ora, la terza dove tende.',
    posizioni: [
      { nome: 'Passato' },
      { nome: 'Presente' },
      { nome: 'Futuro' }
    ]
  }
]

// quante probabilità ha una carta di uscire capovolta (0.3 = circa 1 su 3)
export const PROBABILITA_ROVESCIATA = 0.3
