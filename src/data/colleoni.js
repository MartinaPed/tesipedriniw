// ─────────────────────────────────────────────────────────────
// IL MAZZO COLLEONI (detto anche Colleoni-Baglioni o Pierpont Morgan-Bergamo)
// Mazzo di tarocchi dipinto a mano a metà del Quattrocento per gli Sforza.
// Delle 78 carte originali ne restano 74, divise tra:
//   - The Morgan Library & Museum, New York (35 carte, tra cui 15 arcani)
//   - Accademia Carrara, Bergamo (26 carte, tra cui 5 arcani)
//   - collezione privata della famiglia Colleoni, Bergamo (13 carte numerali)
// Qui ci sono i 22 arcani maggiori (2 sono andati perduti).
//
// Ogni carta ha:
//   immagine      → il file in public/colleoni/
//   conservazione → dove si trova oggi
//   autore        → chi l'ha dipinta
//   descrizione   → cosa rappresenta
// ─────────────────────────────────────────────────────────────

const CARRARA = 'Accademia Carrara, Bergamo'
const MORGAN = 'The Morgan Library & Museum, New York'
const BEMBO = 'Bonifacio Bembo'
const CICOGNARA = 'Antonio Cicognara (aggiunta successiva)'
const DATAZIONE = '1450–1480 circa'

