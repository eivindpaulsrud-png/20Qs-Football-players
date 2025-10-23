import React, { useState, useEffect } from 'react';
import { Search, Trophy, Globe, Calendar, AlertCircle, CheckCircle, XCircle, Star, Filter, User, Award } from 'lucide-react';
import { playerDatabase } from './playerDatabase';

function App() {
  const [language, setLanguage] = useState('en');
  const [gameState, setGameState] = useState('language');
  const [username, setUsername] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [useFilters, setUseFilters] = useState({
    period: false,
    continent: false,
    league: false
  });
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(20);
  const [finalGuess, setFinalGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem('footballQuizHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  // HJELPEFUNKSJON: Normaliser tekst for sammenligning
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD") // Splitter tegn med aksenter
      .replace(/[\u0300-\u036f]/g, "") // Fjerner aksenter
      .replace(/[''`´]/g, "") // Fjerner apostrofer
      .replace(/[-]/g, " ") // Erstatter bindestrek med mellomrom
      .replace(/[^\w\s]/g, "") // Fjerner andre spesialtegn
      .trim();
  };

  // HJELPEFUNKSJON: Sjekk om en klubb matcher spillerens klubber
  const playerHasClub = (clubQuery) => {
    const normalizedQuery = normalizeText(clubQuery);
    return currentPlayer.clubs.some(club => {
      const normalizedClub = normalizeText(club);
      // Sjekk om spørsmålet inneholder klubbnavnet ELLER omvendt
      return normalizedClub.includes(normalizedQuery) || normalizedQuery.includes(normalizedClub);
    });
  };

  const translations = {
    en: {
      title: "Football Player 20 Questions",
      subtitle: "I'm thinking of a football player. Ask yes/no questions to guess who it is!",
      selectLanguage: "Select Language",
      enterUsername: "Enter Your Name",
      usernamePlaceholder: "Your name...",
      continue: "Continue",
      selectPeriod: "Select Birth Period",
      selectContinent: "Select Birth Continent",
      selectLeague: "Select League (Optional)",
      useFiltersTitle: "Difficulty Settings",
      useFiltersDesc: "Enable filters to make the game easier (reduces your score)",
      usePeriodFilter: "Use Birth Period Filter",
      useContinentFilter: "Use Birth Continent Filter",
      useLeagueFilter: "Use League Filter",
      startGame: "Start Game",
      questionsLeft: "questions left",
      validQuestions: "valid questions",
      restart: "Restart",
      hint: "Hint:",
      playerFrom: "The player is from",
      playedAs: "and played as a",
      bornIn: "born in",
      readyToGuess: "Ready to guess?",
      enterPlayerName: "Enter the player's name...",
      submitGuess: "Submit Guess",
      congratulations: "Congratulations!",
      youGuessed: "You correctly guessed",
      gameOver: "Game Over!",
      playerWas: "The player was",
      playerDetails: "Player Details:",
      country: "Country:",
      position: "Position:",
      clubs: "Clubs:",
      birthYear: "Birth Year:",
      worldCup: "World Cup:",
      euro: "European Championship:",
      championsLeague: "Champions League:",
      ballonDor: "Ballon d'Or:",
      premierLeague: "Premier League:",
      laLiga: "La Liga:",
      serieA: "Serie A:",
      bundesliga: "Bundesliga:",
      ligue1: "Ligue 1:",
      height: "Height:",
      appearance: "Appearance:",
      yes: "Yes",
      no: "No",
      notCounted: "Not counted",
      questionsUsed: "Valid questions used:",
      finalScore: "Final Score:",
      playAgain: "Play Again",
      viewHighScores: "View High Scores",
      hideHighScores: "Hide High Scores",
      highScoresTitle: "🏆 High Scores (Local)",
      highScoresNote: "Scores saved on this device only",
      noScoresYet: "No high scores yet. Be the first!",
      askQuestion: "Ask a yes/no question...",
      asking: "Ask",
      checking: "Checking...",
      tipsTitle: "Tips for asking questions:",
      tip1: "Ask about position (forward, midfielder, defender)",
      tip2: "Ask about clubs and league titles",
      tip3: "Ask about trophies (World Cup, Euro, Champions League)",
      tip4: "Ask about appearance (height, hair, beard)",
      tip5: "Ask about birth year (born before/after XXXX)",
      scoreBreakdown: "Score Breakdown:",
      baseScore: "Base Score:",
      questionPenalty: "Question Penalty:",
      filterPenalty: "Filter Penalty:",
      bonusPoints: "Early Guess Bonus:",
      cm: "cm",
      rank: "Rank",
      player: "Player",
      points: "Points",
      won: "Won",
      notWon: "Did not win"
    },
    no: {
      title: "Fotballspiller 20 Spørsmål",
      subtitle: "Jeg tenker på en fotballspiller. Still ja/nei-spørsmål for å gjette hvem det er!",
      selectLanguage: "Velg Språk",
      enterUsername: "Skriv inn navnet ditt",
      usernamePlaceholder: "Ditt navn...",
      continue: "Fortsett",
      selectPeriod: "Velg Fødselsperiode",
      selectContinent: "Velg Fødekontinent",
      selectLeague: "Velg Liga (Valgfritt)",
      useFiltersTitle: "Vanskelighetsgrad",
      useFiltersDesc: "Aktiver filtre for å gjøre spillet enklere (reduserer poengsummen din)",
      usePeriodFilter: "Bruk Fødselsperiode-filter",
      useContinentFilter: "Bruk Fødekontinent-filter",
      useLeagueFilter: "Bruk Liga-filter",
      startGame: "Start Spill",
      questionsLeft: "spørsmål igjen",
      validQuestions: "gyldige spørsmål",
      restart: "Start på nytt",
      hint: "Hint:",
      playerFrom: "Spilleren er fra",
      playedAs: "og spilte som",
      bornIn: "født i",
      readyToGuess: "Klar til å gjette?",
      enterPlayerName: "Skriv inn spillerens navn...",
      submitGuess: "Send inn gjetning",
      congratulations: "Gratulerer!",
      youGuessed: "Du gjettet riktig",
      gameOver: "Spillet er over!",
      playerWas: "Spilleren var",
      playerDetails: "Spillerdetaljer:",
      country: "Land:",
      position: "Posisjon:",
      clubs: "Klubber:",
      birthYear: "Fødselsår:",
      worldCup: "VM:",
      euro: "EM:",
      championsLeague: "Champions League:",
      ballonDor: "Ballon d'Or:",
      premierLeague: "Premier League:",
      laLiga: "La Liga:",
      serieA: "Serie A:",
      bundesliga: "Bundesliga:",
      ligue1: "Ligue 1:",
      height: "Høyde:",
      appearance: "Utseende:",
      yes: "Ja",
      no: "Nei",
      notCounted: "Teller ikke",
      questionsUsed: "Gyldige spørsmål brukt:",
      finalScore: "Sluttpoeng:",
      playAgain: "Spill igjen",
      viewHighScores: "Vis toppliste",
      hideHighScores: "Skjul toppliste",
      highScoresTitle: "🏆 Toppliste (Lokal)",
      highScoresNote: "Poeng lagres kun på denne enheten",
      noScoresYet: "Ingen på topplisten ennå. Vær den første!",
      askQuestion: "Still et ja/nei-spørsmål...",
      asking: "Still spørsmål",
      checking: "Sjekker...",
      tipsTitle: "Tips til spørsmål:",
      tip1: "Spør om posisjon (spiss, midtbane, forsvar)",
      tip2: "Spør om klubber og ligatitler",
      tip3: "Spør om trofeer (VM, EM, Champions League)",
      tip4: "Spør om utseende (høyde, hår, skjegg)",
      tip5: "Spør om fødselsår (født før/etter XXXX)",
      scoreBreakdown: "Poengfordeling:",
      baseScore: "Grunnpoeng:",
      questionPenalty: "Spørsmålstrekk:",
      filterPenalty: "Filtertrekk:",
      bonusPoints: "Tidlig gjetting bonus:",
      cm: "cm",
      rank: "Plass",
      player: "Spiller",
      points: "Poeng",
      won: "Vunnet",
      notWon: "Ikke vunnet"
    }
  };

  const t = translations[language];

  const periods = [
    { id: '1950-1960', label: language === 'no' ? 'Født 1950-60' : 'Born 1950-60' },
    { id: '1960-1970', label: language === 'no' ? 'Født 1960-70' : 'Born 1960-70' },
    { id: '1970-1980', label: language === 'no' ? 'Født 1970-80' : 'Born 1970-80' },
    { id: '1980-1990', label: language === 'no' ? 'Født 1980-90' : 'Born 1980-90' },
    { id: '1990-2000', label: language === 'no' ? 'Født 1990-00' : 'Born 1990-00' },
    { id: '2000-2010', label: language === 'no' ? 'Født 2000-10' : 'Born 2000-10' }
  ];

  const continents = [
    { id: 'europe', label: language === 'no' ? 'Europa' : 'Europe' },
    { id: 'south-america', label: language === 'no' ? 'Sør-Amerika' : 'South America' },
    { id: 'africa', label: language === 'no' ? 'Afrika' : 'Africa' },
    { id: 'asia', label: language === 'no' ? 'Asia' : 'Asia' },
    { id: 'north-america', label: language === 'no' ? 'Nord-Amerika' : 'North America' }
  ];

  const leagues = [
    { id: 'premier-league', label: 'Premier League' },
    { id: 'la-liga', label: 'La Liga' },
    { id: 'serie-a', label: 'Serie A' },
    { id: 'bundesliga', label: 'Bundesliga' },
    { id: 'ligue-1', label: 'Ligue 1' }
  ];

  const calculateScore = (validQuestions, filtersUsed) => {
    const baseScore = 1000;
    const questionPenalty = validQuestions * 30;
    const filterPenalty = filtersUsed * 100;
    const earlyBonus = Math.max(0, (20 - validQuestions) * 20);
    
    return Math.max(0, baseScore - questionPenalty - filterPenalty + earlyBonus);
  };

  const saveHighScore = (playerName, score) => {
    const newScore = {
      name: playerName,
      score: score,
      date: new Date().toISOString()
    };
    
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setHighScores(updatedScores);
    localStorage.setItem('footballQuizHighScores', JSON.stringify(updatedScores));
  };

  const startGame = () => {
    if (!username.trim()) {
      alert(language === 'no' ? 'Vennligst skriv inn navnet ditt' : 'Please enter your name');
      return;
    }

    let allPlayers = [];
    
    Object.keys(playerDatabase).forEach(continent => {
      Object.keys(playerDatabase[continent]).forEach(period => {
        playerDatabase[continent][period].forEach(player => {
          allPlayers.push({ ...player, birthPeriod: period, birthContinent: continent });
        });
      });
    });

    if (useFilters.continent && selectedContinent) {
      allPlayers = allPlayers.filter(p => p.birthContinent === selectedContinent);
    }
    
    if (useFilters.period && selectedPeriod) {
      allPlayers = allPlayers.filter(p => p.birthPeriod === selectedPeriod);
    }
    
    if (useFilters.league && selectedLeague) {
      const leagueMap = {
        'premier-league': 'premierLeague',
        'la-liga': 'laLiga',
        'serie-a': 'serieA',
        'bundesliga': 'bundesliga',
        'ligue-1': 'ligue1'
      };
      const leagueKey = leagueMap[selectedLeague];
      allPlayers = allPlayers.filter(p => p[leagueKey] === true);
    }

    if (allPlayers.length === 0) {
      alert(language === 'no' ? 
        'Ingen spillere tilgjengelig for denne kombinasjonen. Prøv en annen.' : 
        'No players available for this combination. Try another selection.');
      return;
    }

    const randomPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    setCurrentPlayer(randomPlayer);
    setGameState('playing');
    setQuestions([]);
    setRemainingQuestions(20);
    setShowHint(false);
  };

  const verifyAnswer = async (question) => {
    if (!currentPlayer) return;

    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const q = question.toLowerCase();
    let answer = 'Unknown';
    let counted = true;

    // Position checks
    if (q.includes('forward') || q.includes('striker') || q.includes('attacker') || q.includes('spiss')) {
      answer = currentPlayer.position === 'Forward' ? t.yes : t.no;
    } else if (q.includes('midfielder') || q.includes('midfield') || q.includes('midtbane')) {
      answer = currentPlayer.position === 'Midfielder' ? t.yes : t.no;
    } else if (q.includes('defender') || q.includes('defence') || q.includes('defense') || q.includes('forsvar')) {
      answer = currentPlayer.position === 'Defender' ? t.yes : t.no;
    } else if (q.includes('goalkeeper') || q.includes('keeper') || q.includes('målvakt')) {
      answer = currentPlayer.position === 'Goalkeeper' ? t.yes : t.no;
    }
    
    // Continent/Verdensdel checks
    else if (q.includes('europe') || q.includes('europa') || q.includes('european') || q.includes('europeisk')) {
      answer = currentPlayer.birthContinent === 'europe' ? t.yes : t.no;
    } else if (q.includes('south america') || q.includes('sor amerika') || q.includes('south american') || q.includes('soramerikansk')) {
      answer = currentPlayer.birthContinent === 'south-america' ? t.yes : t.no;
    } else if (q.includes('africa') || q.includes('afrika') || q.includes('african') || q.includes('afrikansk')) {
      answer = currentPlayer.birthContinent === 'africa' ? t.yes : t.no;
    } else if (q.includes('asia') || q.includes('asian') || q.includes('asiatisk')) {
      answer = currentPlayer.birthContinent === 'asia' ? t.yes : t.no;
    } else if (q.includes('north america') || q.includes('nord amerika') || q.includes('north american') || q.includes('nordamerikansk')) {
      answer = currentPlayer.birthContinent === 'north-america' ? t.yes : t.no;
    }
    
    // Birth year checks
    else if (q.includes('born before') || q.includes('født før')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear < year ? t.yes : t.no;
      } else {
        counted = false;
      }
    } else if (q.includes('born after') || q.includes('født etter')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear > year ? t.yes : t.no;
      } else {
        counted = false;
      }
    }
    
    // Trophy checks
    else if (q.includes('world cup') || q.includes('vm')) {
      answer = currentPlayer.worldCup ? t.yes : t.no;
    } else if (q.includes('euro') || q.includes('em') || q.includes('european championship')) {
      answer = currentPlayer.euro ? t.yes : t.no;
    } else if (q.includes('champions league')) {
      answer = currentPlayer.championsLeague ? t.yes : t.no;
    } else if (q.includes('ballon')) {
      answer = currentPlayer.ballonDor ? t.yes : t.no;
    }
    
    // League title checks
    else if (q.includes('premier league')) {
      answer = currentPlayer.premierLeague ? t.yes : t.no;
    } else if (q.includes('la liga') || (q.includes('spanish') && q.includes('league'))) {
      answer = currentPlayer.laLiga ? t.yes : t.no;
    } else if (q.includes('serie a') || (q.includes('italian') && q.includes('league'))) {
      answer = currentPlayer.serieA ? t.yes : t.no;
    } else if (q.includes('bundesliga') || (q.includes('german') && q.includes('league'))) {
      answer = currentPlayer.bundesliga ? t.yes : t.no;
    } else if (q.includes('ligue 1') || q.includes('ligue 1') || (q.includes('french') && q.includes('league'))) {
      answer = currentPlayer.ligue1 ? t.yes : t.no;
    }
    
    // Height checks
    else if (q.includes('tall') || q.includes('høy') || q.includes('height') || q.includes('over 180') || q.includes('over 185') || q.includes('under 175')) {
      if (q.includes('over 185') || q.includes('over 190')) {
        answer = currentPlayer.height > 185 ? t.yes : t.no;
      } else if (q.includes('over 180')) {
        answer = currentPlayer.height > 180 ? t.yes : t.no;
      } else if (q.includes('under 175') || q.includes('under 180')) {
        answer = currentPlayer.height < 175 ? t.yes : t.no;
      }
    } 
    
    // Appearance checks
    else if (q.includes('beard') || q.includes('skjegg')) {
      answer = currentPlayer.beard ? t.yes : t.no;
    } else if (q.includes('blonde') || q.includes('blond') || q.includes('light hair') || q.includes('lyst hår')) {
      answer = currentPlayer.hair === 'blonde' || currentPlayer.hair === 'light' || currentPlayer.hair === 'ginger' ? t.yes : t.no;
    } else if (q.includes('bald') || q.includes('skallet')) {
      answer = currentPlayer.hair === 'bald' ? t.yes : t.no;
    } else if (q.includes('dark hair') || q.includes('mørkt hår')) {
      answer = currentPlayer.hair === 'dark' ? t.yes : t.no;
    }
    
    // Country checks - med både engelske og norske varianter
    else if (q.includes('brazil') || q.includes('brasil') || q.includes('brazilian') || q.includes('brasiliansk')) {
      answer = currentPlayer.country === 'Brazil' ? t.yes : t.no;
    } else if (q.includes('argentina') || q.includes('argentinian') || q.includes('argentinsk')) {
      answer = currentPlayer.country === 'Argentina' ? t.yes : t.no;
    } else if (q.includes('portugal') || q.includes('portuguese') || q.includes('portugisisk')) {
      answer = currentPlayer.country === 'Portugal' ? t.yes : t.no;
    } else if (q.includes('spain') || q.includes('spania') || q.includes('spanish') || q.includes('spansk')) {
      answer = currentPlayer.country === 'Spain' ? t.yes : t.no;
    } else if (q.includes('france') || q.includes('frankrike') || q.includes('french') || q.includes('fransk')) {
      answer = currentPlayer.country === 'France' ? t.yes : t.no;
    } else if (q.includes('england') || q.includes('english') || q.includes('engelsk')) {
      answer = currentPlayer.country === 'England' ? t.yes : t.no;
    } else if (q.includes('germany') || q.includes('tyskland') || q.includes('german') || q.includes('tysk')) {
      answer = currentPlayer.country === 'Germany' ? t.yes : t.no;
    } else if (q.includes('italy') || q.includes('italia') || q.includes('italian') || q.includes('italiensk')) {
      answer = currentPlayer.country === 'Italy' ? t.yes : t.no;
    } else if (q.includes('norway') || q.includes('norge') || q.includes('norwegian') || q.includes('norsk')) {
      answer = currentPlayer.country === 'Norway' ? t.yes : t.no;
    } else if (q.includes('netherlands') || q.includes('nederland') || q.includes('holland') || q.includes('dutch') || q.includes('nederlandsk')) {
      answer = currentPlayer.country === 'Netherlands' ? t.yes : t.no;
    } else if (q.includes('belgium') || q.includes('belgia') || q.includes('belgian') || q.includes('belgisk')) {
      answer = currentPlayer.country === 'Belgium' ? t.yes : t.no;
    } else if (q.includes('croatia') || q.includes('kroatia') || q.includes('croatian') || q.includes('kroatisk')) {
      answer = currentPlayer.country === 'Croatia' ? t.yes : t.no;
    } else if (q.includes('uruguay') || q.includes('uruguayan') || q.includes('uruguayansk')) {
      answer = currentPlayer.country === 'Uruguay' ? t.yes : t.no;
    } else if (q.includes('colombia') || q.includes('colombian') || q.includes('colombiansk')) {
      answer = currentPlayer.country === 'Colombia' ? t.yes : t.no;
    } else if (q.includes('chile') || q.includes('chilean') || q.includes('chilensk')) {
      answer = currentPlayer.country === 'Chile' ? t.yes : t.no;
    } else if (q.includes('mexico') || q.includes('mexican') || q.includes('meksikansk')) {
      answer = currentPlayer.country === 'Mexico' ? t.yes : t.no;
    } else if (q.includes('egypt') || q.includes('egyptian') || q.includes('egyptisk')) {
      answer = currentPlayer.country === 'Egypt' ? t.yes : t.no;
    } else if (q.includes('senegal') || q.includes('senegalese') || q.includes('senegalesisk')) {
      answer = currentPlayer.country === 'Senegal' ? t.yes : t.no;
    } else if (q.includes('morocco') || q.includes('marokko') || q.includes('moroccan') || q.includes('marokkansk')) {
      answer = currentPlayer.country === 'Morocco' ? t.yes : t.no;
    } else if (q.includes('ghana') || q.includes('ghanaian') || q.includes('ghanansk')) {
      answer = currentPlayer.country === 'Ghana' ? t.yes : t.no;
    } else if (q.includes('nigeria') || q.includes('nigerian') || q.includes('nigeriansk')) {
      answer = currentPlayer.country === 'Nigeria' ? t.yes : t.no;
    } else if (q.includes('ivory coast') || q.includes('elfenbenskyst') || q.includes('ivorian') || q.includes('ivorisk')) {
      answer = currentPlayer.country === 'Ivory Coast' ? t.yes : t.no;
    } else if (q.includes('cameroon') || q.includes('kamerun') || q.includes('cameroonian') || q.includes('kamerunsk')) {
      answer = currentPlayer.country === 'Cameroon' ? t.yes : t.no;
    } else if (q.includes('south korea') || q.includes('sor korea') || q.includes('korean') || q.includes('koreansk')) {
      answer = currentPlayer.country === 'South Korea' ? t.yes : t.no;
    } else if (q.includes('japan') || q.includes('japanese') || q.includes('japansk')) {
      answer = currentPlayer.country === 'Japan' ? t.yes : t.no;
    } else if (q.includes('canada') || q.includes('canadian') || q.includes('kanadisk')) {
      answer = currentPlayer.country === 'Canada' ? t.yes : t.no;
    } else if (q.includes('usa') || q.includes('united states') || q.includes('american') || q.includes('amerikansk')) {
      answer = currentPlayer.country === 'USA' ? t.yes : t.no;
    } else if (q.includes('sweden') || q.includes('sverige') || q.includes('swedish') || q.includes('svensk')) {
      answer = currentPlayer.country === 'Sweden' ? t.yes : t.no;
    } else if (q.includes('poland') || q.includes('polen') || q.includes('polish') || q.includes('polsk')) {
      answer = currentPlayer.country === 'Poland' ? t.yes : t.no;
    } else if (q.includes('scotland') || q.includes('skottland') || q.includes('scottish') || q.includes('skotsk')) {
      answer = currentPlayer.country === 'Scotland' ? t.yes : t.no;
    } else if (q.includes('ukraine') || q.includes('ukraina') || q.includes('ukrainian') || q.includes('ukrainsk')) {
      answer = currentPlayer.country === 'Ukraine' ? t.yes : t.no;
    } else if (q.includes('czech') || q.includes('tsjekkia') || q.includes('tsjekkisk')) {
      answer = currentPlayer.country === 'Czech Republic' ? t.yes : t.no;
    } else if (q.includes('denmark') || q.includes('danmark') || q.includes('danish') || q.includes('dansk')) {
      answer = currentPlayer.country === 'Denmark' ? t.yes : t.no;
    } else if (q.includes('bulgaria') || q.includes('bulgarian') || q.includes('bulgarsk')) {
      answer = currentPlayer.country === 'Bulgaria' ? t.yes : t.no;
    } else if (q.includes('slovenia') || q.includes('slovenian') || q.includes('slovensk')) {
      answer = currentPlayer.country === 'Slovenia' ? t.yes : t.no;
    } else if (q.includes('peru') || q.includes('peruvian') || q.includes('peruansk')) {
      answer = currentPlayer.country === 'Peru' ? t.yes : t.no;
    } else if (q.includes('liberia') || q.includes('liberian') || q.includes('liberiansk')) {
      answer = currentPlayer.country === 'Liberia' ? t.yes : t.no;
    } else if (q.includes('algeria') || q.includes('algerie') || q.includes('algerian') || q.includes('algerisk')) {
      answer = currentPlayer.country === 'Algeria' ? t.yes : t.no;
    } else if (q.includes('gabon') || q.includes('gabonese') || q.includes('gabonsk')) {
      answer = currentPlayer.country === 'Gabon' ? t.yes : t.no;
    } else if (q.includes('guinea') || q.includes('guinean') || q.includes('guineansk')) {
      answer = currentPlayer.country === 'Guinea' ? t.yes : t.no;
    } else if (q.includes('togo') || q.includes('togolese') || q.includes('togolsk')) {
      answer = currentPlayer.country === 'Togo' ? t.yes : t.no;
    }
    
    // Spesifikke klubb-sjekker - utvid listen med flere klubber
    else if (q.includes('real madrid')) {
      answer = playerHasClub('real madrid') ? t.yes : t.no;
    } else if (q.includes('barcelona') || q.includes('barca')) {
      answer = playerHasClub('barcelona') ? t.yes : t.no;
    } else if (q.includes('manchester united') || q.includes('man united') || q.includes('man utd')) {
      answer = playerHasClub('manchester united') ? t.yes : t.no;
    } else if (q.includes('manchester city') || q.includes('man city')) {
      answer = playerHasClub('manchester city') ? t.yes : t.no;
    } else if (q.includes('liverpool')) {
      answer = playerHasClub('liverpool') ? t.yes : t.no;
    } else if (q.includes('chelsea')) {
      answer = playerHasClub('chelsea') ? t.yes : t.no;
    } else if (q.includes('arsenal')) {
      answer = playerHasClub('arsenal') ? t.yes : t.no;
    } else if (q.includes('tottenham') || q.includes('spurs')) {
      answer = playerHasClub('tottenham') ? t.yes : t.no;
    } else if (q.includes('juventus') || q.includes('juve')) {
      answer = playerHasClub('juventus') ? t.yes : t.no;
    } else if (q.includes('ac milan') || (q.includes('milan') && !q.includes('inter'))) {
      answer = playerHasClub('milan') ? t.yes : t.no;
    } else if (q.includes('inter milan') || q.includes('inter')) {
      answer = playerHasClub('inter') ? t.yes : t.no;
    } else if (q.includes('bayern munich') || q.includes('bayern')) {
      answer = playerHasClub('bayern') ? t.yes : t.no;
    } else if (q.includes('borussia dortmund') || q.includes('dortmund')) {
      answer = playerHasClub('dortmund') ? t.yes : t.no;
    } else if (q.includes('psg') || q.includes('paris saint') || q.includes('paris')) {
      answer = playerHasClub('psg') ? t.yes : t.no;
    } else if (q.includes('atletico madrid') || q.includes('atletico')) {
      answer = playerHasClub('atletico') ? t.yes : t.no;
    } else if (q.includes('ajax')) {
      answer = playerHasClub('ajax') ? t.yes : t.no;
    } else if (q.includes('roma')) {
      answer = playerHasClub('roma') ? t.yes : t.no;
    } else if (q.includes('napoli')) {
      answer = playerHasClub('napoli') ? t.yes : t.no;
    } else if (q.includes('lazio')) {
      answer = playerHasClub('lazio') ? t.yes : t.no;
    } else if (q.includes('sevilla')) {
      answer = playerHasClub('sevilla') ? t.yes : t.no;
    } else if (q.includes('valencia')) {
      answer = playerHasClub('valencia') ? t.yes : t.no;
    } else if (q.includes('porto')) {
      answer = playerHasClub('porto') ? t.yes : t.no;
    } else if (q.includes('benfica')) {
      answer = playerHasClub('benfica') ? t.yes : t.no;
    } else if (q.includes('celtic')) {
      answer = playerHasClub('celtic') ? t.yes : t.no;
    } else if (q.includes('rangers')) {
      answer = playerHasClub('rangers') ? t.yes : t.no;
    } else if (q.includes('marseille')) {
      answer = playerHasClub('marseille') ? t.yes : t.no;
    } else if (q.includes('lyon')) {
      answer = playerHasClub('lyon') ? t.yes : t.no;
    } else if (q.includes('monaco')) {
      answer = playerHasClub('monaco') ? t.yes : t.no;
    } else if (q.includes('fiorentina')) {
      answer = playerHasClub('fiorentina') ? t.yes : t.no;
    } else if (q.includes('parma')) {
      answer = playerHasClub('parma') ? t.yes : t.no;
    } else if (q.includes('udinese')) {
      answer = playerHasClub('udinese') ? t.yes : t.no;
    } else if (q.includes('atalanta')) {
      answer = playerHasClub('atalanta') ? t.yes : t.no;
    } else if (q.includes('leicester')) {
      answer = playerHasClub('leicester') ? t.yes : t.no;
    } else if (q.includes('everton')) {
      answer = playerHasClub('everton') ? t.yes : t.no;
    } else if (q.includes('newcastle')) {
      answer = playerHasClub('newcastle') ? t.yes : t.no;
    } else if (q.includes('aston villa') || q.includes('villa')) {
      answer = playerHasClub('villa') ? t.yes : t.no;
    } else if (q.includes('west ham')) {
      answer = playerHasClub('west ham') ? t.yes : t.no;
    } else if (q.includes('wolves') || q.includes('wolverhampton')) {
      answer = playerHasClub('wolverhampton') ? t.yes : t.no;
    } else if (q.includes('leeds')) {
      answer = playerHasClub('leeds') ? t.yes : t.no;
    } else if (q.includes('blackburn')) {
      answer = playerHasClub('blackburn') ? t.yes : t.no;
    } else if (q.includes('bolton')) {
      answer = playerHasClub('bolton') ? t.yes : t.no;
    } else if (q.includes('sunderland')) {
      answer = playerHasClub('sunderland') ? t.yes : t.no;
    } else if (q.includes('psv')) {
      answer = playerHasClub('psv') ? t.yes : t.no;
    } else if (q.includes('bayer leverkusen') || q.includes('leverkusen')) {
      answer = playerHasClub('leverkusen') ? t.yes : t.no;
    } else if (q.includes('rb leipzig') || q.includes('leipzig')) {
      answer = playerHasClub('leipzig') ? t.yes : t.no;
    } else if (q.includes('schalke')) {
      answer = playerHasClub('schalke') ? t.yes : t.no;
    } else if (q.includes('hamburg')) {
      answer = playerHasClub('hamburg') ? t.yes : t.no;
    } else if (q.includes('werder bremen') || q.includes('bremen')) {
      answer = playerHasClub('bremen') ? t.yes : t.no;
    } else if (q.includes('villarreal')) {
      answer = playerHasClub('villarreal') ? t.yes : t.no;
    } else if (q.includes('deportivo')) {
      answer = playerHasClub('deportivo') ? t.yes : t.no;
    } else if (q.includes('real sociedad') || q.includes('sociedad')) {
      answer = playerHasClub('sociedad') ? t.yes : t.no;
    } else if (q.includes('crystal palace') || q.includes('palace')) {
      answer = playerHasClub('palace') ? t.yes : t.no;
    } else if (q.includes('swansea')) {
      answer = playerHasClub('swansea') ? t.yes : t.no;
    } else if (q.includes('southampton')) {
      answer = playerHasClub('southampton') ? t.yes : t.no;
    } else if (q.includes('fulham')) {
      answer = playerHasClub('fulham') ? t.yes : t.no;
    } else if (q.includes('brighton')) {
      answer = playerHasClub('brighton') ? t.yes : t.no;
    } else if (q.includes('watford')) {
      answer = playerHasClub('watford') ? t.yes : t.no;
    } else if (q.includes('stoke')) {
      answer = playerHasClub('stoke') ? t.yes : t.no;
    } else if (q.includes('flamengo')) {
      answer = playerHasClub('flamengo') ? t.yes : t.no;
    } else if (q.includes('corinthians')) {
      answer = playerHasClub('corinthians') ? t.yes : t.no;
    } else if (q.includes('river plate') || q.includes('river')) {
      answer = playerHasClub('river') ? t.yes : t.no;
    } else if (q.includes('boca juniors') || q.includes('boca')) {
      answer = playerHasClub('boca') ? t.yes : t.no;
    } else if (q.includes('santos')) {
      answer = playerHasClub('santos') ? t.yes : t.no;
    } else if (q.includes('palmeiras')) {
      answer = playerHasClub('palmeiras') ? t.yes : t.no;
    } else if (q.includes('inter miami') || q.includes('miami')) {
      answer = playerHasClub('miami') ? t.yes : t.no;
    } else if (q.includes('dynamo') || q.includes('kyiv')) {
      answer = playerHasClub('dynamo') ? t.yes : t.no;
    } else if (q.includes('shakhtar')) {
      answer = playerHasClub('shakhtar') ? t.yes : t.no;
    } else if (q.includes('zenit')) {
      answer = playerHasClub('zenit') ? t.yes : t.no;
    } else if (q.includes('spartak')) {
      answer = playerHasClub('spartak') ? t.yes : t.no;
    } else if (q.includes('galatasaray')) {
      answer = playerHasClub('galatasaray') ? t.yes : t.no;
    } else if (q.includes('fenerbahce')) {
      answer = playerHasClub('fenerbahce') ? t.yes : t.no;
    } else if (q.includes('besiktas')) {
      answer = playerHasClub('besiktas') ? t.yes : t.no;
    } else if (q.includes('bordeaux')) {
      answer = playerHasClub('bordeaux') ? t.yes : t.no;
    } else if (q.includes('lille')) {
      answer = playerHasClub('lille') ? t.yes : t.no;
    } else if (q.includes('montpellier')) {
      answer = playerHasClub('montpellier') ? t.yes : t.no;
    } else if (q.includes('verona')) {
      answer = playerHasClub('verona') ? t.yes : t.no;
    } else if (q.includes('sampdoria')) {
      answer = playerHasClub('sampdoria') ? t.yes : t.no;
    } else if (q.includes('genoa')) {
      answer = playerHasClub('genoa') ? t.yes : t.no;
    } else if (q.includes('torino')) {
      answer = playerHasClub('torino') ? t.yes : t.no;
    } else if (q.includes('bologna')) {
      answer = playerHasClub('bologna') ? t.yes : t.no;
    } else if (q.includes('valladolid')) {
      answer = playerHasClub('valladolid') ? t.yes : t.no;
    } else if (q.includes('sporting') || q.includes('lisbon')) {
      answer = playerHasClub('sporting') ? t.yes : t.no;
    } else if (q.includes('botafogo')) {
      answer = playerHasClub('botafogo') ? t.yes : t.no;
    } 
    // GENERELL klubb-sjekk som siste utvei
    else if (q.includes('play') || q.includes('spill') || q.includes('club') || q.includes('klubb')) {
      // Prøv alle klubber fra spillerens liste
      let foundMatch = false;
      for (const club of currentPlayer.clubs) {
        const normalizedClub = normalizeText(club);
        if (normalizedClub.split(' ').some(word => word.length > 3 && q.includes(word))) {
          foundMatch = true;
          break;
        }
      }
      answer = foundMatch ? t.yes : t.no;
    }
    
    else {
      answer = language === 'no' ? 'Kan ikke bekrefte' : 'Unable to verify';
      counted = false;
    }

    setIsVerifying(false);
    return { answer, counted };
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || remainingQuestions === 0 || isVerifying) return;

    const result = await verifyAnswer(currentQuestion);
    
    const newQuestion = {
      question: currentQuestion,
      answer: result.answer,
      counted: result.counted
    };
    
    setQuestions([newQuestion, ...questions]);
    setCurrentQuestion('');
    
    if (result.counted) {
      setRemainingQuestions(remainingQuestions - 1);
      
      if (remainingQuestions - 1 === 5 && !showHint) {
        setShowHint(true);
      }
    }
  };

  const handleFinalGuess = () => {
    if (!finalGuess.trim()) return;
    
    // FORBEDRET: Normaliser både gjetting og spillernavn for sammenligning
    const normalizedGuess = normalizeText(finalGuess);
    const normalizedPlayerName = normalizeText(currentPlayer.name);
    
    // Splitt spillernavnet i deler (fornavn, mellomnavn, etternavn)
    const playerNameParts = normalizedPlayerName.split(' ');
    const guessParts = normalizedGuess.split(' ');
    
    // Sjekk om gjetningen matcher hele navnet eller deler av det
    const isCorrect = 
      normalizedGuess === normalizedPlayerName || // Eksakt match
      normalizedPlayerName.includes(normalizedGuess) || // Gjetning er del av navnet
      normalizedGuess.includes(normalizedPlayerName) || // Navnet er del av gjetningen
      playerNameParts.some(part => part.length > 2 && guessParts.includes(part)) || // Matcher deler av navnet
      (guessParts.length > 1 && playerNameParts.some(part => guessParts.includes(part) && part.length > 2)); // Matcher minst ett ord
    
    const validQuestionsCount = questions.filter(q => q.counted).length;
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const finalScore = calculateScore(validQuestionsCount, filtersUsed);
    setScore(finalScore);
    
    if (isCorrect) {
      saveHighScore(username, finalScore);
    }
    
    setGameState(isCorrect ? 'won' : 'lost');
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentPlayer(null);
    setQuestions([]);
    setCurrentQuestion('');
    setRemainingQuestions(20);
    setFinalGuess('');
    setShowHint(false);
    setScore(0);
  };

  if (gameState === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Football Player<br/>20 Questions
          </h1>
          <div className="space-y-4">
            <button
              onClick={() => { setLanguage('en'); setGameState('username'); }}
              className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition-all"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => { setLanguage('no'); setGameState('username'); }}
              className="w-full py-4 bg-red-500 text-white font-bold text-lg rounded-xl hover:bg-red-600 transition-all"
            >
              🇳🇴 Norsk
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'username') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <User className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{t.enterUsername}</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && username.trim() && setGameState('setup')}
            placeholder={t.usernamePlaceholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
            autoFocus
          />
          <button
            onClick={() => username.trim() && setGameState('setup')}
            disabled={!username.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all"
          >
            {t.continue}
          </button>
          <button
            onClick={() => setGameState('language')}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← {t.selectLanguage}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.title}</h1>
              <p className="text-gray-600 mb-2">{t.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">
                {language === 'no' ? `Spiller: ${username}` : `Player: ${username}`}
              </p>
              <button
                onClick={() => setGameState('username')}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {language === 'no' ? 'Endre navn' : 'Change name'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <Filter className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{t.useFiltersTitle}</h3>
                    <p className="text-sm text-gray-700 mb-3">{t.useFiltersDesc}</p>
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.period}
                          onChange={(e) => setUseFilters({...useFilters, period: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.usePeriodFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.continent}
                          onChange={(e) => setUseFilters({...useFilters, continent: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.useContinentFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.league}
                          onChange={(e) => setUseFilters({...useFilters, league: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.useLeagueFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {useFilters.period && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Calendar className="w-5 h-5 mr-2" />
                    {t.selectPeriod}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {periods.map(period => (
                      <button
                        key={period.id}
                        onClick={() => setSelectedPeriod(period.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedPeriod === period.id
                            ? 'bg-blue-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {useFilters.continent && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Globe className="w-5 h-5 mr-2" />
                    {t.selectContinent}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {continents.map(continent => (
                      <button
                        key={continent.id}
                        onClick={() => setSelectedContinent(continent.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedContinent === continent.id
                            ? 'bg-green-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {continent.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {useFilters.league && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Trophy className="w-5 h-5 mr-2" />
                    {t.selectLeague}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {leagues.map(league => (
                      <button
                        key={league.id}
                        onClick={() => setSelectedLeague(league.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedLeague === league.id
                            ? 'bg-purple-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {league.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                {t.startGame}
              </button>

              {highScores.length > 0 && (
                <button
                  onClick={() => setShowHighScores(!showHighScores)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  {showHighScores ? t.hideHighScores : t.viewHighScores}
                </button>
              )}

              {showHighScores && highScores.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{t.highScoresTitle}</h3>
                  <p className="text-xs text-gray-600 text-center mb-4">{t.highScoresNote}</p>
                  <div className="space-y-2">
                    {highScores.map((score, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-700' :
                            index === 2 ? 'bg-orange-400 text-orange-900' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-800">{score.name}</span>
                        </div>
                        <span className="font-bold text-blue-600">{score.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won' || gameState === 'lost') {
    const validQuestionsCount = questions.filter(q => q.counted).length;
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const scoreDetails = {
      base: 1000,
      questionPenalty: validQuestionsCount * 30,
      filterPenalty: filtersUsed * 100,
      bonus: Math.max(0, (20 - validQuestionsCount) * 20)
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            {gameState === 'won' ? (
              <>
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.congratulations}</h2>
                <p className="text-xl text-gray-600 mb-4">
                  {t.youGuessed} <span className="font-bold text-green-600">{currentPlayer.name}</span>!
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.gameOver}</h2>
                <p className="text-xl text-gray-600 mb-4">
                  {t.playerWas} <span className="font-bold text-blue-600">{currentPlayer.name}</span>
                </p>
              </>
            )}
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-white mr-2" />
                <h3 className="text-3xl font-bold text-white">{t.finalScore}</h3>
              </div>
              <p className="text-5xl font-bold text-white">{score}</p>
              
              <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4 text-left text-white text-sm">
                <p className="font-semibold mb-2">{t.scoreBreakdown}</p>
                <p>{t.baseScore} {scoreDetails.base}</p>
                <p>{t.questionPenalty} -{scoreDetails.questionPenalty} ({validQuestionsCount} × 30)</p>
                <p>{t.filterPenalty} -{scoreDetails.filterPenalty} ({filtersUsed} × 100)</p>
                <p>{t.bonusPoints} +{scoreDetails.bonus}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">{t.playerDetails}</h3>
              <div className="text-left space-y-2 text-sm">
                <p><strong>{t.country}</strong> {currentPlayer.country}</p>
                <p><strong>{t.position}</strong> {currentPlayer.position}</p>
                <p><strong>{t.birthYear}</strong> {currentPlayer.birthYear}</p>
                <p><strong>{t.clubs}</strong> {currentPlayer.clubs.join(', ')}</p>
                <p><strong>{t.height}</strong> {currentPlayer.height} {t.cm}</p>
                <p><strong>{t.worldCup}</strong> {currentPlayer.worldCup ? t.won : t.notWon}</p>
                {currentPlayer.euro !== undefined && <p><strong>{t.euro}</strong> {currentPlayer.euro ? t.won : t.notWon}</p>}
                <p><strong>{t.championsLeague}</strong> {currentPlayer.championsLeague ? t.won : t.notWon}</p>
                <p><strong>{t.ballonDor}</strong> {currentPlayer.ballonDor ? t.won : t.notWon}</p>
                <p><strong>{t.premierLeague}</strong> {currentPlayer.premierLeague ? t.won : t.notWon}</p>
                <p><strong>{t.laLiga}</strong> {currentPlayer.laLiga ? t.won : t.notWon}</p>
                <p><strong>{t.serieA}</strong> {currentPlayer.serieA ? t.won : t.notWon}</p>
                <p><strong>{t.bundesliga}</strong> {currentPlayer.bundesliga ? t.won : t.notWon}</p>
                <p><strong>{t.ligue1}</strong> {currentPlayer.ligue1 ? t.won : t.notWon}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">{t.questionsUsed} {validQuestionsCount} / 20</p>
              <button
                onClick={resetGame}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                {t.playAgain}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validQuestionsCount = questions.filter(q => q.counted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{username}'s {language === 'no' ? 'spill' : 'Game'}</h2>
            <div className="flex gap-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-blue-600">{validQuestionsCount}</span>
                <span className="text-gray-600 ml-1 text-sm">/ 20 {t.validQuestions}</span>
              </div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                {t.restart}
              </button>
            </div>
          </div>

          {showHint && validQuestionsCount >= 15 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  <strong>{t.hint}</strong> {t.playerFrom} {currentPlayer.country}, {t.bornIn} {currentPlayer.birthYear}, {t.playedAs} {currentPlayer.position}
                </p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                placeholder={t.askQuestion}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                disabled={isVerifying || validQuestionsCount >= 20}
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={isVerifying || !currentQuestion.trim() || validQuestionsCount >= 20}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                {isVerifying ? t.checking : t.asking}
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {questions.map((q, index) => (
              <div key={index} className={`rounded-xl p-4 ${q.counted ? 'bg-gray-50' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800 flex-1 mr-2">
                    {q.counted ? `Q${questions.filter((qu, i) => i >= index && qu.counted).length}` : '❌'}: {q.question}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                    !q.counted ? 'bg-red-100 text-red-700' :
                    q.answer === t.yes || q.answer === 'Yes' ? 'bg-green-100 text-green-700' :
                    q.answer === t.no || q.answer === 'No' ? 'bg-red-100 text-red-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {q.counted ? q.answer : t.notCounted}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.readyToGuess}</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={finalGuess}
                onChange={(e) => setFinalGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFinalGuess()}
                placeholder={t.enterPlayerName}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleFinalGuess}
                disabled={!finalGuess.trim()}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.submitGuess}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">{t.tipsTitle}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.tip1}</li>
            <li>{t.tip2}</li>
            <li>{t.tip3}</li>
            <li>{t.tip4}</li>
            <li>{t.tip5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