export const carteColleoni = [
  {
    id: 'matto', romano: '0', nome: 'Il Matto',
    immagine: '/colleoni/matto.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un uomo scalzo e cencioso, con le calze bianche che gli scivolano sulle gambe, porta un lungo bastone sulla spalla e ha delle piume infilate tra i capelli. È il folle, il mendicante ai margini della corte: l’unica figura che sta fuori da ogni ordine, e per questo non ha numero.'
  },
  {
    id: 'bagatto', romano: 'I', nome: 'Il Bagatto',
    immagine: '/colleoni/bagatto.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un uomo vestito di rosso, con un grande cappello, siede davanti a un tavolo su cui sono disposti gli oggetti del suo mestiere e tiene in mano una bacchetta. È il giocoliere da piazza, l’artigiano dell’illusione: la prima carta, figura dell’abilità e di ogni inizio.'
  },
  {
    id: 'papessa', romano: 'II', nome: 'La Papessa',
    immagine: '/colleoni/papessa.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Una donna in abito monacale bruno, con la tiara papale sul capo, siede in trono con un libro chiuso in mano. È una delle figure più enigmatiche del mazzo: è stata letta come allegoria della Fede, come la leggendaria papessa Giovanna o come suor Manfreda, parente dei Visconti.'
  },
  {
    id: 'imperatrice', romano: 'III', nome: "L'Imperatrice",
    immagine: '/colleoni/imperatrice.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Una sovrana incoronata, avvolta in una veste d’oro e in un mantello blu, siede in trono reggendo uno scettro e uno scudo con l’aquila nera imperiale. Incarna il potere e la dignità del governo terreno.'
  },
  {
    id: 'imperatore', romano: 'IIII', nome: "L'Imperatore",
    immagine: '/colleoni/imperatore.jpg', conservazione: CARRARA, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un sovrano anziano dalla lunga barba bianca, vestito d’oro, siede in trono con lo scettro e il globo; sul copricapo spicca l’aquila nera imperiale. È l’autorità temporale, il padre che stabilisce la legge.'
  },
  {
    id: 'papa', romano: 'V', nome: 'Il Papa',
    immagine: '/colleoni/papa.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Il pontefice siede in trono con la tiara sul capo e un ricco manto verde e oro, e alza la mano destra in segno di benedizione. È l’autorità spirituale, che fa da tramite tra il cielo e gli uomini.'
  },
  {
    id: 'amore', romano: 'VI', nome: "L'Amore",
    immagine: '/colleoni/amore.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un uomo e una donna in abiti di corte si danno la mano, mentre sopra di loro un piccolo Cupido bendato sta per scoccare la sua freccia. È l’unione, forse un fidanzamento: c’è chi vi ha riconosciuto Francesco Sforza e Bianca Maria Visconti.'
  },
  {
    id: 'carro', romano: 'VII', nome: 'Il Carro',
    immagine: '/colleoni/carro.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Una dama incoronata siede su un carro trionfale trainato da due cavalli bianchi alati. La scena richiama i cortei dei Trionfi di Petrarca: è la vittoria, il viaggio verso la gloria.'
  },
  {
    id: 'giustizia', romano: 'VIII', nome: 'La Giustizia',
    immagine: '/colleoni/giustizia.jpg', conservazione: CARRARA, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Una donna seduta in trono tiene la spada in una mano e la bilancia nell’altra; sopra di lei, nella lunetta, un cavaliere in armatura galoppa su un cavallo bianco. È l’equilibrio tra giudizio e azione, la legge che pesa e che colpisce.'
  },
  {
    id: 'eremita', romano: 'VIIII', nome: "L'Eremita",
    immagine: '/colleoni/eremita.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un vecchio dalla lunga barba bianca, avvolto in un mantello blu, si appoggia a un bastone e tiene in mano una clessidra. In questo mazzo è ancora il Tempo che scorre: solo nei tarocchi successivi diventerà l’Eremita con la lanterna.'
  },
  {
    id: 'ruota', romano: 'X', nome: 'La Ruota della Fortuna',
    immagine: '/colleoni/ruota-fortuna.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Al centro la Fortuna, alata e bendata, fa girare una grande ruota; attorno quattro figure mostrano chi sale, chi regna in cima, chi precipita e chi giace schiacciato sotto. È l’instabilità della sorte, che solleva e abbatte senza guardare.'
  },
  {
    id: 'forza', romano: 'XI', nome: 'La Forza',
    immagine: '/colleoni/forza.jpg', conservazione: MORGAN, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Un giovane solleva una clava per colpire il leone che si piega ai suoi piedi: è Ercole che vince il leone di Nemea. Rappresenta la forza fisica e morale, il coraggio che doma l’istinto.'
  },
  {
    id: 'appeso', romano: 'XII', nome: "L'Appeso",
    immagine: '/colleoni/appeso.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Un uomo è appeso a testa in giù per un piede a una forca di legno, con le mani legate dietro la schiena. È il traditore: nelle città italiane del Quattrocento chi tradiva veniva dipinto così sui muri pubblici, come punizione e monito.'
  },
  {
    id: 'morte', romano: 'XIII', nome: 'La Morte',
    immagine: '/colleoni/morte.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'Uno scheletro in piedi, con una benda sul capo, impugna un arco e una freccia. La morte colpisce tutti senza distinzione, re e mendicanti: è la fine, ma anche il passaggio necessario.'
  },
  {
    id: 'temperanza', romano: 'XIIII', nome: 'La Temperanza',
    immagine: '/colleoni/temperanza.jpg', conservazione: MORGAN, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Una giovane donna in abito blu stellato versa l’acqua da una brocca all’altra. È la misura, la capacità di mescolare gli opposti senza perdere l’equilibrio.'
  },
  { id: 'diavolo', romano: 'XV', nome: 'Il Diavolo', perduta: true },
  { id: 'torre', romano: 'XVI', nome: 'La Torre', perduta: true },
  {
    id: 'stella', romano: 'XVII', nome: 'La Stella',
    immagine: '/colleoni/stella.jpg', conservazione: CARRARA, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Una donna in abito blu stellato e mantello rosso alza il braccio verso una stella luminosa. È la speranza, la guida che indica la strada nel buio.'
  },
  {
    id: 'luna', romano: 'XVIII', nome: 'La Luna',
    immagine: '/colleoni/luna.jpg', conservazione: CARRARA, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Una giovane dai lunghi capelli biondi, in abito rosso e blu, tiene sollevata una falce di luna. È il regno della notte e dei sogni, del femminile e dei cicli che ritornano.'
  },
  {
    id: 'sole', romano: 'XVIIII', nome: 'Il Sole',
    immagine: '/colleoni/sole.jpg', conservazione: MORGAN, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Un putto alato, avvolto in una sciarpa rossa, sorregge un sole fiammeggiante dal volto umano, sospeso su una nuvola sopra il paesaggio. È la luce, la chiarezza, la gioia che illumina ogni cosa.'
  },
  {
    id: 'giudizio', romano: 'XX', nome: "L'Angelo",
    immagine: '/colleoni/giudizio.jpg', conservazione: MORGAN, autore: BEMBO, datazione: DATAZIONE,
    descrizione: 'In alto Dio Padre domina la scena, mentre due angeli suonano le trombe; sotto, tre figure si sollevano da un sepolcro. È il Giudizio universale: il risveglio, la chiamata a rinascere.'
  },
  {
    id: 'mondo', romano: 'XXI', nome: 'Il Mondo',
    immagine: '/colleoni/mondo.jpg', conservazione: CARRARA, autore: CICOGNARA, datazione: DATAZIONE,
    descrizione: 'Due putti alati sorreggono un grande cerchio in cui appare una città fortificata, sotto un cielo stellato. È il mondo compiuto, la meta del viaggio: l’ultima carta della serie.'
  }
]
